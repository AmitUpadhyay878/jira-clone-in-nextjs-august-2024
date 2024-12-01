// eslint-disable-next-line @typescript-eslint/no-unused-vars

'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { RiAddCircleFill } from 'react-icons/ri'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { WorkspaceAvatar } from '@/features/workspaces/components/workspace-avatar';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useCreateWorkspaceModal } from '@/features/workspaces/hooks/use-create-workspace-modal';


// interface Workspacess {
//   $id: string;
//   name: string;
//   imageUrl?: string;
//   $collectionId: string;
//   $databaseId: string;
//   $createdAt: string;
//   $updatedAt: string;
//   $permissions: string[];
// }

export const WorkspaceSwitcher = () => {
  const router = useRouter()
  const  workspaceId= useWorkspaceId()
  const { data: workspaces } = useGetWorkspaces()
  const {open}  =useCreateWorkspaceModal()

  const onselect = (id:string)=>{
      router.push(`/workspaces/${id}`)
  }

  return (
    <div className='flex flex-col gap-y-2 '>
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
      </div>
      <Select onValueChange={onselect} value={workspaceId}>
        <SelectTrigger className='w-full bg-neutral-200 font-medium p-1'>
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {
            workspaces?.documents?.map((workspace:any) => {
              return (
                <SelectItem key={workspace?.$id} value={workspace?.$id}>
                  {/* {workspace?.name} */}
                  <div className='flex justify-start items-center gap-3 font-medium'>
                    <WorkspaceAvatar name={workspace?.name} image={workspace?.imageUrl} />
                    <span className='truncate'>{workspace?.name}</span>
                  </div>
                </SelectItem>
              )
            })
          }
        </SelectContent>
      </Select>
    </div>
  )
}

