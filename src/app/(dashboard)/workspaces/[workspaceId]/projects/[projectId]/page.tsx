import {redirect} from 'next/navigation'
import {getCurrent} from '@/features/auth/queries'
import { ProjectidClient } from './client';


const ProjectIdPage = async()=>{

    const  user = await getCurrent();

    if(!user){
        redirect('/sign-in')
    }

    return <ProjectidClient  /> 

}
export default ProjectIdPage