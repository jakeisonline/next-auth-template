import ora, { type Options } from "ora"

export function spinner(text: Options["text"], options?: Options) {
  return ora({
    text,
    ...options,
  })
}
