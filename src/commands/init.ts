import { Command } from "commander"
import * as fs from "fs-extra"
import * as path from "path"
import { fileURLToPath } from "url"
import { createSpinner } from "@/utils/spinner"
import prompts from "prompts"
import { z } from "zod"

// Get the directory path of the current module
// @ts-ignore # import.meta is defined just fine at compile time
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEMPLATE_DIR = path.resolve(__dirname, "../templates")

const TEMPLATE_CHOICES = [
  { title: "One-to-one", value: "one-to-one" },
  { title: "One-to-many", value: "one-to-many" },
]

export const init = new Command()
  .name("init")
  .description("Initialize a new Next.js application with auth")
  .argument("[template]", "The name of the template to initialize. Optional.")
  .action(async (template: string) => {
    const spinner = createSpinner("")

    try {
      // Use zod to check if the template supplied in the argument is valid against TEMPLATE_CHOICES values
      const templateSchema = z.enum(
        TEMPLATE_CHOICES.map((choice) => choice.value) as [string, ...string[]],
      )
      const validatedTemplateName = templateSchema.safeParse(template)

      if (!validatedTemplateName.success) {
        spinner.fail(
          "Invalid template name. Must be one of: " +
            TEMPLATE_CHOICES.map((choice) => choice.value).join(", "),
        )
        process.exit(1)
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
          const projectNameSchema = z
            .string()
            .regex(/^[^\s\/\\\?\*\:\<\>\"\|]+$/)
          const validatedProjectName = projectNameSchema.safeParse(value)
          return validatedProjectName.success
            ? true
            : "Invalid project name. Must be a valid file system directory name and no spaces."
        },
      })

      const targetDir = path.resolve(process.cwd(), projectNamePrompt)

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
