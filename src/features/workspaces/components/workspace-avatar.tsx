import {cn} from '@/lib/utils'
import Image from 'next/image'
import {Avatar,AvatarFallback} from '@/components/ui/avatar'

interface WorkspaceAvatarProps{
    image?:string;
    name:string;
    className?:string;
}

export const WorkspaceAvatar=(
    {
        image,
        name,
        className
    }:WorkspaceAvatarProps
)=>{
    if(image){
        return (
            <div className={cn(
                "size-10 relative rounded-md overflow-hidden",
                className
            )}> 
                <Image src={image} alt={name} fill className='object-contain rounded-md ' />
            </div>
        )
    }

    return(
        <Avatar className={cn(
            "size-8 rounded-md",className
        )}>
            <AvatarFallback className='text-white bg-blue-600 font-semibold text-lg uppercase rounded-md'>
                {name[0]}
            </AvatarFallback>
        </Avatar>
    )
}