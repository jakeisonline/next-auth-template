import ora, { type Options } from "ora"

export function createSpinner(text: Options["text"], options?: Options) {
  return ora({
    text,
    ...options,
  })
}
