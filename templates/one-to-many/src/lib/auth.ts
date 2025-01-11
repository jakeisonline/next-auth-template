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
import { eq } from "drizzle-orm"
import { usersAccountsTable } from "@/db/schema/users_accounts"
import { fetchInvite } from "@/actions/invite/fetch-invite"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
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
      from: process.env.AUTH_MAGIC_LINK_EMAIL_FROM,
    }),
  ],
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: usersTable,
    accountsTable: usersAuthsTable,
    sessionsTable: sessionsTable,
    verificationTokensTable: verificationTokensTable,
  }),
  secret: process.env.AUTH_SECRET,
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
          "/invite",
        ]

        if (nonSessionAllowedPaths.some((m) => requestedPath.includes(m))) {
          return true
        }

        return false
      }

      const userAccountId = userSession.user.accountId

      // No account ID means they have not finished onboarding
      if (
        !userAccountId &&
        !requestedPath.includes("/welcome") &&
        !requestedPath.includes("/invite")
      ) {
        // Check if the user has an invite pending via their email address
        const invite = await fetchInvite(undefined, userSession.user.email)

        if (Object.keys(invite).length > 0) {
          return Response.redirect(
            new URL(`/invite/${invite.token}`, request.nextUrl),
          )
        }

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
    session: async ({ session, user }) => {
      if (!session.user.accountId) {
        // Direct, clear database query
        const userAccounts = await db
          .select({ accountId: usersAccountsTable.accountId })
          .from(usersAccountsTable)
          .where(eq(usersAccountsTable.userId, user.id))

        if (userAccounts.length > 0) {
          session.user.accountId = userAccounts[0].accountId ?? ""
        }
      }

      return session
    },
  },
  ...authConfig,
})
