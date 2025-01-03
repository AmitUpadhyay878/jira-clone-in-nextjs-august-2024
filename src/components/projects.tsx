'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RiAddCircleFill } from 'react-icons/ri'
import { useGetProjects } from '@/features/projects/api/use-get-projects'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { cn } from '@/lib/utils'
import { useCreateProjectModal } from '@/features/projects/hooks/use-create-project-modal'
import { ProjectAvatar } from '@/features/projects/components/project-avatar'
import { Loader } from 'lucide-react'

export const Projects = () => {
  const pathname = usePathname()
  const { open } = useCreateProjectModal()
  const workspaceId = useWorkspaceId()
  const { data, isLoading} = useGetProjects({ workspaceId })

  return (
    <div className='flex flex-col gap-y-2'>
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
      </div>
      {
        isLoading ? (
          <div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 p-1 rounded-md animate-pulse mb-2"
            >
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <div className="h-4 w-48 bg-gray-300 rounded-md truncate" />
            </div>
          ))}
        </div>
        ):
        data?.documents?.length > 0 ?
          data?.documents?.map((project: any) => {
            const href = `/workspaces/${workspaceId}/projects/${project?.$id}`
            const isActive = pathname === href
            return (
              <Link href={href} key={project?.$id} title={project?.name}>
                <div
                  className={cn("flex items-center gap-2.5 p-1 rounded-md hover:opacity-75 translate cursor-pointer text-neutral-500", isActive && "bg-white shadow-sm hover:opacity-100 text-primary")}
                >
                  <ProjectAvatar image={project?.imageUrl} name={project?.name} />
                  <span className='truncate'>{project?.name}</span>
                </div>
              </Link>
            )
          }) :
          (
            <span className='flex text-center justify-center'>No any projects available</span>
          )
      }
    </div>
  )
}

