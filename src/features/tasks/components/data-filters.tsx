'use client'
import React from 'react'
import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectSeparator
} from '@/components/ui/select'; 
import {DatePicker} from '@/components/date-picker'   
import {FolderIcon, ListChecksIcon, UserIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { taskStatus } from '../types';
import { useTaskFilters } from '../hooks/use-task-filters';
interface DataFiltersProps {
hideProjectFilter?:boolean;
}

const DataFilters = ({hideProjectFilter}:DataFiltersProps) => {

    const workspaceId = useWorkspaceId()
    const{data:projects,isLoading:isWorkspaceLoading} = useGetProjects({workspaceId})
    const{data:members,isLoading:isMemberLoading} = useGetMembers({workspaceId})

    const isLoading = isWorkspaceLoading || isMemberLoading;

    const projectOptions = projects?.documents.map((project:any) => ({
        value:project?.$id,
        label:project?.name
    })
    )
    const memberOptions = members?.documents.map((member:any) => ({
    value:member?.$id,
    label:member?.name    
})
    )

const[{
    status,
    assigneeId,
    projectId,
    dueDate,
},setFilters] = useTaskFilters()

const onStatusChange = (value:string) => {
    setFilters({status: value==="all" ? null :value as string})
}
const onAssigneeChange = (value:string) => {
    setFilters({assigneeId: value==="all" ? null :value as string})
    }

    const onProjectChange = (value:string) => {
        setFilters({projectId: value==="all" ? null :value as string})
        }    
        
        if(isLoading) return null

  return (
    <div className='flex flex-col lg:flex-row gap-2'>

        {/* Task Status */}
        <Select 
        defaultValue={status ?? undefined}
        onValueChange={(value)=>onStatusChange(value)} 
        >
            <SelectTrigger className='w-full lg:w-auto h-8'>
                <div className='flex items-center pr-2'>
                    <ListChecksIcon className='size-4 mr-2' />
                    <SelectValue placeholder="All statues" />
                </div>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"all"}>
                    All Statuses
                </SelectItem>
                <Separator/>
                <SelectItem value={taskStatus?.BACKLOG}>
                    BackLog
                </SelectItem>
                <SelectItem value={taskStatus?.IN_PROGRESS}>
                    In Progress
                </SelectItem>
                <SelectItem value={taskStatus?.IN_REVIEW}>
                    In Review
                </SelectItem>
                <SelectItem value={taskStatus?.TODO}>
                    ToDo
                </SelectItem>
                <SelectItem value={taskStatus?.DONE}>
                    Done
                </SelectItem>
            </SelectContent>
        </Select>

        {/* Assignee ID */}
        <Select 
        defaultValue={assigneeId ?? undefined}
        onValueChange={(value)=>onAssigneeChange(value)} 
        >
            <SelectTrigger className='w-full lg:w-auto h-8'>
                <div className='flex items-center pr-2'>
                    <UserIcon className='size-4 mr-2' />
                    <SelectValue placeholder="All assignees" />
                </div>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"all"}>
                    All Assignees
                </SelectItem>
                <Separator/>
                {memberOptions?.map((member:any)=>(
                    <SelectItem key={member?.value} value={member?.value}>
                        {member?.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

         {/* Project ID */}
         {!hideProjectFilter && (
         <Select 
        defaultValue={projectId ?? undefined}
        onValueChange={(value)=>onProjectChange(value)} 
        >
            <SelectTrigger className='w-full lg:w-auto h-8'>
                <div className='flex items-center pr-2'>
                    <FolderIcon className='size-4 mr-2' />
                    <SelectValue placeholder="All Projects" />
                </div>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"all"}>
                    All Projects
                </SelectItem>
                <Separator/>
                {projectOptions?.map((project:any)=>(
                    <SelectItem key={project?.value} value={project?.value}>
                        {project?.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
         )}
        
        {/* Due Date */}
        <DatePicker 
        placeholder='Due Date' 
        className='w-full lg:w-auto h-8'
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={ (date:Date) => setFilters({dueDate:date ? date.toISOString():null})}
         />
    </div>
  )
}

export default DataFilters
