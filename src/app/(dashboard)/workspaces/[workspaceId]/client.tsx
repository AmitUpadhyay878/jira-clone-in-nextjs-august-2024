'use client'

import { PageError } from "@/components/page-error"
import { PageLoader } from "@/components/page-loader"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal"
import { useGetTasks } from "@/features/tasks/api/use-get-tasks"
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal"
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"

export const WorkspaceIdClient = () => {

    const workspaceId = useWorkspaceId()
    const {data:analytics,isLoading:isLoadingWorkspaceAnalytics} = useGetWorkspaceAnalytics({workspaceId})
    const {data:tasks,isLoading:isLoadingTask} = useGetTasks({workspaceId})
    const {data:projects, isLoading:isLoadingProjects} = useGetProjects({workspaceId})
    const {data:members, isLoading:isLoadingMembers} = useGetMembers({workspaceId})

    const {open: createProject} = useCreateProjectModal()
    const {open: createTask} = useCreateTaskModal()
    
    const isLoading = isLoadingWorkspaceAnalytics || isLoadingTask || isLoadingProjects || isLoadingMembers;

    if(isLoading){
        return <PageLoader/>
    }

    if(!analytics || !tasks || !projects || !members){
        return <PageError message="Fail to load workspace data" />
    }
    
    return (
        <div className="h-full flex ">
        <h1>WorkspaceIdClient</h1>
        </div>
    )
}