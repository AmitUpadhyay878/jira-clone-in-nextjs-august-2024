import { getCurrent } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import React from 'react'

const WorkspaceIdPage = async() => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  return (
    <div>
        Workspace ID
    </div>
  )
}

export default WorkspaceIdPage