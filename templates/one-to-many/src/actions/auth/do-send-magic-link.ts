"use server"

import { Resend } from "resend"

export const doSendMagicLink = async (email: string, url: string) => {
  const EmailClient = new Resend(process.env.RESEND_KEY)

  const { error } = await EmailClient.emails.send({
    from: `next-auth-template <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Sign in link for next-auth-template",
    html: EmailMagicLink({ type: "html", context: { url } }),
    text: EmailMagicLink({ type: "text", context: { url } }),
  })

  if (error) {
    console.error(error)
  }
}

function EmailMagicLink({
  type,
  context,
}: {
  type: "html" | "text"
  context: { url: string }
}) {
  if (type === "html") {
    return `
      <div>
        <a href=${context.url}>Click here to sign in</a>
      </div>
    `
  }

  return `
    Click here to sign in: ${context.url}
  `
}
