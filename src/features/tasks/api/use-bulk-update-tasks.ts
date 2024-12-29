import { client } from "@/lib/rpc";
import {toast} from 'sonner'
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.tasks["bulk-update"]["$post"],200>;
type RequestType = InferRequestType<typeof client.api.tasks["bulk-update"]["$post"]>;

export const useBulkUpdateTasks= () => {

    // const router = useRouter()
  const queryClient = useQueryClient();
  const multation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks["bulk-update"]["$post"]({ json });
      if(!response.ok){
        throw new Error("Fail to update a tasks")
      }
      return await response.json();
    },
    onSuccess: ({data}) => {
      // router.refresh()
      // window.location.reload()
      queryClient.invalidateQueries({ queryKey: ["tasks"]});
      queryClient.invalidateQueries({ queryKey: ["tasks",data.workspaceId]});
    },
    onError:(error)=>{
      toast.error(error.message || "Failed to update tasks");
    }
  });

  return multation;
};
