This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Local Development
### Database
#### Tooling Setup
- Ensure you have [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/) installed
- Run the following commands to run PostgreSQL + pgAdmin
```bash
npm run pg-start
```
- Run the following command to stop the containers
```bash
npm run pg-stop
```
- Use the credentials found in **docker/postgres_pgadmin/docker-compose.yml** to login to pgAdmin and then connect to the local database

#### Apply Database Migrations
To apply database migrations to your local DB, run the following:
```bash
npm run apply-migrations
```

NOTE: Ensure you have the following in a **.env** located in the root dir of the project before running the command above
```Properties
  DATABASE_URL="[DB_CONNECTION_STRING_HERE]"
```

## Project Structure
**app/** - where Next.js pages and api routes exist\
**components/** - reusable react components\
**models/** - database models\
**public/assets/** - images, videos, etc. for web\
**styles/** - css files\
**utils/** - utility functions for client & server side code

## Resources
### Setup
[ESLint + Prettier + Typescript setup](https://khalilstemmler.com/blogs/tooling/prettier/)

### Docs
[Chart.js](https://www.chartjs.org/docs/latest/getting-started/)\
[Docker](https://docs.docker.com/manuals/)\
[NextAuth.js](https://next-auth.js.org/getting-started/introduction)\
[PostgreSQL](https://www.postgresql.org/docs/current/index.html)\
[Prisma](https://www.prisma.io/nextjs)\
[shadcn/ui](https://ui.shadcn.com/docs)\
[tailwindcss](https://tailwindcss.com/docs/editor-setup)\
[Typescript](https://www.typescriptlang.org/docs/)

### Suggested VS Code Extensions
[ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)\
[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)\
[Nextjs snippets](https://marketplace.visualstudio.com/items?itemName=PulkitGangwar.nextjs-snippets)\
[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)\
[Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)\
[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)