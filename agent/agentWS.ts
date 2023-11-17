import ping from 'ping'
import os from 'os'
import { type PingTest } from '../types'

const port = 1002

export function setupAgentWs() {
    Bun.serve({
        port,
        fetch(req, server) {
            // upgrade the request to a WebSocket
            if (server.upgrade(req)) {
                return // do not return a Response
            }
            return new Response('Upgrade failed :(', { status: 500 })
        }, // upgrade logic
        websocket: {
            message(ws, message: string) {
                console.log('message', message)

                try {
                    const tests: PingTest[] = JSON.parse(message)
                    tryConnects(tests).forEach((pingResult) => {
                        pingResult
                            .then((result) => {
                                ws.send(JSON.stringify({ test: result }))
                            })
                            .catch((err) =>
                                ws.close(1011, `Error pinging ip: ${err}`)
                            )
                    })
                } catch (error) {
                    ws.close(1011, 'Error parsing JSON from message')
                }
            },
            open(ws) {
                console.log('Opened agent WS successfully')
            }, // a socket is opened
            // close(ws, code, message) {}, // a socket is closed
            // drain(ws) {}, // the socket is ready to receive more data
        },
    })
}

function tryConnects(tests: PingTest[]) {
    const hostIP = getLocalIP()

    if (!hostIP) {
        console.log('Could not find host IP')
    }

    console.log(`Host IP: ${hostIP}`)

    return tests.map((x) =>
        isConnected(x.dest_ip).then((isAlive) => ({
            ...x,
            status: getStatusText(isAlive, x.should_fail),
        }))
    )
}

function getStatusText(
    isAlive: boolean,
    should_fail: boolean
): PingTest['status'] {
    return should_fail
        ? isAlive
            ? 'failed'
            : 'success'
        : isAlive
          ? 'success'
          : 'failed'
}

function isConnected(ip: string): Promise<boolean> {
    return ping.promise.probe(ip).then((result) => result.alive)
}

function getLocalIP() {
    const networkInterfaces = os.networkInterfaces()
    const localInterface = networkInterfaces.en0 || networkInterfaces['Wi-Fi']

    if (localInterface) {
        const localIPv4 = localInterface.find(
            (iface) => iface.family === 'IPv4'
        )
        if (localIPv4) {
            return localIPv4.address
        }
    }

    return null
}
