import { TEMPLATE_CHOICES } from "@/lib/constants";

export function getValidTemplates() {
  return TEMPLATE_CHOICES.filter((choice) => choice.value && !choice.disabled)
}
