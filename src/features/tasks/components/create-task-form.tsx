"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DottedSepatator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTaskSchema } from "../schemas";
import { useCreateTask } from "../api/use-create-task";
import { toast } from "sonner";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { DatePicker } from "@/components/date-picker";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { taskStatus } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

interface CreateTaskFormProps {
  onCancel?: () => void;
  projectOptions: { id: string; name: string; imageUrl: string }[];
  memberOptions: { id: string; name: string }[];
}

export const CreateTakForm = ({
  onCancel,
  projectOptions,
  memberOptions,
}: CreateTaskFormProps) => {
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useCreateTask();

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema.omit({ workspaceId: true })),
    defaultValues: {
      workspaceId,
      name: "",
      dueDate: undefined ,
      assigneeId: "",
      status: undefined,
      projectId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createTaskSchema>) => {
    mutate(
      { json: { ...values, workspaceId } },
      {
        onSuccess: () => {
          form.reset();
          onCancel?.();
        },
        onError: () => {
          toast.error("Something went wrong to create a project");
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Create a new Task</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSepatator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              {/* Task Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Task name" value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Due Date Field */}
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Assignee Field */}
              <FormField
                control={form.control}
                name="assigneeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <Select
                      value={field.value || ""}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Assignee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {memberOptions.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            <div className="flex items-center gap-x-2">
                              <MemberAvatar className="size-6" name={member?.name} />
                              {member?.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status Field */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      value={field.value || ""}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={taskStatus?.BACKLOG}>BackLog</SelectItem>
                        <SelectItem value={taskStatus?.IN_PROGRESS}>In Progress</SelectItem>
                        <SelectItem value={taskStatus?.IN_REVIEW}>In Review</SelectItem>
                        <SelectItem value={taskStatus?.TODO}>ToDo</SelectItem>
                        <SelectItem value={taskStatus?.DONE}>Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Project Field */}
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select
                      value={field.value || ""}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projectOptions.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            <div className="flex items-center gap-x-2">
                              <ProjectAvatar
                                className="size-6"
                                name={project?.name}
                                image={project?.imageUrl}
                              />
                              {project?.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DottedSepatator className="py-7" />
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="lg"
                variant={"secondary"}
                onClick={onCancel}
                disabled={isPending}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={isPending}>
                Create Task
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

// "use client";
// import React from "react";
// import { cn } from "@/lib/utils";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import {Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/components/ui/select'
// import { DottedSepatator } from "@/components/dotted-separator";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { createTaskSchema } from "../schemas";
// import { useCreateTask } from "../api/use-create-task";
// import { toast } from "sonner";
// import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
// import { DatePicker } from "@/components/date-picker";
// import { MemberAvatar } from "@/features/members/components/member-avatar";
// import { taskStatus } from "../types";
// import { ProjectAvatar } from "@/features/projects/components/project-avatar";


// interface CreateTaskFormProps {
//   onCancel?: () => void;
//   projectOptions: {id:string, name:string,imageUrl:string}[]
//   memberOptions: {id:string, name:string}[]
// }

// export const CreateTakForm = ({ onCancel,projectOptions,memberOptions }: CreateTaskFormProps) => {

//   const workspaceId = useWorkspaceId()
//   const { mutate, isPending } = useCreateTask();

//   const form = useForm<z.infer<typeof createTaskSchema>>({
//     resolver: zodResolver(createTaskSchema.omit({workspaceId:true})),
//     defaultValues: {
//       workspaceId,

//     },
//   });

//   const onSubmit = (values: z.infer<typeof createTaskSchema>) => {

  
//     mutate({ json:{...values,workspaceId} },
//         {
//             onSuccess:()=>{
//                 form.reset()
//                 onCancel?.()
//             },
//             onError:()=>{
//                 toast.error("Something went wrong to create a project")
//             }
//         }
//     )
//   }


//   return (
//     <Card className="w-full h-full border-none shadow-none">
//       <CardHeader className="flex p-7">
//         <CardTitle className="text-xl font-bold">
//           Create a new Task
//         </CardTitle>
//       </CardHeader>
//       <div className="px-7">
//         <DottedSepatator />
//       </div>
//       <CardContent className="p-7">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <div className="flex flex-col gap-y-4">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Task Name</FormLabel>
//                     <FormControl>
//                       <Input {...field} placeholder="Enter Task name" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="dueDate"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Due Date</FormLabel>
//                     <FormControl>
//                      <DatePicker {...field}/>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//             <FormField
//                 control={form.control}
//                 name="assigneeId"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Assignee</FormLabel>
//                     <Select
//                      defaultValue={field?.value}
//                      onValueChange={field?.onChange}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Assignee"/>
//                         </SelectTrigger>
//                       </FormControl>
//                       <FormMessage/>
//                       <SelectContent>
//                         {memberOptions.map((member)=>(
//                           <SelectItem key={member.id} value={member.id}>
//                             <div className="flex items-center gap-x-2">
//                             <MemberAvatar
//                             className="size-6"
//                             name={member?.name}
//                             />
//                             {member?.name}
//                             </div>
//                           </SelectItem>
//                         ))}
//                         </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="status"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Status</FormLabel>
//                     <Select
//                      defaultValue={field?.value}
//                      onValueChange={field?.onChange}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Status"/>
//                         </SelectTrigger>
//                       </FormControl>
//                       <FormMessage/>
//                       <SelectContent>
//                         <SelectItem value={taskStatus?.BACKLOG}>
//                         BackLog
//                         </SelectItem>
//                         <SelectItem value={taskStatus?.IN_PROGRESS}>
//                         In Progress
//                         </SelectItem>
//                         <SelectItem value={taskStatus?.IN_REVIEW}>
//                         In Review
//                         </SelectItem>
//                         <SelectItem value={taskStatus?.TODO}>
//                         ToDo
//                         </SelectItem>
//                         <SelectItem value={taskStatus?.DONE}>
//                         Done
//                         </SelectItem>
//                         </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="projectId"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>project</FormLabel>
//                     <Select
//                      defaultValue={field?.value}
//                      onValueChange={field?.onChange}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Project"/>
//                         </SelectTrigger>
//                       </FormControl>
//                       <FormMessage/>
//                       <SelectContent>
//                         {projectOptions.map((project)=>(
//                           <SelectItem key={project.id} value={project.id}>
//                             <div className="flex items-center gap-x-2">
//                             <ProjectAvatar
//                             className="size-6"
//                             name={project?.name}
//                             image={project?.imageUrl}
//                             />
//                             {project?.name}
//                             </div>
//                           </SelectItem>
//                         ))}
//                         </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//             </div>
//             <DottedSepatator className="py-7" />
//             <div className="flex items-center justify-between">
//               <Button
//                 type="button"
//                 size="lg"
//                 variant={"secondary"}
//                 onClick={onCancel}
//                 disabled={isPending}
//                 className={cn(!onCancel && "invisible")}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" size="lg" disabled={isPending}>
//                 Create Task
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// };
