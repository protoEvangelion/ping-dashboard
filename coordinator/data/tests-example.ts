const ips = {
    ao0: '192.168.3.168',
    nvr: '192.168.5.168',
    iotdevice: '192.168.3.168',
    internet: '1.1.1.1',
    dockercontainer: '192.168.10.168',
    fail: '192.168.3.168',
}

export const rowsData = [
    {
        id: 'd7d4c1c4-7c5d-4d5d-9c3f-9d5d6d7d8d9e',
        status: undefined,
        description: 'Can access internet',
        agent: 'f7c5d6e4-8a2b-4c1d-9e3f-0d5a6b7c8d9e',
        destIp: ips.internet,
        shouldFail: false,
    },
    {
        id: 'a9b8c7d6-e5f4-4d3c-2b1a-1a2b3c4d5e6f',
        status: undefined,
        description: 'Cannot access device on a separate vlan',
        agent: 'f7c5d6e4-8a2b-4c1d-9e3f-0d5a6b7c8d9e',
        destIp: ips.iotdevice,
        shouldFail: true,
    },
    {
        id: 'e9b8c7d6-e5f4-4d3c-2b1a-1a2b3c4d5e6f',
        status: undefined,
        description: 'Can access device on same vlan',
        agent: 'f7c5d6e4-8a2b-4c1d-9e3f-0d5a6b7c8d9e',
        destIp: ips.fail,
        shouldFail: false,
    },
    {
        id: 'f3c6b2e9-7e3c-4e5d-8c1f-9a8b7c6d5e4f',
        status: undefined,
        description: 'IoT thermostat can access the internet',
        agent: 'e7c5d6e4-8a2b-4c1d-9e3f-0d5a6b7c8d9e',
        destIp: '1.1.1.1',
        shouldFail: false,
    },
]

export type Tests = typeof rowsData

export type PingTest = Tests[0]
