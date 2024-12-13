'use client'
import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardTitle,
    CardHeader,
    CardDescription
} from '@/components/ui/card'
import { DottedSepatator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { useJoinWorkspace } from '../api/use-join-workspace';
import { useInviteCode } from '../hooks/use-invite-code';
import { useWorkspaceId } from '../hooks/use-workspace-id';

interface JoinworkspaceformProps {
    initialValues: {
        name: string;
    }
}

const JoinWorkspaceForm = ({
    initialValues
}: JoinworkspaceformProps) => {
    
    const router = useRouter()
    const inviteCode = useInviteCode()
    const workspaceId = useWorkspaceId()

    const {mutate:joinWorkspaceMutation,isPending:IsJoinWorkspaceMutationPending} =useJoinWorkspace()

    const onSubmit = ()=>{
        joinWorkspaceMutation({
            param:{workspaceId},
            json:{code:inviteCode}
        },
        {
            onSuccess:({data})=>{
                router.push(`/workspaces/${data?.$id}`)
            }
        }
        )
    }

    return (
        <Card className='w-full h-full border-none shadow-none'>
            <CardHeader className='p-7'>
                <CardTitle className='text-xl font-bold'>
                    Join Workspace
                </CardTitle>
                <CardDescription className=''>
                    You&apos;ve been invited to join <strong>{initialValues?.name}</strong> workspace
                </CardDescription>
            </CardHeader>

            <div className='px-7'>
                <DottedSepatator />
            </div>
            <CardContent className='p-7'>
                <div className='flex flex-col lg:flex-row gap-2 items-center justify-between'>
                    <Button
                    className='w-full lg:w-fit'
                    type='button'
                    variant="secondary"
                    asChild
                    size="lg"
                    disabled={IsJoinWorkspaceMutationPending}
                    >
                        <Link href="/">
                        Cancel
                        </Link>
                    </Button>

                    <Button
                    className='w-full lg:w-fit'
                    size="lg"
                     type='button'
                     onClick={onSubmit}
                     disabled={IsJoinWorkspaceMutationPending}
                    >
                        Join Workspace
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default JoinWorkspaceForm
