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
// import { NewTestForm } from "./NewTestForm";
import { Action } from '../molecules/cell-renderers/Action'
// import { useWebSocket } from "~/app/hooks/useWebSocket";
// import { RunTests } from "../molecules/RunTests";
// import { transformTestRows } from "~/transformers/transformTestRows";
import { api } from '~/trpc/react'
import { type PingTest } from '~/server/db/schema'

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
        key: 'agent_id',
        label: 'AGENT',
    },
    {
        key: 'dest_ip',
        label: 'DEST IP',
    },
    {
        key: 'action',
        label: 'Actions',
    },
]

export function PingTable() {
    const { data } = api.tests.getTests.useQuery()

    //   const {
    //     data: rows,
    //     setData: setRows,
    //     socket,
    //   } = useWebSocket<PingTest[]>(`ws://localhost:1001`, transformTestRows);

    const renderCell = React.useCallback(
        (row: PingTest, columnKey: React.Key) => {
            const cellValue = row[columnKey as keyof PingTest]

            switch (columnKey) {
                case 'status':
                    return <Status status={cellValue} />
                case 'action':
                    return <Action id={row.id} />
                case 'created_at':
                    return cellValue?.toLocaleString()
                default:
                    return String(cellValue)
            }
        },
        []
    )

    if (!data) return null

    return (
        <>
            <div className="flex w-full justify-end">
                {/* <NewTestForm
                    addRow={(row: PingTest) => setRows([...rows, row])}
                /> */}

                {/* <RunTests
          socket={socket}
          onClick={() =>
            setRows(rows.map((x) => ({ ...x, status: "running" })))
          }
        /> */}
            </div>

            <Table aria-label="Example table with dynamic content">
                <TableHeader columns={colDefs}>
                    {(column) => (
                        <TableColumn key={column.key}>
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={data}>
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
