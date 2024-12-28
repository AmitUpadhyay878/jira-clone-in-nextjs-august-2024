import React from 'react'
import { differenceInDays, format } from 'date-fns'
import { cn } from '@/lib/utils'

interface TaskDateProps {
    value: string;
    className?: string;

}

const TaskDate = ({ value, className }: TaskDateProps) => {

    const today = new Date()
    const endDate = new Date(value)
    const diffDate = differenceInDays(endDate, today)

    let txtcolor = 'text-muted-forground';

    if (diffDate <= 3) {
        txtcolor = "text-red-500"
    } else if (diffDate <= 7) {
        txtcolor = "text-orange-500"
    } else if (diffDate <= 14) {
        txtcolor = "text-yellow-500"
    }

    return (
        <div className={txtcolor}>
            <span className={cn('trancate',className)}>
                {format(value,'MMM-do-yyyy')}
            </span>
        </div>
    )
}

export default TaskDate