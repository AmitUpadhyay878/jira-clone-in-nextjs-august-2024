import React from 'react'
import Link from 'next/link';
import { ChevronRightIcon, TrashIcon } from 'lucide-react';
import { Project } from '@/features/projects/types'
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { Task } from '../types'
import { Button } from '@/components/ui/button';
import { useDeleteTask } from '../api/use-delete-task';
import { useConfirm } from '@/hooks/use-confirm';
import { useRouter } from 'next/navigation';

interface TaskBreadCrumbProps{
    project:Project;
    task:Task;
}

export const TaskBreadCrumb = ({project,task}:TaskBreadCrumbProps) => {

    const workspaceId = useWorkspaceId()
    const router = useRouter()

    const{mutate:deleteTask, isPending:isTaskDeletePending}  = useDeleteTask()
    const [ConfirmDialog, confirm] = useConfirm(
        "Delete task?",
        "This action cannot be undone.",
        "destructive"
    )

    const handleDeleteTask = async()=>{
        const ok = await confirm()

        if(!ok) return

        deleteTask({param:{taskId:task?.$id}},{
            onSuccess:()=>{
                router.push(`/workspaces/${workspaceId}/tasks`)
            }
        })
    }

  return (
    <div className='flex items-center gap-x-2'>
        <ConfirmDialog />
        <ProjectAvatar
            name={project?.name}
            image={project?.imageUrl}
            className='size-6 lg:size-8'
        />
        <Link href={`/workspaces/${workspaceId}/projects/${project?.$id}`} className='flex items-center justify-between gap-x-2'>
            <p className='text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition'>{project?.name}</p>
            <ChevronRightIcon className='size-4 lg:size-5 text-muted-foreground' />
        </Link>
            <p className='text-sm lg:text-lg font-semibold'>{task?.name}</p>
            <Button onClick={handleDeleteTask} disabled={isTaskDeletePending} className='ml-auto' variant="destructive" size="sm"><TrashIcon className='size-4 lg:mr-2'/><span className='hidden lg:block'>Delete Task</span></Button>
    </div>
  )
}
