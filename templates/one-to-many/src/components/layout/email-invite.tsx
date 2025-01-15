import * as React from "react"

interface EmailInviteProps {
  context: {
    token: string
    account: {
      name: string
    }
  }
}

export const EmailInvite: React.FC<Readonly<EmailInviteProps>> = ({
  context,
}) => (
  <div>
    Click <a href={`${process.env.BASE_URL}/invite/${context.token}`}>here</a>{" "}
    to join {context.account.name}.
  </div>
)
