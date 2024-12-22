
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface useGetProjectsProps{
    workspaceId:string;

}

export const useGetProject = ({workspaceId}:useGetProjectsProps) => {
  const query = useQuery({
    queryKey: ["projects",workspaceId],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query:{workspaceId}
      });

      if (!response.ok) {
       throw new Error("Failed to load a projects")
      }
      const { data } = await response.json();

      console.log(data,"projects");
      

      return data;
    },
  });
  return query;
};
