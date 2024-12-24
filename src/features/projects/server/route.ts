import { Hono } from "hono";
import { z } from "zod";
import { ID, Query } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";
import { DATABASE_ID, IMAGES_BUCKET_ID, MEMBERS_ID, PROJECTS_ID, WORKSPACES_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { getMember } from "@/features/members/utils";
import { createProjectSchema, updateProjectSchema } from "../schemas";
import { MemberRole } from "@/features/members/types";
import { Project } from "../types";


const app = new Hono()
.get("/",sessionMiddleware,zValidator("query",z.object({
    workspaceId:z.string()
})),async(c)=>{
    const user = c.get("user")
    const databases = c.get("databases")

    const {workspaceId} = c.req.valid("query")
    
    const member = await getMember({
        databases,
        workspaceId,
        userId:user?.$id
    })

    if(!member){
        return c.json({error:"UnAuthorized"},401)
    }
 
    if(!workspaceId){
        return c.json({error:"Missing workspace"},401)
    }

    const projects = await databases.listDocuments(
        DATABASE_ID,
        PROJECTS_ID,
        [
            Query.equal("workspaceId",workspaceId),
            Query.orderDesc("$createdAt")
        ]
    )

    return c.json({data:projects})
}
).post("/",sessionMiddleware,zValidator("form",createProjectSchema),
async (c) => {
    const databases = c.get("databases");
    const storage = c.get('storage');
    const user = c.get("user");

    const { name, image, workspaceId } = c.req.valid("form");

    const member = await getMember({
        databases,
        workspaceId,
        userId:user?.$id
    })

    if(!member){
        return c.json({error:"UnAuthorized"},401)
    }

    let uploadedImageUrl:string | undefined; 

    if(image instanceof File){
        const file = await storage.createFile(
            IMAGES_BUCKET_ID,
            ID.unique(),
            image
        )

        const arrayBuffer = await storage.getFilePreview(
            IMAGES_BUCKET_ID,
            file.$id
        )

   uploadedImageUrl= `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;

    }

    const project = await databases.createDocument(
      DATABASE_ID,
      PROJECTS_ID,
      ID.unique(),
      {
        name,
        // userId: user?.$id,
        imageUrl:uploadedImageUrl,
        workspaceId
      },
    );

    return c.json({ data: project });
  },

).patch("/:projectId",sessionMiddleware,zValidator("form",updateProjectSchema),
async(c)=>{
  const databases = c.get("databases")
  const storage = c.get("storage")
  const user = c.get("user")

  const {projectId} = c.req.param()
  const {name ,image} = c.req.valid("form")

  const existingProject = await databases.getDocument<Project>(
    DATABASE_ID,
    PROJECTS_ID,
    projectId
  )

  const member = await getMember({
    databases,
    workspaceId:existingProject?.workspaceId,
    userId:user?.$id
  })

  if(!member){
        return c.json({error:"UnAuthorized"},401)
  }

  let uploadedImageUrl:string | undefined; 

    if(image instanceof File){
        const file = await storage.createFile(
            IMAGES_BUCKET_ID,
            ID.unique(),
            image
        )

        const arrayBuffer = await storage.getFilePreview(
            IMAGES_BUCKET_ID,
            file.$id
        )
   uploadedImageUrl= `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
    }else{
      uploadedImageUrl=image
    }
      const project= await databases.updateDocument(
        DATABASE_ID,
        PROJECTS_ID,
        projectId,
        {
          name,
          imageUrl:uploadedImageUrl
        }
      )

      return c.json({data:project})
}
).delete("/:projectId",sessionMiddleware,async(c)=>{

    const {projectId} = c.req.param()

    const databases = c.get("databases");
    const storage = c.get('storage');
    const user = c.get("user");

    const existingProject = await databases.getDocument<Project>(
        DATABASE_ID,
        PROJECTS_ID,
        projectId
      )

    const member = await getMember({
      databases,
      workspaceId:existingProject?.workspaceId,
      userId:user?.$id,
    })

    if(!member){
      return c.json({ error:"UnAuthorized"},401);
    }
  
    await databases.deleteDocument(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    )
  
    return c.json({data:{$id:existingProject?.$id}})
  })

export default app;