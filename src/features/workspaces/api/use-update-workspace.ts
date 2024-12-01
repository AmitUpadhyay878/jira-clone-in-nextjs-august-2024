import {toast} from 'sonner'
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.workspaces)[":workspaceId"]["$patch"], 200>;
type RequestType = InferRequestType<(typeof client.api.workspaces)[":workspaceId"]["$patch"]>;

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();
  const multation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.workspaces[":workspaceId"]["$patch"]({ form, param });
      if(!response.ok){
        throw new Error("Fail to update a new workspace")
      }
      return await response.json();
    },

    onSuccess: ({data}) => {
        toast.success("Workspace update successfully")
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace",data?.$id] });
    },
    onError:()=>{
        toast.error("Fail to update a workspace")
    }
  });

  return multation;
};
