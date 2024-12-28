'use client'
import React, { useCallback } from 'react'
import { Loader, PlusIcon } from 'lucide-react'
import {useQueryState} from 'nuqs'
import {useGetTasks} from '../api/use-get-tasks'
import { useCreateTaskModal } from '../hooks/use-create-task-modal'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DottedSepatator } from '@/components/dotted-separator'
import DataFilters from './data-filters'
import { useTaskFilters } from '../hooks/use-task-filters'
import { DataTable } from './data-table'
import {columns} from './columns'
import { Datakanban } from './data-kanban'
import { taskStatus } from '../types'
import { useBulkUpdateTasks } from '../api/use-bulk-update-tasks'
import { DataCalendar } from './data-calendar'

export const TaskViewSwitcher = () => {

    const[{
        status,
        assigneeId,
        projectId,
        dueDate,
    }] = useTaskFilters()


    const {mutate:bulkUpdate} = useBulkUpdateTasks()


    const [view, setView] = useQueryState("task-view",{
        defaultValue:'table',
        // options:['table','kanban','calendar']
    })
    const workspaceId= useWorkspaceId()

    
    const {data:tasks, isLoading:isTaskLoading} = useGetTasks({
        workspaceId,
        status,
        assigneeId,
        projectId,
        dueDate
    })

    const {open} = useCreateTaskModal()

    const onkanbanChange = useCallback((
        tasks:{$id:string;status:taskStatus,postion:number}[]
    )=>{
        console.log({tasks})
        bulkUpdate({
            json:{tasks}
        })
    },[bulkUpdate,tasks])


  return (
    <Tabs 
    className='flex-1 w-full border rounded-lg'
    defaultValue={view}
    onValueChange={setView}
    >
        <div className='h-full flex flex-col overflow-auto p-4'>
            <div className='flex flex-col gap-y-2 lg:flex-row justify-between items-center'>
                <TabsList className='w-full lg:w-auto'>
                    <TabsTrigger className='h-8 w-full lg:w-auto' value='table'>
                                Table
                    </TabsTrigger>
                    <TabsTrigger className='h-8 w-full lg:w-auto' value='kanban'>
                                Kanban
                    </TabsTrigger>
                    <TabsTrigger className='h-8 w-full lg:w-auto' value='calendar'>
                                Calendar
                    </TabsTrigger>
                </TabsList>
                <Button onClick={open} className='w-full lg:w-auto' size={'sm'} variant={'primary'}>
                    <PlusIcon  className='size-4 mr-2'/>
                    Add Task 
                </Button>
            </div>
            <DottedSepatator className='my-3' />
                <DataFilters />
            <DottedSepatator className='my-3' />
            {
                isTaskLoading ?(
                <div className='w-full border-lg h-[200px] flex flex-col items-center justify-center'>
                    <Loader className='size-5 animate-spin text-muted-foreground'/>
                </div>
                ) :
                (
            <>
            <TabsContent value='table' className='mt-0'>
                   <DataTable columns={columns} data={tasks.documents ?? []} />
            </TabsContent>
            <TabsContent value='kanban' className='mt-0'>
                <Datakanban onChange={onkanbanChange} data={tasks.documents ?? []} />
            </TabsContent>
            <TabsContent value='calendar' className='mt-0 h-full pb-4'>
                    <DataCalendar data={tasks.documents ?? []} />
            </TabsContent>
            </>
                )
            }
        </div>
    </Tabs>
  )
}
