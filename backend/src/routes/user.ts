import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@joyxcoder/medium-common";

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
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct!!",
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.username,
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
  const { success, error } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    console.log(error);
    return c.json({
      message: "Inputs are not correct!!",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.username,
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
    console.log(error);
    return c.json({
      error: "Internal Server Error!!!",
    });
  }
});
