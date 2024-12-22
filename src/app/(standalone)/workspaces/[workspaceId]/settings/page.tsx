import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrent } from '@/features/auth/queries';
import { getWorkspace } from '@/features/workspaces/queries';
import { EditWorkspaceForm } from '@/features/workspaces/components/edit-workspace-form';

// interface WorkspaceIdSettingsPageProps {
//   params: {
//     workspaceId: string;
//   };
// }
interface WorkspaceIdSettingsPageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

const WorkspaceIdSettingsPage = async ({ params }: WorkspaceIdSettingsPageProps) => {
  const resolvedParams = await params; 
  // const { workspaceId } = params;
  const initialValues = await getWorkspace({ workspaceId: resolvedParams?.workspaceId});
  const user = await getCurrent();

  if (!user) {
    redirect('/sign-in');
  }

  if (!initialValues) {
    redirect(`/workspaces/${resolvedParams?.workspaceId}`);
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
