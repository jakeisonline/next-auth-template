import { Command } from "commander"
import * as fs from "fs-extra"
import * as path from "path"
import { fileURLToPath } from "url"

// Get the directory path of the current module
// @ts-ignore # import.meta is defined just fine at compile time
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// Navigate up to the root and into templates/one-to-one
const TEMPLATE_DIR = path.resolve(__dirname, "../templates/one-to-one")

export const init = new Command()
  .name("init")
  .description("Initialize a new Next.js application with auth")
  .argument("<destination>", "Destination folder to copy the template")
  .action(async (destination: string) => {
    const targetDir = path.resolve(process.cwd(), destination)

    console.log(`Copying files from ${TEMPLATE_DIR} to ${targetDir}...`)

    try {
      await fs.copy(TEMPLATE_DIR, targetDir)
      console.log("Template copied successfully!")
    } catch (err) {
      console.error("Error copying template:", err)
      process.exit(1)
    }
  })
