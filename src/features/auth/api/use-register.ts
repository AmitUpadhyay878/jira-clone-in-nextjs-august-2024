import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.auth.register)["$post"]
>;
type RequestType = InferRequestType<(typeof client.api.auth.register)["$post"]>;

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const multation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register["$post"]({ json });

      if(!response.ok){
        throw new Error("Fail to register")
      }

      return await response.json();
    },

    onSuccess: () => {
      toast.success("Register new user sucessfully")
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError:()=>{
      toast.error("Fail to register a new user")
    }
  });

  return multation;
};