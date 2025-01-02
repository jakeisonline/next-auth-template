import * as path from "path"
import * as fs from "fs-extra"
import prompts from "prompts"
import { Command } from "commander"
import { readdirSync } from "node:fs"
import { fileURLToPath } from "url"
import { createSpinner } from "@/utils/spinner"
import { validationSchemas } from "@/utils/validation-schemas"
import { TEMPLATE_CHOICES } from "@/lib/constants"

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
      if (template) {
        const validatedTemplateName =
          validationSchemas.template.safeParse(template)

        if (!validatedTemplateName.success) {
          spinner.fail(
            "Invalid template name. Must be one of: " +
              TEMPLATE_CHOICES.map((choice) => choice.value).join(", "),
          )
          process.exit(1)
        }
      }

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
            validationSchemas.projectName.safeParse(value)
          return validatedProjectName.success
            ? true
            : "Invalid project name. Must be a valid file system directory name and no spaces."
        },
      })

      const targetDir = path.resolve(process.cwd(), projectNamePrompt)

      try {
        const files = await readdirSync(targetDir)

        if (files.length > 0) {
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
      } catch (err) {
        spinner.fail(`Error reading directory at ${targetDir}`)
        console.error(err)
        process.exit(1)
      }

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
