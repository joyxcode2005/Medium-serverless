import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { postRouter } from "./routes/post";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/api/*", cors());

// Better routing
app.route("/api/v1/user", userRouter);
app.route("/api/v1/post", postRouter);

export default app;
