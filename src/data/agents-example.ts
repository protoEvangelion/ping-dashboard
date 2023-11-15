export const agentsData = [
    {
        id: 'f7c5d6e4-8a2b-4c1d-9e3f-0d5a6b7c8d9e',
        name: 'NoT',
        description: 'Agent for NoT devices',
        ip: 'localhost',
        port: 1002,
    },
    {
        id: 'e7c5d6e4-8a2b-4c1d-9e3f-0d5a6b7c8d9e',
        name: 'IoT',
        description: 'Agent for IoT devices',
        ip: '192.168.3.111',
        port: 1003,
    },
]

export type Agent = (typeof agentsData)[0]
