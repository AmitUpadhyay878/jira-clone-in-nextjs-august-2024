
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Hono } from "hono";
// import { handle } from "hono/vercel";

// import auth from "@/features/auth/server/route";
// import workspaces from "@/features/workspaces/server/route";
// import members from "@/features/members/server/route";
// import projects from "@/features/projects/server/route";
// import tasks from "@/features/tasks/server/route";

// const app = new Hono().basePath("/api");

// app.route("/auth", auth)
//    .route("/workspaces", workspaces)
//    .route("/members", members)
//    .route("/projects",projects)
//    .route("/tasks",tasks)

// export const GET = handle(app);
// export const POST = handle(app);
// export const PATCH = handle(app);
// export const DELETE = handle(app);

// export { app};

// export type AppType = typeof app;


import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route";
import members from '@/features/members/server/route';
import projects from "@/features/projects/server/route";
import tasks from "@/features/tasks/server/route";

export const runtime="nodejs"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = new Hono().basePath("/api")

app.route("/auth", auth)
   .route("/workspaces", workspaces)
   .route("/members", members)
   .route("/projects", projects)
   .route("/tasks", tasks);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

// Export only the necessary handlers
export { app as default };

// Define the type for the app
export type AppType = typeof app;