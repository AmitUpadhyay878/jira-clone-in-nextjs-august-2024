import { useRouter } from 'next/navigation';
import {toast} from 'sonner'
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$patch"],200>;
type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$patch"]>;

export const useUpdateTask= () => {
  const router = useRouter()
  const queryClient = useQueryClient();
  const multation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json,param }) => {
      const response = await client.api.tasks[":taskId"]["$patch"]({ json,param });
      if(!response.ok){
        throw new Error("Fail to update a new task")
      }
      return await response.json();
    },

    onSuccess: ({data}) => {
        toast.success("Task updated successfully")
        router.refresh()
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task",data?.$id] });
    },
    onError:(error)=>{
      toast.error(error.message || "Failed to update task");
    }
  });

  return multation;
};
