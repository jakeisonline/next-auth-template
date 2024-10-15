export interface ServerActionResponse {
  status: "success" | "error"
  messages?: [
    {
      code?: string
      title: string
      body: string
    },
  ]
}
