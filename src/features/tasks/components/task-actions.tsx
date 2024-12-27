import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { CornerDownRight, ExternalLinkIcon, PencilIcon, TrashIcon } from 'lucide-react';

import {useDeleteTask} from '../api/use-delete-task'
import { useConfirm } from '@/hooks/use-confirm';

interface TaskActionsProps{
    id:string;
    projectId:string;
    children:React.ReactNode;
}

export const TaskActions=({id, projectId, children}:TaskActionsProps)=>{

    const [ConfirmDialog, confirm] = useConfirm(
        "Delete Task",
        "This action cannot be undone",
        "destructive"
    )

    const {mutate:taskDelete, isPending:isTaskDeletePending} = useDeleteTask()

    const onDelete=async()=>{
        const ok =await confirm()

        if(!ok) return;
        taskDelete({param:{taskId:id}})
    }
 
        return(
            <div className='flex justify-end'>
                <ConfirmDialog />
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        {children}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-48'>
                        <DropdownMenuItem onClick={()=>{}} className='font-medium p-[10px]'>
                           <ExternalLinkIcon className='size-4 mr-2 stroke-2' />
                           Task Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{}} className='font-medium p-[10px]'>
                           <CornerDownRight className='size-4 mr-2 stroke-2' />
                          Task Open
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{}} className='font-medium p-[10px]'>
                           <PencilIcon className='size-4 mr-2 stroke-2' />
                           Task Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete} disabled={isTaskDeletePending} className='text-amber-700 focus:text-amber-700 font-medium p-[10px]'>
                           <TrashIcon className='size-4 mr-2 stroke-2' />
                           Task Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        )
}