#!/usr/bin/env node

import { Command } from "commander"
import { init } from "@/commands/init"

// Get the package.json file
import packageJson from "../package.json"

// Handle graceful exit
process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  const program = new Command()
    .name("next-auth-template")
    .description("Create a new Next.js application with auth already set up")
    .version(packageJson.version || "0.0.1")

  program.addCommand(init)

  program.parse(process.argv)
}

main()
