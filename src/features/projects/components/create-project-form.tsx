"use client";
import React,{useRef} from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
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
import { DottedSepatator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createProjectSchema } from "../schemas";
import { useCreateProject } from "../api/use-create-project";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";


interface CreateProjectFormProps {
  onCancel?: () => void;
}

export const CreateProjectForm = ({ onCancel }: CreateProjectFormProps) => {

  const workspaceId = useWorkspaceId()
  const { mutate, isPending } = useCreateProject();
  const router = useRouter()

  const inputRef= useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema.omit({workspaceId:true})),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createProjectSchema>) => {

    const finalValues = {
      ...values,
      workspaceId,
        image: values.image instanceof File ? values.image : ""
    }
    mutate({ form: finalValues },
        {
            onSuccess:({data})=>{
                form.reset()
                // router.push(`/workspaces/${data?.$id}`)
            },
            onError:()=>{
                toast.error("Something went wrong to create a project")
            }
        }
    );
  };

  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file= e.target.files?.[0]    
        if(file){
            form.setValue("image",file)
        }    
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a new project
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSepatator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter project name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
              control={form.control}
              name="image"
              render={({field})=>(
               <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-5">
                    {field?.value ? (
                            <div className="size-[72px] relative rounded-md overflow-hidden">
                                <Image src={field?.value instanceof File
                                    ? URL.createObjectURL(field?.value)
                                    : field?.value
                                } 
                                alt="logo"
                                fill
                                className="object-cover"
                                />
                            </div>
                    ) :(
                        <Avatar className="size-[72px]">
                            <AvatarFallback>
                                <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                        </Avatar>
                    ) }

                    <div className="flex flex-col">
                        <p className="text-sm ">Project Icon</p>
                        <p className="text-sm text-muted-foreground">JPG, PNG, JPEG or SVG, max 1mb</p>
                        <input 
                        className="hidden"
                        type="file" 
                        accept=".jpg, .png, .jpeg, .svg"
                        ref={inputRef}
                        onChange={handleImageChange}
                        disabled={isPending}
                        />
                        {field?.value ? (
                        <Button
                        type="button"
                        disabled={isPending}
                        variant="destructive"
                        size="xs"
                        className="w-fit mt-2"
                        onClick={()=>{
                          field.onChange(null)

                          if(inputRef.current){
                            inputRef.current.value = ""
                          }

                        }}
                        >
                            Remove Image
                        </Button>
                        ):
                        (
                         <Button
                        type="button"
                        disabled={isPending}
                        variant="teritary"
                        size="xs"
                        className="w-fit mt-2"
                        onClick={()=>inputRef.current?.click()}
                        >
                          Upload Image
                        </Button>
                        )
                      }
                        </div>
                    </div>
               </div>
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
                Create Project
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};