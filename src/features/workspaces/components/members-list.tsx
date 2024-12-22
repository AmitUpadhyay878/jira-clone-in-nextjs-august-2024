'use client'
import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, MoreVerticalIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DottedSepatator } from '@/components/dotted-separator'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useGetMembers } from '@/features/members/api/use-get-members'
import { MemberAvatar } from '@/features/members/components/member-avatar'
import { useDeleteMember } from '@/features/members/api/use-delete-members'
import { useUpdateMember } from '@/features/members/api/use-update-members'
import { MemberRole } from '@/features/members/types'
import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
    CardHeader,
} from '@/components/ui/card'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { useConfirm } from '@/hooks/use-confirm'



const ShimmerEffect = ({ className }: { className?: string }) => {
    return (
      <div className={cn("animate-pulse bg-muted rounded-md", className)} />
    );
  };
  

export const MembersList = () => {
    const workspaceId = useWorkspaceId()
    const [ConfirmDialog,confirm] = useConfirm(
        "Remove member",
        "This member will remove from the workspace",
        "destructive"
    )
    const { data, error, isLoading } = useGetMembers({ workspaceId });
    const {
        mutate:deleteMember,
        isPending:isDeleteingMember,
    } = useDeleteMember()

    const {
        mutate:updateMember,
        isPending:isUpdatingMember,
    } = useUpdateMember()

    // if (isLoading) {
    //     return (
        // <div>loading members</div>;
    //     )
    // }

    // if (error) {
    //     return <div>Error loading members</div>;
    // }

    const handleUpdateMember=(memberId:string, role:MemberRole)=>{
        updateMember({
            json:{role},
            param:{memberId}
        })
    }

    const handleDeleteMember=async(memberId:string)=>{
        const ok=await confirm()

        if(!ok) return;

        deleteMember({param:{memberId}},
           {
            onSuccess:()=>{
                window.location.reload()
            }
           }
    )
    }

    return (
        <Card className="w-full h-full shadow-none border-none">
            <ConfirmDialog />
            <CardHeader className='flex flex-row items-center gap-x-4 p-7 space-y-0'>
                <Button
                    variant="secondary"
                    size="sm"
                    asChild
                >
                    <Link href={`/workspaces/${workspaceId}`}>
                        <ArrowLeftIcon className='size-4 mr-2' />
                        Back
                    </Link>
                </Button>
                <CardTitle className='text-xl font-bold'>Members List</CardTitle>
            </CardHeader>
            <div className='px-7'>
                <DottedSepatator />
            </div>
            <CardContent className='p-7'>
                {
                    isLoading ? 
                    (
                        Array.from({ length: 5 }).map((_, index) => (
                            <React.Fragment key={index}>
                              <div className='flex items-center gap-2'>
                                <ShimmerEffect className="size-10 rounded-full" />
                                <div className='flex flex-col gap-1'>
                                  <ShimmerEffect className="h-4 w-24" />
                                  <ShimmerEffect className="h-3 w-32" />
                                </div>
                                <ShimmerEffect className="ml-auto h-8 w-8 rounded-full" />
                              </div>
                            </React.Fragment>
                          ))
                    )
                    :
                    error ? (
                        <div>Error loading members</div> 
                    )
                    :
                    data?.documents?.length > 0 ? 
                    data?.documents?.map((member: any, i:number ) => { 
                        return (
                            <React.Fragment key={member?.$id}>
                                <div className='flex items-center gap-2'>
                                    <MemberAvatar
                                        className='size-10'
                                        fallbackClassName='text-lg'
                                        name={member?.name}
                                    />
                                    <div className='flex flex-col'>
                                        <p className='text-sm font-medium'>{member?.name}</p>
                                        <p className='text-xs text-muted-foreground'>{member?.email}</p>
                                    </div>
                                    <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button
                                    className='ml-auto '
                                    variant="secondary"
                                    size="icon"
                                    >
                                        <MoreVerticalIcon className='size-4 text-muted-foreground' />
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side='bottom' align='end'>
                                    <DropdownMenuItem 
                                    className='font-medium'
                                    onClick={()=>handleUpdateMember(member.$id,MemberRole.ADMIN)}
                                    disabled={isUpdatingMember}
                                    >
                                        Set as Administrator
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                    className='font-medium'
                                    onClick={()=>handleUpdateMember(member.$id,MemberRole.MEMBER)}
                                    disabled={isUpdatingMember}
                                    >
                                        Set as Member
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                    className='font-medium text-amber-700'
                                    onClick={()=>handleDeleteMember(member.$id)}
                                    disabled={isDeleteingMember}
                                    >
                                        Remove {member?.name}
                                    </DropdownMenuItem>
                                    </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                {
                                    i <data?.documents.length -1 &&(
                                        <Separator className='my-2.5' />
                                    )
                                }
                            </React.Fragment>
                        )
                    })
                        :
                        (
                            <span className='flex text-center justify-center'>No any member available</span>
                        )
                }
            </CardContent>
        </Card>
    )
}