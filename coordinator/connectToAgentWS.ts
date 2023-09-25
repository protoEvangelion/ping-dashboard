export async function connectToAgentWS(ip: string, port: number): Promise<WebSocket> {
    const url = `ws://${ip}:${port}`
    console.log(`Trying to connect to WS at ${url}`)

    const socket = new WebSocket(url, {
        headers: {
            // custom headers
        },
    })

    return new Promise((resolve, reject) => {
        socket.addEventListener('open', () => {
            console.log('Connected to agent WS: ', url)
            resolve(socket)
        })

        socket.addEventListener('close', (event) => {
            console.log('Agent WS could not be connected to: ', event.reason)
            reject(event.reason)
        })

        socket.addEventListener('error', (err) => {
            console.log('Error connecting to WS: ', err)
            reject(err)
        })
    })
}
