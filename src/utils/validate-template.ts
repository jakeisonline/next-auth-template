import { TEMPLATE_CHOICES, VALIDATION_SCHEMAS } from "@/lib/constants"
import { createSpinner } from "@/utils/spinner"

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
          TEMPLATE_CHOICES.map((choice) => choice.value).join(", "),
      )
      process.exit(1)
    }
  }
}
