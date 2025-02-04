<div align="center">

<div>
<img src="https://i.ibb.co/4gPPn1h3/Macbook-Air-localhost.png" alt="product">
</div>

  <div>
    <img src="https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white" alt="next.js" />
    <img src="https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white" alt="postgres" />
    <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white" alt="prisma" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff" alt="shadcnui" />
  </div>

  <h3 align="center">Writer Blog App</h3>
</div>

[View Demo](https://writer-blog-app.vercel.app/)

## <a name="tech-stack">⚙️ Tech Stack</a>

- [Next.js](https://nextjs.org/)
- [NeonDB (PostgreSQL)](https://neon.tech/home)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Zod](https://zod.dev/)
- [Edge Store](https://edgestore.dev/)

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [pnpm](https://pnpm.io/)

---

**Cloning the Repository**

```bash
git clone https://github.com/arshalabbas/writer-blog-app
cd writer-blog-app
```

---

**Installation**

Install the project dependencies using npm:

```bash
pnpm install
```

---

**Configuration**

Rename `example.env` file to `.env`
and provide your values.

```js
DIRECT_URL = "*****************"; // prisma accelerated database url
DATABASE_URL = "*****************";
AUTH_SECRET = "****************";

// Edge Store doc: https://edgestore.dev/docs/quick-start
EDGE_STORE_ACCESS_KEY = "******************";
EDGE_STORE_SECRET_KEY = "******************";
```

##### Prisma Migration

```bash
npx prisma migrate dev
```

**Running the Project**

```bash
pnpm dev
```

---

Open [http://localhost:3000](http://localhost:3000) for the application.
