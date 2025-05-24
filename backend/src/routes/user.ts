import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { decode, sign, verify } from "hono/jwt";

export const userRouter = new Hono<{
  // Generic to define the type of env variables in hono.
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // To get data from body in hono
  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Internal Server Error!!!",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        message: "User not found!!",
      });
    }

    const token = await sign({ id: user?.id }, c.env.JWT_SECRET);

    return c.json({
      message: "Signin Successfull!!!",
      jwt: token,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Internal Server Error!!!",
    });
  }
});
