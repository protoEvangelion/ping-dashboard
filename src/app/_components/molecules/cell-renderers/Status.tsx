'use client'

import { Chip, type ChipProps } from '@nextui-org/react'

const statusColorMap: Record<string, ChipProps['color']> = {
    success: 'success',
    running: 'primary',
    failed: 'danger',
} as const

export const Status = ({ status }: { status?: any }) => (
    <Chip
        className="capitalize"
        color={statusColorMap[status] ?? 'default'}
        size="sm"
        variant="flat"
    >
        {status || 'Not Ran'}
    </Chip>
)
