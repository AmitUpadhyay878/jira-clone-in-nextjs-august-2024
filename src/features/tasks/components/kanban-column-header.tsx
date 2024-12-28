import React from 'react'
import { Task, taskStatus } from '../types'
import { snakeCasetoTitleCase } from '@/lib/utils';
import {
    CircleCheckIcon,
    CircleDashedIcon,
    CircleDotIcon,
    CircleIcon,
    CircleDotDashedIcon,
    PlusIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button';
import { useCreateTaskModal } from '../hooks/use-create-task-modal';

interface KanbanColumnHeaderProps{
    board:taskStatus;
    taskCount:number;
}

const statusIconMap : Record<taskStatus, React.ReactNode>={

    [taskStatus.BACKLOG]:(
        <CircleDashedIcon className='size-[18px] text-pink-400' />
    ),
    [taskStatus.TODO]:(
        <CircleIcon className='size-[18px] text-red-400' />
    ),
    [taskStatus.IN_PROGRESS]:(
        <CircleDotDashedIcon className='size-[18px] text-yellow-400' />
    ),
    [taskStatus.IN_REVIEW]:(
        <CircleDotIcon className='size-[18px] text-blue-400' />
    ),
    [taskStatus.DONE]:(
        <CircleCheckIcon className='size-[18px] text-green-400' />
    ),
}

const KanbanColumnHeader = ({board,taskCount}:KanbanColumnHeaderProps) => {

    const {open} = useCreateTaskModal()

    const icon =  statusIconMap[board]

  return (
    <div className='px-2 py-1.5 flex items-center justify-between'>
       <div className='flex items-center gap-x-2'>
        {icon}
            <h2 className='text-sm font-medium'>{snakeCasetoTitleCase(board)}</h2>
            <div className='size-5 flex items-center justify-center rounded-md bg-neutral-200 text-xs text-neutral-700 font-medium'>{taskCount}</div>
       </div>
       <Button 
       onClick={open} 
       variant="ghost" 
       size="icon"
       className='size-5 '
       >
            <PlusIcon className='size-4 text-neutral-500' />
       </Button>
    </div>
  )
}

export default KanbanColumnHeader
