'use client'

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
    cn,
} from '@nextui-org/react'
import { capitalize } from 'lodash'

import { FiMoreHorizontal, FiDelete } from 'react-icons/fi'
import { RiRunFill, RiEdit2Fill } from 'react-icons/ri'

const Actions = {
    run: 'run',
    edit: 'edit',
    delete: 'delete',
} as const

export function Action({ id }: { id: string }) {
    const iconClasses =
        'text-xl text-default-500 pointer-events-none flex-shrink-0'

    return (
        <Dropdown className="dark">
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <FiMoreHorizontal />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                onAction={(x) => {
                    switch (x) {
                        case Actions.run:
                            console.log('!run', id)
                            break
                        case Actions.edit:
                            console.log('!edit')
                            break
                        case Actions.delete:
                            console.log('!delete')
                            break
                    }
                }}
            >
                <DropdownSection title="Actions">
                    <DropdownItem
                        key={Actions.run}
                        description="Run the test"
                        startContent={<RiRunFill className={iconClasses} />}
                    >
                        {capitalize(Actions.run)}
                    </DropdownItem>
                    <DropdownItem
                        key={Actions.edit}
                        description="Allows you to edit the test"
                        startContent={<RiEdit2Fill className={iconClasses} />}
                    >
                        {capitalize(Actions.edit)}
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Danger zone">
                    <DropdownItem
                        key={Actions.delete}
                        className="text-danger"
                        color="danger"
                        description="Permanently delete the test"
                        startContent={
                            <FiDelete
                                className={cn(iconClasses, 'text-danger')}
                            />
                        }
                    >
                        {capitalize(Actions.delete)}
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}
