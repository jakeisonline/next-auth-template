import { VALIDATION_SCHEMAS } from "@/lib/constants"
import { createSpinner } from "@/utils/spinner"
import { getValidTemplates } from "@/utils/get-valid-templates"

export function validateTemplate(
  template: string,
  spinner: ReturnType<typeof createSpinner>,
) {
  if (template) {
    const validatedTemplateName =
      VALIDATION_SCHEMAS.template.safeParse(template)

    if (!validatedTemplateName.success) {
      spinner.fail(
        "Invalid template name. Must be one of: " +
          getValidTemplates().map((choice) => choice.value).join(", "),
      )
      process.exit(1)
    }
  }
}
