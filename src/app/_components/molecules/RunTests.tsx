import { Button } from '@nextui-org/react'
import { FiZap } from 'react-icons/fi'

export function RunTests({
    socket,
    onClick,
}: {
    socket?: WebSocket
    onClick: () => void
}) {
    return (
        <Button
            variant="solid"
            color="primary"
            endContent={<FiZap />}
            onPress={() => {
                console.log('!!!socket', socket)
                if (!socket) return

                onClick()
                socket.send('launch')
            }}
        >
            Run Tests
        </Button>
    )
}
