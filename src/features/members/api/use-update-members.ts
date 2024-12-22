import {toast} from 'sonner'
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.members[":memberId"]["$patch"],200>;
type RequestType = InferRequestType<typeof client.api.members[":memberId"]["$patch"]>;

export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  const multation = useMutation<ResponseType, Error, RequestType>({
    
    mutationFn: async ({ param,json }) => {

      const response = await client.api.members[":memberId"]["$patch"]({ param,json });
      
      if(!response.ok){
        throw new Error("Fail to update a member")
      }
      return await response.json();
    },

    onSuccess: () => {
      toast.success("member updated successfully")
      queryClient.invalidateQueries({ queryKey: ["members"] });
      // queryClient.invalidateQueries({ queryKey: ["member",data?.$id] });
    },
    onError:()=>{
        toast.error("Fail to update a member")
    }
  });

  return multation;
};
