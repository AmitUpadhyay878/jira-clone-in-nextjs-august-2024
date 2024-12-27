import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import {toast} from 'sonner'
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.tasks)[":taskId"]["$delete"],400>;
type RequestType = InferRequestType<(typeof client.api.tasks)[":taskId"]["$delete"]>;

export const useDeleteTask= () => {

  const router = useRouter()
  const queryClient = useQueryClient();
  const multation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.tasks["$delete"][":taskId"]({ param });
      if(!response.ok){
        throw new Error("Fail to delete a new task")
      }
      return await response.json();
    },

    onSuccess: ({data}) => {
        toast.success("Task deleted successfully")
        router.refresh()
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks",data?.$id] });
    },
    onError:()=>{
        toast.error("Fail to delete a task")
    }
  });

  return multation;
};
