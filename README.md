# TypeScript Project Setup

## Frontend Setup (`client`)

### 1) Command to create a React in Typescript project
```bash
npm create vite@latest client -- --template react-ts
```

### 2) Delete un-necessary files

### 3) Configure your `main.tsx` & `app.tsx`


### 4) Setup Tailwind
1. Install tailwind
    ```bash
    npm install tailwindcss @tailwindcss/vite 
    ```

2. Configure in `vite.config.ts`
    ```ts
    // Import
    import tailwindcss from '@tailwindcss/vite'

    // Inside plugings array
    tailwindcss()
    ```

3. Import in `index.css`
    ```css
    @import "tailwindcss";
    ```


### 5) Define `interface` in `types.ts`
1. Define the interface (`User`) with object having properties that must matches the model.
2. Define the interface (`ApiResponse`) with object having properties that must matches the response we get from `API`. It will contain all the objects we get from all APIs for a specific `model`.


### 6) Imp types for Backend

| Type | Respective | Import |
|------|------------|--------|
| type { ApiResponse } | API HTTP Method | types.ts |
| React.FC | Function Component | "react" |
| <{ id: string }> | useParams() | "react-router-dom" |
| <User[]> | State variable matching interface | types.ts |
| any | error | No import |



## Backend Setup (`server`)

### 1) Initialize `package.json`
```bash
npm init -y
```


### 2) Command to setup TypeScript for backend
```bash
npm install typescript ts-node @types/express @types/node @types/mongoose @types/cors --save-dev
```


### 3) Initialize `tsconfig.json`
```bash
npx tsc --init 
```


### 4) `tsconfig.json` configuration

Inside `"compilerOptions"`, these should be enabled

```json
"rootDir": "./src",
"outDir": "./dist",
"types": [
  "node"
],
"strict": true,
"module": "nodenext",
"target": "esnext",
```

And right after it, add these
```json
"include": [
  "src/**/*"
],
"exclude": [
  "node_modules",
  "dist"
]
```


### 5) Install necessary packages (for JS version)
```bash
npm install express mongoose cors nodemon
```


### 6) Setup Folder Structure
1. Create `src` & `dist` folder in `server` folder.
2. Create `config`, `controllers`, `models` & `routes`. This may be more
3. Your final structure will for backend `server` folder be like this
```text
├── dist/                 # Compiled files
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── ...
│   └── server.js
├── node_modules/
├── src/                   # Source files
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── ...
│   └── server.ts
├── tsconfig.json
├── .tsbuildinfo
├── package.json
├── package-lock.json
```


### 7) Setup `scripts` in `package.json`

```json
"scripts": {
  "build": "tsc",
  "watch": "tsc --watch",
  "dev": "nodemon dist/server.js",
  "start": "node dist/server.js"
},
```
> Nodemon must be installed for continuous running.

Now we need 3 terminals, work as below

```bash
# For Frontend app
npm run dev

# For Backend server
npm run dev

# For TS -> JS conversion
npm run watch
```
> Whenever we change `TS` files, it's respective `JS` version will be created in `dist` folder.


### 8) Imports/Setup in `TS` files
1. `Route`: Import `controllers` from JS version inside `dist` folder.
2. `Model`: Model type will match the interface we define in models, written inside `<>`.
3. `Controller`: Import `model` from JS version inside `dist` folder.


### 9) Imp types for Backend

| Type | Respective | Import |
|------|------------|--------|
| Promise<void> | MongoDB Connection Function | No import |
| { Schema, Document } | model's schema, interface extends Document | "mongoose" |
| { Router } | router | "express" |
| type { Request, Response } | req, res | "express" |
| any | error | No import |