import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrent } from '@/features/auth/queries';
import { WorkspaceSettingsclient } from './client';

const WorkspaceIdSettingsPage = async () => {
  const user = await getCurrent();

  if (!user) {
    redirect('/sign-in');
  }


  return <WorkspaceSettingsclient />
};

export default WorkspaceIdSettingsPage;
