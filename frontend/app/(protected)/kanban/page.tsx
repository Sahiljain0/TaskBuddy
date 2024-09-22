"use client"
import React, { useState, useEffect } from 'react'
import Column from './components/Column'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { ContentLayout } from "@/components/admin-panel/content-layout";
import TaskStoreInitializer, { useTaskStore } from '@/hooks/use-task-store';
import { useAuthStore } from '@/hooks/use-auth-store';
import { redirect } from 'next/navigation';
import { ColumnType, Task } from '@/lib/types';

export default function Page() {
    const { user } = useAuthStore(); // Get the current user from the auth store
    const tasks = useTaskStore((state) => state.tasks); // Get tasks from the task store
    const { changeTaskStatus } = useTaskStore(); // Function to change task status

    // Function to map tasks to their respective columns based on status
    const mapTasksToColumns = (tasks: Task[]) => {
        const columns: {
            [key: string]: ColumnType;
        } = {
            'To Do': {
                id: 'To Do',
                list: []
            },
            'In Progress': {
                id: 'In Progress',
                list: []
            },
            'Completed': {
                id: 'Completed',
                list: []
            }
        };

        tasks.forEach(task => {
            if (columns[task.status]) {
                columns[task.status].list.push(task);
            }
        });

        return columns;
    };

    const [columns, setColumns] = useState(mapTasksToColumns(tasks)); // Initialize columns state

    useEffect(() => {
        setColumns(mapTasksToColumns(tasks)); // Update columns when tasks change
    }, [tasks]);

    // Handle the drag and drop event
    const onDragEnd = ({ source, destination }: DropResult) => {
        if (destination === undefined || destination === null) return null;

        if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
        )
            return null;

        const start = columns[source.droppableId];
        const end = columns[destination.droppableId];

        if (start === end) {
            const newList = start.list.filter(
                (_: any, idx: number) => idx !== source.index
            );

            newList.splice(destination.index, 0, start.list[source.index]);

            const newCol = {
                id: start.id,
                list: newList
            };

            setColumns(state => ({ ...state, [newCol.id]: newCol })); // Update state for same column drag
            return null;
        } else {
            const newStartList = start.list.filter(
                (_: any, idx: number) => idx !== source.index
            );

            const newStartCol = {
                id: start.id,
                list: newStartList
            };

            const newEndList = end.list;

            newEndList.splice(destination.index, 0, start.list[source.index]);

            const newEndCol = {
                id: end.id,
                list: newEndList
            };

            const movedTask = start.list[source.index];

            // Update the task status in the database
            changeTaskStatus(movedTask._id, end.id);

            setColumns(state => ({
                ...state,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol
            })); // Update state for different column drag
            return null;
        }
    };

    if (!user) {
        return redirect("/login"); // Redirect to login if user is not authenticated
    }

    return (
        <ContentLayout title="Kanban Board" className='min-h-[70vh]'>
            <DragDropContext onDragEnd={onDragEnd}>
                <TaskStoreInitializer />
                <div className="grid md:grid-cols-3 grid-cols-1 place-items-center gap-2 w-4/5 mx-auto py-2">
                    {Object.values(columns).map(col => (
                        <Column col={col} key={col.id} /> // Render each column
                    ))}
                </div>
            </DragDropContext>
        </ContentLayout>
    )
}
