export type TestRecord = {
    id: string
    status: 'success' | 'running' | 'failed' | undefined
    description: string
    agent: string
    destIp: string
    shouldFail: boolean
}

export type AgentRecord = {
    id: string
    name: string
    description: string
    port: number
    ip: string
    connected?: boolean
}

export type CoordinatorClientMsg =
    | {
          tests: TestRecord[]
      }
    | {
          test: TestRecord
      }
