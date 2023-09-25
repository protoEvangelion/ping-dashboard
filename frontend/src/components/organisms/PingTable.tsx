'use client'

import React from 'react'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/react'
import { Status } from '../molecules/cell-renderers/Status'
import { NewTestForm } from './NewTestForm'
import { Action } from '../molecules/cell-renderers/Action'
import { useWebSocket } from '@/app/hooks/useWebSocket'
import { RunTests } from '../molecules/RunTests'
import { CoordinatorClientMsg, TestRecord } from '../../../../types'
import { transformTestRows } from '@/app/transformers/transformTestRows'

const colDefs = [
    {
        key: 'status',
        label: 'STATUS',
    },
    {
        key: 'description',
        label: 'DESCRIPTION',
    },
    {
        key: 'agent',
        label: 'AGENT',
    },
    {
        key: 'destIp',
        label: 'DEST IP',
    },
    {
        key: 'action',
        label: 'Actions',
    },
]

export function PingTable() {
    const {
        data: rows,
        setData: setRows,
        socket,
    } = useWebSocket<TestRecord[]>(`ws://localhost:1001`, transformTestRows)

    const renderCell = React.useCallback(
        (row: TestRecord, columnKey: React.Key) => {
            const cellValue = row[columnKey as keyof TestRecord]

            switch (columnKey) {
                case 'status':
                    return <Status status={cellValue} />
                case 'action':
                    return <Action id={row.id} />
                default:
                    return cellValue
            }
        },
        []
    )

    if (!rows) return null

    return (
        <>
            <div className="flex justify-end w-full">
                {/* <NewTestForm
                    addRow={(row: TestRecord) => setRows([...rows, row])}
                /> */}

                <RunTests
                    socket={socket}
                    onClick={() =>
                        setRows(rows.map((x) => ({ ...x, status: 'running' })))
                    }
                />
            </div>

            <Table aria-label="Example table with dynamic content">
                <TableHeader columns={colDefs}>
                    {(column) => (
                        <TableColumn key={column.key}>
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={rows}>
                    {(item) => (
                        <TableRow key={item.id}>
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
