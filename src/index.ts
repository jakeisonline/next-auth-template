#!/usr/bin/env node

import { Argument, Command } from "commander"
import { createTemplate } from "@/create-template"

// Get the package.json file
import packageJson from "../package.json"
import { TEMPLATE_CHOICES } from "./lib/constants"

// Handle graceful exit
process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

const program = new Command()
  .name("next-auth-template")
  .description("Create a new Next.js application with auth already set up")
  .version(
    packageJson.version || "0.0.1",
    "-v, --version",
    "show version of cli",
  )
  .addArgument(
    new Argument(
      "[template]",
      "name of the template to initialize -- optional",
    ).choices(TEMPLATE_CHOICES.map((choice) => choice.value)),
  )
  .option(
    "-p, --project-name <name>",
    "name of the project to initialize, also used as the directory name",
  )
  .option(
    "-o, --overwrite",
    "overwrite existing files in the directory (project name) without prompting",
  )

program.parse(process.argv)

async function main() {
  const template = program.args[0]
  const projectName = program.opts().projectName
  const overwrite = program.opts().overwrite
  await createTemplate(template, { projectName, overwrite })
}

main()
