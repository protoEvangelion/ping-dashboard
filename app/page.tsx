import { PingTable } from './organisms/PingTable'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold text-center">Ping Status</h1>

            <PingTable />
        </main>
    )
}
