import {toast} from 'sonner'
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.members[":memberId"]["$delete"],200>;
type RequestType = InferRequestType<typeof client.api.members[":memberId"]["$delete"]>;

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  const multation = useMutation<ResponseType, Error, RequestType>({
    
    mutationFn: async ({ param }) => {

      const response = await client.api.members[":memberId"]["$delete"]({ param });
      
      if(!response.ok){
        throw new Error("Fail to Delete a new member")
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("member Deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["members"] });
      // queryClient.invalidateQueries({ queryKey: ["member",data?.$id] });
    },
    onError:()=>{
        toast.error("Fail to Delete a member")
    }
  });

  return multation;
};
