import * as path from "path"
import * as fs from "fs-extra"
import prompts from "prompts"
import { Command } from "commander"
import { fileURLToPath } from "url"
import { createSpinner } from "@/utils/spinner"
import { validateDirectory } from "@/utils/validate-directory"
import { validateTemplate } from "@/utils/validate-template"
import { TEMPLATE_CHOICES, VALIDATION_SCHEMAS } from "@/lib/constants"

// Get the directory path of the current module
// @ts-ignore # import.meta is defined just fine at compile time
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEMPLATE_DIR = path.resolve(__dirname, "../templates")

export const init = new Command()
  .name("init")
  .description("Initialize a new Next.js application with auth")
  .argument("[template]", "The name of the template to initialize. Optional.")
  .action(async (template: string) => {
    const spinner = createSpinner("")

    try {
      validateTemplate(template, spinner)

      let templateName = template

      if (!template) {
        const { templatePrompt } = await prompts({
          type: "select",
          name: "templatePrompt",
          message: "Select a template",
          choices: TEMPLATE_CHOICES,
        })
        templateName = templatePrompt
      }

      const { projectNamePrompt } = await prompts({
        type: "text",
        name: "projectNamePrompt",
        message: "Enter the name of your project",
        initial: ".",
        validate: (value) => {
          const validatedProjectName =
            VALIDATION_SCHEMAS.projectName.safeParse(value)
          return validatedProjectName.success
            ? true
            : "Invalid project name. Must be a valid file system directory name and no spaces."
        },
      })

      const targetDir = path.resolve(process.cwd(), projectNamePrompt)

      await validateDirectory(targetDir, spinner)

      spinner.start()
      spinner.text = `Copying files to ${targetDir}...`

      await fs.copy(`${TEMPLATE_DIR}/${templateName}`, targetDir)

      spinner.succeed(`Template copied successfully to ${targetDir}`)
    } catch (err) {
      spinner.fail("Error copying template files.")
      console.error(err)
      process.exit(1)
    }
  })
