'use client'
import Link from 'next/link'
import { PlusIcon,CalendarIcon, SettingsIcon } from "lucide-react"
import {formatDistanceToNow} from 'date-fns'
import { Task } from "@/features/tasks/types"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal"
import { useGetTasks } from "@/features/tasks/api/use-get-tasks"
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal"
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { Analytics } from "@/components/analytics"
import { DottedSepatator } from "@/components/dotted-separator"
import { PageError } from "@/components/page-error"
import { PageLoader } from "@/components/page-loader"
import { Button } from "@/components/ui/button"
import {Card,CardContent} from '@/components/ui/card'
import { Project } from '@/features/projects/types'
import { ProjectAvatar } from '@/features/projects/components/project-avatar'
import { Member } from '@/features/members/types'
import { MemberAvatar } from '@/features/members/components/member-avatar'

export const WorkspaceIdClient = () => {

    const workspaceId = useWorkspaceId()
    const {data:analytics,isLoading:isLoadingWorkspaceAnalytics} = useGetWorkspaceAnalytics({workspaceId})
    const {data:tasks,isLoading:isLoadingTask} = useGetTasks({workspaceId})
    const {data:projects, isLoading:isLoadingProjects} = useGetProjects({workspaceId})
    const {data:members, isLoading:isLoadingMembers} = useGetMembers({workspaceId})

    const isLoading = isLoadingWorkspaceAnalytics || isLoadingTask || isLoadingProjects || isLoadingMembers;

    if(isLoading){
        return <PageLoader/>
    }    

    if(!analytics || !tasks || !projects || !members){
        return <PageError message="Fail to load workspace data" />
    }
    
    return (
        <div className="h-full flex flex-col space-y-4">
        <Analytics data={analytics} />
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <ProjectList data={projects?.documents} total={projects?.total} />
            <MembersList data={members?.documents} total={members?.documents?.length ? members?.documents?.length : "0"} />
            <TaskList data={tasks?.documents} total={tasks?.total} />
        </div>
        </div>
    )
}

//Tasks Listing
interface TaskListProps{
    data:Task[];
    total:number;
}

export const TaskList = ({data,total}:TaskListProps) => {
    const {open: createTask} = useCreateTaskModal()
    const workspaceId = useWorkspaceId()
    return(
        <div className="flex flex-col gap-y-4 col-span-1">
           <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                        Tasks ({total})
                    </p>
                    <Button variant="muted" size={"icon"} onClick={createTask}>
                        <PlusIcon className="size-4 text-neutral-400"/> 
                    </Button>
                </div>
                <DottedSepatator className="my-4"/>
                <ul className='flex flex-col gap-y-4'>
                    {data.slice(0,4).map((task)=>{
                        return(
                            <li key={task.$id} className="flex flex-col gap-y-2">
                                <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                                <Card className='shadow-none rounded-lg hover:opacity-75 transition'> 
                                    <CardContent className='p-4 '>
                                    <p className="text-md font-medium truncate">{task?.name}</p>
                                    <div className='text-sm flex items-center gap-x-2'>
                                        <p>{task?.project?.name}</p>
                                        <div className='size-1 rounded bg-neutral-300 ' />
                                        <div className='text-sm text-muted-foreground flex items-center '>
                                            <CalendarIcon className='size-3 mr-1' />
                                            <span className='truncate'>{formatDistanceToNow(new Date(task?.dueDate))}</span>
                                        </div>
                                    </div>
                                    </CardContent>
                                </Card>
                                </Link>
                            </li>
                        )
                    })}
                    <li className='text-sm text-muted-foreground text-center hidden first-of-type:block'>No Task Found</li>
                </ul>
                <Button variant="muted" className='mt-4 w-full' asChild>
                    <Link href={`/workspaces/${workspaceId}/tasks`}>
                    Show All
                    </Link>
                </Button>
           </div>
        </div>
    )
}

//Projects Listing
interface ProjectListProps{
    data:Project[];
    total:number;
}

export const ProjectList = ({data,total}:ProjectListProps) => {
    const {open: createProject} = useCreateProjectModal()
    const workspaceId = useWorkspaceId()
    return(
        <div className="flex flex-col gap-y-4 col-span-1">
           <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                        Projects ({total})
                    </p>
                    <Button variant="secondary" size={"icon"} onClick={createProject}>
                        <PlusIcon className="size-4 text-neutral-400"/> 
                    </Button>
                </div>
                <DottedSepatator className="my-4"/>
                <ul className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    {data.map((project)=>{                 
                        return(
                            <li key={project.$id} className="flex flex-col gap-y-2">
                                <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                                <Card className='shadow-none rounded-lg hover:opacity-75 transition'> 
                                   <CardContent className='p-4 flex items-center gap-x-2.5'>
                                    <ProjectAvatar
                                    className='size-10'
                                    fallbackClassName='text-md'
                                        name={project?.name}
                                        image={project?.imageUrl}
                                    />
                                    <p className='text-md font-medium truncate'>{project?.name}</p>
                                   </CardContent>
                                </Card>
                                </Link>
                            </li>
                        )
                    })}
                    <li className='text-sm text-muted-foreground text-center hidden first-of-type:block'>No project Found</li>
                </ul>
           </div>
        </div>
    )
}

//Members Listing
interface MembersListProps{
    data:Member[];
    total:number;
}

export const MembersList = ({data,total}:MembersListProps) => {
    const workspaceId = useWorkspaceId()

        return(
        <div className="flex flex-col gap-y-4 col-span-1">
           <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                        Members ({total})
                    </p>
                    <Button asChild variant="secondary" size={"icon"}>
                        <Link href={`/workspaces/${workspaceId}/members`}>
                        <SettingsIcon className="size-4 text-neutral-400"/> 
                        </Link>
                    </Button>
                </div>
                <DottedSepatator className="my-4"/>
                <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {data.map((member)=>{
                        return(
                            <li key={member.$id} className="flex flex-col gap-y-2">                   
                                <Card className='shadow-none rounded-lg overflow-hidden'> 
                                   <CardContent className='p-3 flex flex-col items-center gap-x-2'>
                                    <MemberAvatar
                                    className='size-10'
                                        name={member?.name}
                                        image={member?.imageURL}
                                    />
                                    <div className='flex flex-col items-center overflow-hidden'>
                                    <p className='text-md font-medium line-clamp-1'>{member?.name}</p>
                                    {/* <p className='text-sm text-muted-foreground line-clamp-1'>{member?.email}</p> */}
                                    </div>
                                   </CardContent>
                                </Card>
                            </li>
                        )
                    })}
                    <li className='text-sm text-muted-foreground text-center hidden first-of-type:block'>No Members Found</li>
                </ul>
           </div>
        </div>
    )
}