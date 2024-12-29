import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import { CreateTakForm } from "./create-task-form";

interface createTaskformWrapperProps {
    onCancel: () => void;
}

export const CreateTaskFormWrapper = ({ onCancel }: createTaskformWrapperProps) => {
    const workspaceId = useWorkspaceId()
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


const isLoading = isLoadingProjects || isLoadingMembers

if(isLoading){
    return(
    <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex justify-center items-center h-full">
            <Loader className="size-5 animate-spin text-muted-foreground"/>
        </CardContent>
    </Card>
    )
}


    return (
        <CreateTakForm 
            onCancel={onCancel}
            projectOptions={projectOptions ?? []}
            memberOptions={memberOptions ?? []}

        />
    )
}