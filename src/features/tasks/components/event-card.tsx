import React from 'react'
import { useRouter } from 'next/navigation';
import { taskStatus } from '../types'
import { Project } from '@/features/projects/types';
import { cn } from '@/lib/utils';
import { MemberAvatar } from '@/features/members/components/member-avatar';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { Member } from '@/features/members/types';

interface EventCardProps {
    id:string;
    title: string;
    assignee: Member;
    project: Project;
    status: taskStatus;
}

const statusColorMap:Record<taskStatus,string> = {
    [taskStatus.BACKLOG]:"border-l-pink-500 border-l-2",
    [taskStatus.DONE]:"border-l-green-500 border-l-2",
    [taskStatus.IN_PROGRESS]:"border-l-yellow-500 border-l-2",
    [taskStatus.IN_REVIEW]:"border-l-blue-500 border-l-2",
    [taskStatus.TODO]:"border-l-red-500 border-l-2",
}

export const EventCard = ({
    id,
    title,
    assignee,
    project,
    status
}:EventCardProps) => {

    const workspaceId = useWorkspaceId() 
    const router = useRouter()

    const onClick = (e:React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation()
        router.push(`/workspaces/${workspaceId}/tasks/${id}`)
    }

  return (
    <div className='px-2'>
        <div onClick={onClick} className={cn(
            "p-1.5 text-xs bg-white text-primary border rounded-md boder-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
            statusColorMap[status]
        )}>
            <p className=''>{title}</p>
            <div className='flex items-center gap-x-1'>
                <MemberAvatar
                    name={assignee?.name}
                />
                <div className='size-1 rounded-full bg-neutral-300'/>
                <ProjectAvatar
                    name={project?.name}
                    image={project?.imageUrl}
                />
            </div>
        </div>
    </div>
  )
}

