import './App.css'
import { NextUIProvider } from '@nextui-org/react'
import { PingTable } from './components/organisms/PingTable'

function App() {
    return (
        <NextUIProvider className="h-full">
            <main className="flex dark text-foreground bg-background min-h-screen flex-col items-center justify-between p-24">
                <h1 className="text-4xl pb-6 font-bold text-center">
                    Ping Status
                </h1>

                <PingTable />
            </main>
        </NextUIProvider>
    )
}

export default App
