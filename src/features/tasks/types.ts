import { Models } from "node-appwrite";

export enum taskStatus{
    BACKLOG = 'BACKLOG',
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    IN_REVIEW = 'IN_REVIEW',
    DONE = 'DONE',    
}

export type Task = Models.Document & {
    title:string,
    description:string,
    status:taskStatus,
    dueDate:string,
    assigneeId:string,
    projectId:string,
    createdAt?:number,
    updatedAt?:number    
} 