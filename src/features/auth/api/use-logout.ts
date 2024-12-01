import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;
// type RequestType = InferRequestType<typeof client.api.auth.logout["$post"]>

export const useLogout = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const multation = useMutation<
    ResponseType,
    Error
    // RequestType
  >({
    mutationFn: async () => {
      const response = await client.api.auth.logout["$post"]();
      if(!response.ok){
        throw new Error("Fail to logout")
      }
      return await response.json();
    },

    onSuccess: () => {
      router.refresh();
      // window.location.reload()
      queryClient.invalidateQueries({ queryKey: ["current"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError:()=>{
      toast.error("Fail to logout")
    }
  });

  return multation;
};
