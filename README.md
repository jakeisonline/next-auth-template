# next-auth-template<br />![Built on next.js](https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/next?style=flat-square) ![Built on next-auth](https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/next-auth?style=flat-square) ![Built on drizzle-orm](https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/drizzle-orm?style=flat-square) ![Built on zod](https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/zod?style=flat-square)

This template gets you up a running with social sign in, magic links, database-backed sessions, and account creation and setup. It's a good starting point for your next project.

## Features

- Custom sign in and sign up pages as a starting point for your own
- Database-backed sessions all managed for you thanks to [Auth.js](https://authjs.dev/) and [Drizzle ORM](https://orm.drizzle.team/)
- Basic account creation and set up for first time users
- Google Sign-in ready for config, easily add [other providers Auth.js has to offer](https://authjs.dev/reference/core/providers)
- [Magic Links](https://authjs.dev/getting-started/authentication/email) via [Resend](https://resend.com/emails) ready for config, or [any other email provider Auth.js can support](https://authjs.dev/getting-started/authentication/email#providers), or don't use magic links at all
- Protected paths via middleware, easily customisable to your needs

> [!NOTE]
> This template uses major dependencies that are not yet stable. It is not recommended for production use until `next-auth` and `drizzle-orm` are stable

# Getting Started

There is some initial setup required to get this template up and running. It won't take long.

## Prerequisites

- [Node.js](https://nodejs.org/en/) installed
- A PostgreSQL database. This template uses [Neon](https://neon.tech/), but there are other options.

## Installation

1. Clone this repo, or [use it as a GitHub template](https://github.com/jakeisonline/next-auth-template/generate) (using Vercel? [Deploy template](<https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjakeisonline%2Fnext-auth-template&env=DATABASE_URL,NEXTAUTH_URL,AUTH_SECRET,AUTH_GOOGLE_ID,AUTH_GOOGLE_SECRET,AUTH_RESEND_KEY,AUTH_MAGIC_LINK_EMAIL_FROM&envDescription=API%20keys%20needed%20for%20signing%20in%20with%20Google%20and%20emailing%20magic%20links&envLink=https%3A%2F%2Fgithub.com%2Fjakeisonline%2Fnext-auth-template%3Ftab%3Dreadme-ov-file%23envrionment-variables&redirect-url=https%3A%2F%2Fgithub.com%2Fjakeisonline%2Fnext-auth-template%3Ftab%3Dreadme-ov-file%23next-auth-template&demo-title=See%20next-auth-template%20in%20action&demo-description=An%20(almost)%20vanilla%20deploy%20of%20this%20template.%20Resets%20any%20users%20and%20sessions%20every%20few%20hours.&demo-url=https%3A%2F%2Fnext-auth-template-demo.vercel.app%2F&demo-image=https%3A%2F%2Fcamo.githubusercontent.com%2Fc69f49b98c29ba792daf811661b5448ec743f721047119358ac2603ca0531b73%2F68747470733a2f2f6a616b6569736f6e6c696e652e636f6d2f6f70656e67726170682d696d6167652e706e67>))
2. Copy `.env.example` to `.env` and fill in the values (see [Environment Variables](#environment-variables) below)
3. Run `pnpm install && pnpm run db:push` to install dependencies and push the database schema
4. Run `pnpm run dev` to start the development server
5. Navigate to `http://localhost:3000`, and click the "Sign up" or "Sign in" buttons

# Environment Variables

This template relies on environment variables to work. You can use the `.env.example` file as a starting guide; rename `.env.example` to `.env` and fill in the values.

| Variable Name                | Description                                                                                                                                                                                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`               | The database connection string. Required.                                                                                                                                                                                                             |
| `AUTH_URL`                   | The URL of your site. This is used to generate links for magic links and for the callback URL for social sign in. Can be localhost when running locally. Required. [NextAuth.js#nextauth_url](https://authjs.dev/getting-started/deployment#auth_url) |
| `AUTH_SECRET`                | A secret used to sign cookies and to sign and verify JSON Web Tokens. [See Auth.js docs on how to generate](https://authjs.dev/getting-started/deployment#auth_secret). Required in production.                                                       |
| `AUTH_GOOGLE_ID`             | The Client ID for your Google OAuth app. Required for social sign in. [See Auth.js docs for set up.](https://authjs.dev/getting-started/providers/google#setup)                                                                                       |
| `AUTH_GOOGLE_SECRET`         | The Client Secret for your Google OAuth app. Required for social sign in. [See Auth.js docs for set up.](https://authjs.dev/getting-started/providers/google#setup)                                                                                   |
| `AUTH_RESEND_KEY`            | The API key for [Resend](https://resend.com/). Required for magic links.                                                                                                                                                                              |
| `AUTH_MAGIC_LINK_EMAIL_FROM` | The email address to send magic links from. Required for magic links.                                                                                                                                                                                 |
