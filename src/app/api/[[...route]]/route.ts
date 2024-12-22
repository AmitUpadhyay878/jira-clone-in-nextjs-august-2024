// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Hono } from "hono";
// import { handle } from "hono/vercel";

// import auth from "@/features/auth/server/route";
// import workspaces from "@/features/workspaces/server/route";
// import members from '@/features/members/server/route';

// const app = new Hono().basePath("/api");

// const routes = app
// .route("/auth", auth)
// .route("/workspaces", workspaces)
// .route("/members",members)

// export const GET = handle(app);
// export const POST = handle(app);
// export const PATCH = handle(app);
// export const DELETE = handle(app);

// export { routes };

// export type AppType = typeof routes;


// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route";
import members from "@/features/members/server/route";
import projects from "@/features/projects/server/route";

// Initialize the Hono app with a base path
const app = new Hono().basePath("/api");

// Add routes to the app
app.route("/auth", auth)
   .route("/workspaces", workspaces)
   .route("/members", members)
   .route("/projects",projects)

// Export handlers for supported HTTP methods
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export { app};
// Do not export `routes` or `app` directly if it's causing type issues
export type AppType = typeof app;