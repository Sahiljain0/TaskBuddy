"use client"
import React from 'react'
import Item from './Item'
import { Droppable } from 'react-beautiful-dnd'
import { Button } from '@/components/ui/button'
import { Task } from '../../dashboard/components/Dashboard'

interface ColumnProps {
    col: {
        id: string
        list: Task[]
    }
}

const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => {
    return (
        <Droppable droppableId={id}>
            {provided => (
                <div className="p-6 flex flex-col  mt-2 w-64 bg-card">
                    <Button className="px-4 py-2 rounded-t-lg text-center font-bold">{id.toUpperCase()}</Button>
                    <hr />
                    <div
                        className=" rounded-b-lg p-4 flex flex-col h-48  mt-2 shadow-lg"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {list.map((text, index) => (
                            <Item key={text.id} text={text.title} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    )
}

export default Column
