import {toast} from 'sonner'
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$delete"],200>;
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["$delete"]>;

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  const multation = useMutation<ResponseType, Error, RequestType>({
    
    mutationFn: async ({ param }) => {

      const response = await client.api.workspaces[":workspaceId"]["$delete"]({ param });
      
      if(!response.ok){
        throw new Error("Fail to Delete a new workspace")
      }
      return await response.json();
    },

    onSuccess: ({data}) => {
      toast.success("Workspace Deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace-analytics"] });
      queryClient.invalidateQueries({ queryKey: ["workspace",data?.$id] });
    },
    onError:()=>{
        toast.error("Fail to Delete a workspace")
    }
  });

  return multation;
};
