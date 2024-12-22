import {redirect} from 'next/navigation'
import {getCurrent} from '@/features/auth/queries'


interface ProjectIdPageProps{
    params:{
        projectId:string;
    }
}

const ProjectIdPage = async({
    params
}:ProjectIdPageProps)=>{

    const resolvedParams = await params; 

    const  user = await getCurrent();

    if(!user){
        redirect('/sign-in')
    }

    return (
     <span>   Project ID page with {resolvedParams?.projectId}</span>
    )

}
export default ProjectIdPage