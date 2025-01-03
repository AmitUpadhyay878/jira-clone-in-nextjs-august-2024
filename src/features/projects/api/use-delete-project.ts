import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import {toast} from 'sonner'


type ResponseType = InferResponseType<(typeof client.api.projects)[":projectId"]["$delete"],200>;
type RequestType = InferRequestType<(typeof client.api.projects)[":projectId"]["$delete"]>;

export const useDeleteProject = () => {

  const queryClient = useQueryClient();
  const multation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[":projectId"]["$delete"]({param });
      if(!response.ok){
        throw new Error("Fail to delete a new project")
      }
      return await response.json();
    },

    onSuccess: ({data}) => {
        toast.success("Project deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project",data.$id] });
    },
    onError:()=>{
        toast.error("Fail to delete a project")
    }
  });

  return multation;
};
