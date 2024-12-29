import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import { useGetTask } from "../api/use-get-task";
import { EditTaskForm } from "./update-task-form";

interface editTaskformWrapperProps {
    onCancel: () => void;
    id:string;
}

export const EditTaskFormWrapper = ({ onCancel, id }: editTaskformWrapperProps) => {
    const workspaceId = useWorkspaceId()

    const{data:initialValues, isLoading:isLoadingTask} = useGetTask({
        taskId:id,
    })

    const { data:projects, isLoading:isLoadingProjects} = useGetProjects({ workspaceId })
    const { data:members, isLoading:isLoadingMembers} = useGetMembers({ workspaceId })
    
    const projectOptions = projects?.documents.map((project:any) => ({
            id:project.$id,
            name:project.name,
            imageUrl:project.imageUrl
    }))

    const memberOptions = members?.documents.map((project:any) => ({
        id:project.$id,
        name:project.name,
}))


const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask

if(isLoading){
    return(
    <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex justify-center items-center h-full">
            <Loader className="size-5 animate-spin text-muted-foreground"/>
        </CardContent>
    </Card>
    )
}

if(!initialValues){
    return null;
}

    return (
        <EditTaskForm 
            onCancel={onCancel}
            initialValues={initialValues}
            projectOptions={projectOptions ?? []}
            memberOptions={memberOptions ?? []}

        />
    )
}