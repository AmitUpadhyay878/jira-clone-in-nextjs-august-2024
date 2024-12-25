import {
    parseAsString,
    parseAsStringEnum,
    useQueryStates
} from 'nuqs'

import {taskStatus} from '../types'

export const useTaskFilters = () => {
    return useQueryStates({
        projectId:parseAsString,
        status:parseAsStringEnum(Object.values(taskStatus)),
        assigneeId:parseAsString,
        dueDate:parseAsString,
        search:parseAsString
    })
}