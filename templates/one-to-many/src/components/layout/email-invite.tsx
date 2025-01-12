import * as React from "react"

interface EmailInviteProps {
  context: {
    token: string
    sender: {
      name: string
    }
  }
}

export const EmailInvite: React.FC<Readonly<EmailInviteProps>> = ({
  context,
}) => (
  <div>
    <p>
      Click <a href={`${process.env.BASE_URL}/invite/${context.token}`}>here</a>{" "}
      to join the team.
    </p>
  </div>
)
