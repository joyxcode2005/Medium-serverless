# 📝 Cloudflare Serverless Blog Platform

A modern, fast, and secure **blogging website** built entirely on **Cloudflare’s serverless architecture**. This project leverages **Cloudflare Workers**, **KV Storage**, **R2**, and **Pages** to deliver scalable, low-latency web experiences across the globe.

---

## 🚀 Features

- ⚡ Powered by Cloudflare Workers (serverless compute)
- More featuers to be added soon!!!!

---

## 🛠️ Tech Stack

| Layer           | Technology                 |
| --------------- | -------------------------- |
| Frontend        | Reactjs + Tailwind         |
| Backend         | Cloudflare Workers + Hono  |
| Database        |  Postgressql + Prisma(ORM) |
| Hosting         |                            |
| Deployment      |                            |
| Auth (optional) | Hono JWT                   |

---

## 📁 Project Structure

![project structure](https://res.cloudinary.com/dehumvs8j/image/upload/v1748122073/Screenshot_2025-05-25_025417_vtskcx.png)



### 📌 Description

| Path                         | Purpose                                                                 |
|-----------------------------|-------------------------------------------------------------------------|
| `backend/src/routes/post.ts`| Handles blog post creation, editing, and retrieval logic                |
| `backend/src/routes/user.ts`| Manages user-related routes like registration and authentication        |
| `backend/src/index.ts`      | Initializes and configures the Cloudflare Worker server and routes      |
| `backend/prisma/schema.prisma` | Defines the Prisma models used to generate the database schema       |
| `Notes/`                    | Contains architectural decisions, design docs, and other notes          |

---

Let me know if you want the structure to reflect Cloudflare-specific files like `wrangler.toml` or if you want to include deployment instructions in the same document.


---

## 🧰 Prerequisites

- [Cloudflare account](https://dash.cloudflare.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- Git + Node.js installed

---

