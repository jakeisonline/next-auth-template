# next-auth-template

Sign up and auth, super quick with database-backed sessions, social sign in, magic links, and multiple user models to choose from. This CLI tool enables you to quickly start building a new Next.js application, with auth already set up for you so you can focus on the fun stuff.

## Usage

This CLI offers two ways to initialize a new project with auth already set up.

### Interactive

```bash
pnpm dlx next-auth-template
# or
npx next-auth-template
# or
bunx --bun next-auth-template
```

You will be asked to select a template:

```bash
? Select a template › - Use arrow-keys. Return to submit.
❯   One-to-one
    One-to-many
```

You will also be asked to provide a project name:

```bash
? Enter the name of your project › .
```

This is also used as the directory name. You can leave it as default (`.`) to have the project initialized into the current directory. Must be a single word, no special characters.

```bash
✔ Template copied successfully to /path/to/project
```

If everything goes well, you will see a message of confirmation.

### Non-interactive

See `next-auth-template --help` for more information.

```bash
Usage: next-auth-template [options] [template]

Create a new Next.js application with auth already set up

Arguments:
  template                   name of the template to initialize -- optional (choices: "one-to-one", "one-to-many")

Options:
  -v, --version              show version of cli
  -p, --project-name <name>  name of the project to initialize, also used as the directory name
  -o, --overwrite            overwrite existing files in the directory (project name) without prompting
  -h, --help                 display help for command
```

## Getting Started

Once you've initialized a template using the CLI, visit the following links to learn more about the template you've chosen:

- [One-to-one](https://jakeisonline.com/playground/tools/next-auth-template)

# Documentation

Visit https://jakeisonline.com/playground/tools/next-auth-template for detailed documentation about this CLI tool and all the templates.
