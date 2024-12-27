import {Hono} from 'hono';
import { z } from 'zod';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { createTaskSchema } from '../schemas';
import { getMember } from '@/features/members/utils';
import { DATABASE_ID, MEMBERS_ID, PROJECTS_ID, TASKS_ID } from '@/config';
import { ID, Query } from 'node-appwrite';
import { Task, taskStatus } from '../types';
import { createAdminClient } from '@/lib/appwrite';
import { Project } from '@/features/projects/types';

const app = new Hono()
.get("/",
    sessionMiddleware,
    zValidator("query", z.object({
        workspaceId: z.string(),
        projectId: z.string().nullish(),
        assigneeId: z.string().nullish(),
        status: z.nativeEnum(taskStatus).nullish(),
        search: z.string().nullish(),
        dueDate: z.string().nullish(),
    })),
    async (c) => {
        try {
            const { users } = await createAdminClient();
            const databases = c.get("databases");
            const user = c.get("user");

            const {
                workspaceId,
                projectId,
                assigneeId,
                status,
                search,
                dueDate
            } = c.req.valid("query");

            const member = await getMember({ databases, workspaceId, userId: user.$id });

            if (!member) {
                return c.json({ error: "UnAuthorized" }, 401);
            }

            const query = [
                Query.equal("workspaceId", workspaceId),
                Query.orderDesc("$createdAt"),
            ];

            if (projectId) {
                console.log("projectId", projectId);
                query.push(Query.equal("projectId", projectId));
            }

            if (status) {
                console.log("status", status);
                query.push(Query.equal("status", status));
            }

            if (assigneeId) {
                console.log("assigneeId", assigneeId);
                query.push(Query.equal("assigneeId", assigneeId));
            }

            if (dueDate) {
                console.log("dueDate", dueDate);
                query.push(Query.equal("dueDate", dueDate));
            }

            if (search) {
                console.log("search", search);
                query.push(Query.search("name", search));
            }

            const tasks = await databases.listDocuments<Task>(
                DATABASE_ID,
                TASKS_ID,
                query
            );

            const projectIds = tasks.documents.map((task: any) => task.projectId);
            const assigneeIds = tasks.documents.map((task: any) => task.assigneeId);

            const projects = await databases.listDocuments<Project>(
                DATABASE_ID,
                PROJECTS_ID,
                projectIds.length > 0 ? [Query.contains("$id", projectIds)] : []
            );

            const members = await databases.listDocuments(
                DATABASE_ID,
                MEMBERS_ID,
                assigneeIds.length > 0 ? [Query.contains("$id", assigneeIds)] : []
            );

            const assignees = await Promise.all(members.documents.map(async (member: any) => {
                const user = await users.get(member.userId);

                return {
                    ...member,
                    name: user?.name,
                    email: user?.email,
                };
            }));

            const populatedTasks = tasks.documents.map((task: any) => {
                const project = projects.documents.find((project: any) => project.$id === task.projectId);
                const assignee = assignees.find((member: any) => member.$id === task.assigneeId);
                return {
                    ...task,
                    project,
                    assignee
                };
            });

            return c.json({
                data: {
                    ...tasks,
                    documents: populatedTasks
                }
            });
        } catch (error) {
            console.error('Error:', error); // Log the error for debugging
            return c.json({ error: "Internal Server Error" }, 500);
        }
    }
)
.post('/',
    sessionMiddleware,
    zValidator("json",createTaskSchema),
    async (c) => {
        const user  = c.get("user")
        const databases  = c.get("databases")

        const{name,status, workspaceId, projectId, dueDate, assigneeId, description} = c.req.valid("json")

        const member = await getMember({databases, workspaceId, userId:user.$id})

        if(!member){
            return c.json({error:"UnAuthorized"}, 401)
        }

        const highestPostionTask = await databases.listDocuments(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("status", status),
                Query.equal("workspaceId", workspaceId),
                Query.orderAsc("position"),
                Query.limit(1)
            ]
        )

        const newPostion = highestPostionTask.documents.length > 0 ? highestPostionTask.documents[0].position + 1000 : 1000;

        const task = await databases.createDocument(
            DATABASE_ID,
            TASKS_ID,
            ID.unique(),
            {
                name,
                status,
                workspaceId,
                projectId,
                assigneeId,
                dueDate,
                position:newPostion
            }
        )

        return c.json({data: task})
})
.delete("/:taskId",
    sessionMiddleware,
    async(c)=>{
        const user = c.get('user')
        const databases = c.get("databases")

        const {taskId} = c.req.param()

        
        const task = await databases.getDocument<Task>(
            DATABASE_ID,
            TASKS_ID,
            taskId,
        )
        const member = await getMember({
            databases,
            workspaceId:task.workspaceId,
            userId:user?.$id
        })
        
        if(!member){
            return c.json({error:"UnAuthorize"},401)
        }

        await databases.deleteDocument(
            DATABASE_ID,
            TASKS_ID,
            taskId
        )

        return c.json({data:{$id:task?.$id}})
    }
)

export default app;
