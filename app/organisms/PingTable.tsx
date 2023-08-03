'use client'

import React from 'react'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Button,
} from '@nextui-org/react'
import { PlusIcon } from '../atoms/icons/PlusIcon'
import { Status } from '../molecules/cell-renderers/Status'

const rows = [
    {
        key: '1',
        status: 'success',
        description: 'NoT device cannot access the internet',
        srcIp: '192.168.5.10',
        destIp: '1.1.1.1',
    },
]

const columns = [
    {
        key: 'status',
        label: 'STATUS',
    },
    {
        key: 'description',
        label: 'DESCRIPTION',
    },
    {
        key: 'srcIp',
        label: 'SRC IP',
    },
    {
        key: 'destIp',
        label: 'DEST IP',
    },
]

type TestRecord = (typeof rows)[0]

export function PingTable() {
    const renderCell = React.useCallback(
        (row: TestRecord, columnKey: React.Key) => {
            const cellValue = row[columnKey as keyof TestRecord]

            if (columnKey === 'status') {
                return <Status status={cellValue} />
            }

            return cellValue
        },
        []
    )

    return (
        <>
            <Button variant="solid" color="primary" endContent={<PlusIcon />}>
                Add New
            </Button>
            <Table aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key}>
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={rows}>
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}
