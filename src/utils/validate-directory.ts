import { readdirSync, existsSync } from "node:fs"
import { createSpinner } from "@/utils/spinner"
import prompts from "prompts"

export async function validateDirectory(
  targetDir: string,
  overwrite: boolean,
  spinner: ReturnType<typeof createSpinner>,
) {
  try {
    if (existsSync(targetDir)) {
      const files = await readdirSync(targetDir)
      if (files.length > 0 && !overwrite) {
        const { overwritePrompt } = await prompts({
          type: "confirm",
          name: "overwritePrompt",
          message:
            "Directory is not empty. Files will be overwritten and existing files may cause conflicts. Proceed?",
          initial: false,
        })

        if (!overwritePrompt) {
          spinner.fail("Aborted.")
          process.exit(1)
        }
      }
    }
  } catch (err) {
    spinner.fail(`Error reading directory at ${targetDir}`)
    console.error(err)
    process.exit(1)
  }
}
