import {useQueryState, parseAsBoolean} from 'nuqs'
import { taskStatus } from '../types'

export const useCreateTaskModal=()=>{
    const [isOpen , setIsOpen] = useQueryState(
        "create-Task",
        parseAsBoolean
        .withDefault(false)
        .withOptions({
        clearOnDefault:true
    }))

    const open = ()=>setIsOpen(true)
    const close = ()=>setIsOpen(false)

    return{
        isOpen,
        open,
        close,
        setIsOpen
    }

    
}

