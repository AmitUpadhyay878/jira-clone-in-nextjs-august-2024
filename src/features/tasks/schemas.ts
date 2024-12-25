import { z } from "zod";
import { taskStatus } from "./types";

export const createTaskSchema = z.object({
   name: z.string().trim().min(1,"Name is required"),
   status:z.nativeEnum(taskStatus,{required_error:"Status is required"}),
   workspaceId: z.string().trim().min(1,"Workspace is required"),
   projectId: z.string().trim().min(1,"project is required"),
   dueDate:z.coerce.date(),
   assigneeId: z.string().trim().min(1,"assignee is required"),
   description:z.string().optional(),
   
})