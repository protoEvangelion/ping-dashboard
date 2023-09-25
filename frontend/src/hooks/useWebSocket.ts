import { useEffect, useRef, useState } from 'react'
import { CoordinatorClientMsg } from '../../../types'

export function useWebSocket<T>(
    url: string,
    transform: (msg: T, prevData: T) => T = (x) => x
): {
    data: T | undefined
    setData: (data: T) => T
    socket: WebSocket | undefined
} {
    const [data, setData] = useState<T>()
    const socketRef = useRef<WebSocket>()

    useEffect(() => {
        socketRef.current = new WebSocket(url)

        socketRef.current.onopen = () => {
            console.log(`Connected to ${url}`)
        }

        socketRef.current.onmessage = (event) => {
            const msg = JSON.parse(event.data) as CoordinatorClientMsg
            console.log(`Socket message: `, msg)

            setData((prevData) => transform(msg, prevData))
        }

        socketRef.current.onerror = (error) => {
            console.log(`WebSocket error: ${JSON.stringify(error)}`)
        }

        socketRef.current.onclose = () => {
            console.log(`WebSocket closed`)
        }

        return () => {
            socketRef.current?.close?.()
        }
    }, [url])

    return { data, setData, socket: socketRef.current }
}
