import NextAuth, { NextAuthConfig, Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db"
import { usersTable } from "@/db/schema/users"
import { usersAuthsTable } from "@/db/schema/users_auths"
import { sessionsTable } from "@/db/schema/sessions"
import { verificationTokensTable } from "@/db/schema/verification_tokens"
import Resend from "next-auth/providers/resend"
import { NextRequest } from "next/server"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      image: string
      accountId: string
    }
  }
}

// Exported for reuse in other files, and testing
export const authConfig = {
  pages: {
    signIn: "/signin",
    verifyRequest: "/verify",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Resend({
      apiKey: process.env.RESEND_KEY,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    authorized: async ({
      auth: userSession,
      request,
    }: {
      auth: Session | null
      request: NextRequest
    }) => {
      const requestedPath = request.nextUrl.pathname

      // Anyone can visit the root path
      if (requestedPath === "/") return true

      // If the user is not authenticated, allow them to visit the signin, signup, verify, and signout pages
      if (!userSession || !userSession.user) {
        const nonSessionAllowedPaths = [
          "/signin",
          "/signup",
          "/verify",
          "/signout",
        ]

        if (nonSessionAllowedPaths.some((m) => requestedPath.includes(m))) {
          return true
        }

        return false
      }

      const userAccountId = userSession.user.accountId

      // No account ID means they have not finished onboarding
      if (!userAccountId && !requestedPath.includes("/welcome")) {
        return Response.redirect(new URL("/welcome", request.nextUrl))
      }

      if (userSession.user) {
        // Allow users to visit the welcome page if they don't have an account ID, so we can onboard them
        if (!userAccountId && requestedPath.includes("/welcome")) {
          return true
        }

        if (userAccountId) {
          // If the user is on the signin page, and has a callbackUrl, redirect to it
          if (requestedPath.includes("/signin")) {
            const callbackUrl = request.nextUrl.searchParams.get("callbackUrl")

            if (callbackUrl && callbackUrl.startsWith(request.nextUrl.origin)) {
              return Response.redirect(new URL(callbackUrl, request.nextUrl))
            }
          }

          // If the user is on a session-blocked path, redirect to the app
          const sessionBlockedPaths = [
            "/signin",
            "/signup",
            "/verify",
            "/welcome",
          ]

          if (sessionBlockedPaths.some((m) => requestedPath.includes(m))) {
            return Response.redirect(new URL("/app", request.nextUrl))
          }
        }
      }

      return true
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: usersTable,
    accountsTable: usersAuthsTable,
    sessionsTable: sessionsTable,
    verificationTokensTable: verificationTokensTable,
  }),
  secret: process.env.AUTH_SECRET,
  ...authConfig,
})
