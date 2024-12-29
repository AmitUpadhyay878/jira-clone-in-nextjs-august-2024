import React,{useState,useEffect, useCallback} from 'react'
import { Task,taskStatus } from "../types";
import {
    DragDropContext,
    Droppable,
    Draggable,
    type DropResult
} from '@hello-pangea/dnd'
import KanbanColumnHeader from './kanban-column-header';
import {KanbanCard} from './Kanban-card';


const boards:taskStatus[] = [
    taskStatus.BACKLOG,
    taskStatus.TODO,
    taskStatus.IN_PROGRESS,
    taskStatus.IN_REVIEW,
    taskStatus.DONE
]

type Taskstate={
    [key in taskStatus]:Task[]
}

interface DatakanbanProps{
data:Task[],
onChange:(tasks:{$id:string;status:taskStatus;position:number}[])=>void;
}

export const Datakanban =({data,onChange}:DatakanbanProps)=>{

    const [tasks, setTasks] =useState<Taskstate>(()=>{
        const initialTasks: Taskstate={
            [taskStatus.BACKLOG]:[],
            [taskStatus.TODO]:[],
            [taskStatus.IN_PROGRESS]:[],
            [taskStatus.IN_REVIEW]:[],
            [taskStatus.DONE]:[],
        }

        data.forEach((task)=>{
            initialTasks[task?.status].push(task)
        })

        Object.keys(initialTasks).forEach((status)=>{
            initialTasks[status as taskStatus].sort((a,b)=>a.position - b.position)
        })

        return initialTasks
    }) 


    useEffect(()=>{
        const newTask: Taskstate={
            [taskStatus.BACKLOG]:[],
            [taskStatus.TODO]:[],
            [taskStatus.IN_PROGRESS]:[],
            [taskStatus.IN_REVIEW]:[],
            [taskStatus.DONE]:[],
        }

        data.forEach((task)=>{
            newTask[task?.status].push(task)
        })

        Object.keys(newTask).forEach((status)=>{
            newTask[status as taskStatus].sort((a,b)=>a.position-b.position)
        })
        setTasks(newTask)
    },[data])

    const onDragEnd= useCallback((result:DropResult)=>{
            if(!result.destination) return;

            const{source, destination} =result;

            const sourceStatus = source?.droppableId as taskStatus;
            const destinationStatus = destination?.droppableId as taskStatus;

            let updatedPayload :{
                $id:string;
                status: taskStatus;
                position:number;
            }[] = []

            setTasks((prevTasks) => {
                    const newTask = {...prevTasks}

            //safely Remove the task from the source column
            const sourceColumn = [...newTask[sourceStatus]]
            const [movedTask] = sourceColumn.splice(source.index,1)
            
            //if there is no moved task so previously exist
            if(!movedTask){
                console.log("No task found at the source index")
                return prevTasks
            }

            // create a new object with potentially updated status
            const updatedMovedTask = sourceStatus !=destinationStatus 
            ? {...movedTask, status:destinationStatus}
            :movedTask

            //updating a source column
            newTask[sourceStatus] = sourceColumn

            //Add a  task in a destination column
            const destinationColumn=[...newTask[destinationStatus]]

            destinationColumn.splice(destination.index,0,updatedMovedTask)

            newTask[destinationStatus] = destinationColumn;

            //update payload
            updatedPayload =[]

            //always update the moved task
            updatedPayload.push({
                $id:updatedMovedTask?.$id,
                status:destinationStatus,
                position:Math.min((destination?.index+1)*1000, 1_000_000)
            })

            //update a postion of affected tasks in the destination column
             newTask[destinationStatus].forEach((task,index)=>{
                if(task &&  task?.$id !== updatedMovedTask?.$id){
                    const newPosition = Math.min((index+1)*1000,1_000_000)

                    if(task.position !==newPosition){
                        updatedPayload.push({
                            $id:task?.$id,
                            status: destinationStatus,
                            position:newPosition
                        })
                    }
                }
             })

            if(sourceStatus !== destinationStatus){
                newTask[sourceStatus].forEach((task, index)=>{
                    if(task){
                        const newPosition= Math.min((index+1)*1000,1_000_000)

                        if(task.position !==newPosition){
                            updatedPayload.push({
                                $id:task?.$id,
                                status:sourceStatus,
                                position:newPosition
                            })
                        }
                    }
                })
            }

            return newTask
            })
        
            onChange(updatedPayload)

    },[onChange])

    return (
        <DragDropContext onDragEnd={onDragEnd} >
            <div className='flex overflow-x-hidden'>
                {boards?.map((board)=>{
                    return(
                        <div key={board} className='flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]'>
                            {/* {board} */}
                            <KanbanColumnHeader 
                                board={board}
                                taskCount={tasks[board].length}
                            />
                            <Droppable droppableId={board}>
                                {(provided)=>(
                                    <div 
                                    className='min-h-[200px] py-1.5'
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    >
                                        {tasks[board].map((task,index)=>{
                                            return(
                                                <Draggable
                                                    key={task?.$id}
                                                    draggableId={task?.$id}
                                                    index={index}
                                                >
                                                    {(provided)=>(
                                                        <div 
                                                        className=''
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        >
                                                           <KanbanCard task={task}  />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )})}
                                            
                                            {provided?.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    )
                })}
            </div>
        </DragDropContext>
    )

}