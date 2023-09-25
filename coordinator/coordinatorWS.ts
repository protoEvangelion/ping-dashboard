import { eq } from 'drizzle-orm'
import { PingTest } from '../types'
import { connectToAgentWS } from './connectToAgentWS'
import { agentsData } from './data/agents-example'
import { pingTest } from './db/schema/pingtest'
import { setupDB } from './setupDB'

const { db } = setupDB()

export function setupCoordinatorWebSocket() {
    const server = Bun.serve({
        port: 1001,
        fetch(req, server) {
            // upgrade the request to a WebSocket
            if (server.upgrade(req)) {
                return // do not return a Response
            }
            return new Response('Upgrade failed :(', { status: 500 })
        }, // upgrade logic
        websocket: {
            message(clientWs, message: string) {
                if (message === 'launch') {
                    handleLaunchPingTests(clientWs)
                }
            },
            async open(clientWs) {
                console.log('opened')
                // Send initial data to client
                clientWs.send(JSON.stringify({ tests: await getAllPingTests() }))
            },
            close(clientWs, code, message) {
                console.log('closed')
            }, // a agentWs is closed
            // drain(clientWs) {}, // the agentWs is ready to receive more data
        },
    })

    console.log('Opened WS for client on port: ', server.port)
}

function mapDataToAgents(rows: PingTest[], agents: typeof agentsData) {
    return agents.map(({ id, ...rest }) => ({
        ...rest,
        tests: rows.filter(({ agent }) => agent === id),
    }))
}

function getAllPingTests() {
    return db.query.pingTest.findMany()
}

async function handleLaunchPingTests(clientWs: any) {
    console.log('Launching tests.')

    const agents = mapDataToAgents(await getAllPingTests(), agentsData)

    agents.forEach(async (agent) => {
        let agentWs = await connectToAgentWS(agent.ip, agent.port).catch(console.error)

        if (!agentWs) return

        // Listen for messages from agent
        agentWs.addEventListener('message', async (event) => {
            console.log('[AGENT]: ', event.data)
            if (typeof event.data !== 'string') return

            try {
                const data = JSON.parse(event.data)
                if ('test' in data) {
                    // Write test result to DB
                    const updatedTestId = await db
                        .update(pingTest)
                        .set({ status: data.test.status })
                        .where(eq(pingTest.id, data.test.id))
                        .returning({ updatedId: pingTest.id })

                    console.log('Updated test id-------------: ', updatedTestId)
                    // db.updateTestStatusQuery.run({
                    //     $status: data.test.status,
                    //     $id: data.test.id,
                    // })

                    // Send test to client
                    clientWs.send(event.data)
                }
            } catch (e) {
                console.error('Error writing test result or sending test to client: ', e)
            }
        })

        agentWs.addEventListener('error', (event) => {
            console.log('Agent Socket Closed')
        })

        // Launch tests
        agentWs.send(JSON.stringify(agent.tests))
    })
}
