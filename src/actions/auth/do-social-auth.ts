"use server"

import { authConfig, signIn } from "@/lib/auth"

/**
 * Server action to sign in with a social provider.
 *
 * @param {void | undefined} prevState - Previous state from the server action
 * @param {FormData} [formData] - Form data containing the social provider information
 * @throws {Error} When:
 *  - Form data is invalid
 *  - No provider was provided
 *  - Invalid provider was provided
 *  - No providers have been configured
 *
 * @returns {Promise<void>}
 */

export async function doSocialAuth(
  prevState: void | undefined,
  formData?: FormData,
): Promise<void> {
  // If the form didn't provide a FormData object, throw an error
  if (!(formData instanceof FormData)) {
    throw new Error("[Form Error] Form data is not a FormData object")
  }

  const provider = formData.get("provider")

  // If the form didn't give us a provider, throw an error
  if (!provider) {
    throw new Error("[Form Error] No provider was provided")
  }

  const configuredProviders = authConfig.providers

  // If no providers are configured, throw an error
  if (!configuredProviders) {
    throw new Error("[Config Error] No providers have been configured")
  }

  // If the provided provider is not in the configured providers, throw an error
  if (!configuredProviders.some((p) => p.id === provider)) {
    throw new Error("[Form Error] Invalid provider was provided")
  }

  // Sign in with the provider
  await signIn(String(provider))
}
