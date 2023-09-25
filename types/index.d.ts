import type { PingTest } from './db/schema/pingtest'

export type { PingTest }

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
          tests: PingTest[]
      }
    | {
          test: PingTest
      }
