import {toast} from 'sonner'
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.projects)["$post"],200>;
type RequestType = InferRequestType<(typeof client.api.projects)["$post"]>;

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const multation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.projects["$post"]({ form });
      if(!response.ok){
        throw new Error("Fail to create a new project")
      }
      return await response.json();
    },

    onSuccess: () => {
        toast.success("Project created successfully")
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError:()=>{
        toast.error("Fail to create a project")
    }
  });

  return multation;
};