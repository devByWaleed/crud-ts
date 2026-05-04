# Prisma Setup In MERN App

This is a complete guide for setting up prisma in your MERN TypeScript app. Though prisma has higher version now, but this guide uses version `5.22.0`. It covers installation, changing connection URI, and some changes related to behavior of MongoDB.



### 1. Installation and Initialization

First, install the Prisma CLI as a development dependency and the Prisma Client for your application logic.

```bash
# Install Prisma CLI
npm install prisma@5.22.0 --save-dev

# Install Prisma Client
npm install @prisma/client@5.22.0

# Initialize Prisma for MongoDB
npx prisma init --datasource-provider mongodb
```

This creates a `prisma` folder with a `schema.prisma` file and an `.env` file.



### 2. Configure the Connection

```env
DATABASE_URL="mongodb+srv://<user>:<pass>@<cluster0>.fhfl8z4.mongodb.net/<database>?retryWrites=true&w=majority&tlsInsecure=true"
```

Make sure to update:
```
<user>  -> Atlas Username
<pass>  -> Atlas Database Password
<cluster0> -> Atlas Cluster Name
<database> -> Atlas Database Name
```



### 3. Give Network Access From Database Settings

`Security (Left sidebar)` -> `Database and Network Access` -> `NETWORK ACCESS (dropdown)` -> `IP Access List`

Set `Access List Entry` to `0.0.0.0/0`

> Only for development. For production, we need to take security measures.



### 4. Define the Prisma Schema
In Prisma, you don't define schemas in TypeScript files (like your current `Users.ts`). Instead, you define them in `prisma/schema.prisma`[cite: 1].

**Replace the contents of `schema.prisma` with this:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

// Simple User Model
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  name  String
  email String @unique
  age   Int
}
```

> **Note:** The `@map("_id")` is required because MongoDB uses `_id` internally, but Prisma prefers the name `id`.



### 5. Connect MongoDB Cluster to Prisma

```bash
npx prisma db push
```



### 6. Generate the Prisma Client

```bash
npx prisma generate
```



### 7. Create the Prisma Singleton

Instead of connecting in `index.ts` via Mongoose, create a single Prisma instance to reuse across your controllers.

**Create `src/lib/prisma.ts`:**
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default prisma
```
The Js version of this instance (`dist` folder) will be import where it needed.



### `_id` vs `id`

If you define `_id` in `types.ts`, remove the `_` from it and all other parts of your project (either `Frontend` or `Backend`).