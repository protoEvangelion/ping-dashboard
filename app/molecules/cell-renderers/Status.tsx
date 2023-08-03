import { Chip, ChipProps } from '@nextui-org/react'

const statusColorMap: Record<string, ChipProps['color']> = {
    success: 'success',
    pending: 'warning',
    failed: 'danger',
} as const

export const Status = ({ status }: { status: keyof typeof statusColorMap }) => (
    <Chip
        className="capitalize"
        color={statusColorMap[status]}
        size="sm"
        variant="flat"
    >
        {status}
    </Chip>
)
