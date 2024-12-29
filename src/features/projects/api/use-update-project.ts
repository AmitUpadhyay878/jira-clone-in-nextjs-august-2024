import {toast} from 'sonner'
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";


type ResponseType = InferResponseType<(typeof client.api.projects)[":projectId"]["$patch"],200>;
type RequestType = InferRequestType<(typeof client.api.projects)[":projectId"]["$patch"]>;

export const useUpdateProject = () => {

  const queryClient = useQueryClient();
  const multation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form,param }) => {
      const response = await client.api.projects[":projectId"]["$patch"]({ form,param });
      if(!response.ok){
        throw new Error("Fail to update a new project")
      }
      return await response.json();
    },

    onSuccess: ({data}) => {
        toast.success("Project updated successfully")
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project",data.$id] });
    },
    onError:()=>{
        toast.error("Fail to update a project")
    }
  });

  return multation;
};
