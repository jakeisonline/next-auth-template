import { TEMPLATE_CHOICES } from "@/lib/constants"
import { validationSchemas } from "@/utils/validation-schemas"
import { createSpinner } from "@/utils/spinner"

export function validateTemplate(
  template: string,
  spinner: ReturnType<typeof createSpinner>,
) {
  if (template) {
    const validatedTemplateName = validationSchemas.template.safeParse(template)

    if (!validatedTemplateName.success) {
      spinner.fail(
        "Invalid template name. Must be one of: " +
          TEMPLATE_CHOICES.map((choice) => choice.value).join(", "),
      )
      process.exit(1)
    }
  }
}
