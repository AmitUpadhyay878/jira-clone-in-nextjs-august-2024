import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono()
.get("/",sessionMiddleware,
    zValidator("query",z.object({
        workspaceId:z.string()
    }))
)


export default app;