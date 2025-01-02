import { Command } from "commander"
import * as fs from "fs-extra"
import * as path from "path"
import { fileURLToPath } from "url"
import { spinner } from "@/utils/spinner"
import prompts from "prompts"

// Get the directory path of the current module
// @ts-ignore # import.meta is defined just fine at compile time
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// Navigate up to the root and into templates/one-to-one
const TEMPLATE_DIR = path.resolve(__dirname, "../templates")

export const init = new Command()
  .name("init")
  .description("Initialize a new Next.js application with auth")
  .argument("[template]", "The name of the template to initialize. Optional.")
  .action(async (template: string) => {
    try {
      let templateName = template

      if (!template) {
        const { templatePrompt } = await prompts({
          type: "select",
          name: "templatePrompt",
          message: "Select a template",
          choices: [
            { title: "One-to-one", value: "one-to-one" },
            { title: "One-to-many", value: "one-to-many" },
          ],
        })
        templateName = templatePrompt
      }

      const { projectName } = await prompts({
        type: "text",
        name: "projectName",
        message: "Enter the name of your project",
        initial: ".",
      })

      const targetDir = path.resolve(process.cwd(), projectName)
      const indicator = spinner(`Copying files to ${targetDir}...`)

      await fs.copy(`${TEMPLATE_DIR}/${templateName}`, targetDir)
      indicator.succeed(`Template copied successfully to ${targetDir}!`)
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })
