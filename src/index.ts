#!/usr/bin/env node

import * as fs from "fs-extra"
import * as path from "path"
import { fileURLToPath } from "url"
import { Command } from "commander"
import { createRequire } from "module"

// Convert URL to file path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define the source directory
const TEMPLATE_DIR = path.join(__dirname, "../templates/one-to-one")

// Get the package.json file
const require = createRequire(import.meta.url)
const packageJson = require("../package.json")

async function main() {
  const program = new Command()
    .name("next-auth-template")
    .description("Create a new Next.js application with auth already set up")
    .version(packageJson.version || "0.0.1")

  program
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

  program.parse(process.argv)
}

main()
