import React, { useState } from 'react'
import { Task } from '../types'
import {PencilIcon, XIcon} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Textarea} from '@/components/ui/textarea'
import {DottedSepatator} from '@/components/dotted-separator'
import {useUpdateTask} from '../api/use-update-task'

interface TaskDescriptionProps{
    task:Task;
}


const TaskDescription = ({task}:TaskDescriptionProps) => {

    const[isEditing, setIsEditing] =useState(false)
    const[value, setValue] =useState(task?.description)
    const{mutate:updateTask, isPending:isUpdateTaskPending} =useUpdateTask()

    const handleSave =()=>{
        updateTask({
            json:{ description: value },
            param:{taskId:task?.$id}
        },
        {
            onSuccess:()=>{
                setIsEditing(false)
            }
        }
        
    )
    }

  return (
    <div className='p-4 border rounded-lg'>
        <div className='flex items-center justify-between'>
            <p className='text-lg font-semibold'> Description</p>
            <Button onClick={()=>setIsEditing((prev)=>!prev)} size="sm" variant="secondary"> 
                {
                    isEditing ? (
                        <XIcon className='size-4 mr-2' />
                    ): (
                        <PencilIcon className='size-4 mr-2' />
                    )
                }
                    {isEditing ? "Cancel" : "Edit"}
            </Button>
        </div>
        <DottedSepatator className='my-4'/>
        {isEditing ? (
        <div className='flex flex-col gap-y-4'>
            <Textarea
            placeholder='Add a description...'
            value={value}
            rows={4}
            onChange={(e)=>setValue(e?.target?.value)}
            disabled={isUpdateTaskPending}
            />
            <Button
            size="sm"
            className='w-fit ml-auto'
            onClick={handleSave}
            disabled={isUpdateTaskPending}
            >
                {isUpdateTaskPending ? "Saving...": "Save Changes"}
            </Button>
        </div>
        ):
        (
            <div className=''>
                {task?.description ||(
                    <span className='text-muted-foreground'>No description set</span>
                )}
            </div>
        )
    }
    </div>
  )
}

export default TaskDescription
