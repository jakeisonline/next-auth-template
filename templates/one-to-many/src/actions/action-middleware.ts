import { auth } from "@/lib/auth"
import { ServerActionResponse } from "@/lib/types"
import { fetchAccountUsers } from "@/actions/account/fetch-account-users"

/**
 * Type definition for server action functions that handle direct queries
 * @template T - The return type of the action
 * @template Args - Array type containing the function arguments
 */

type ActionFunction<T, Args extends any[]> = (...args: Args) => Promise<T>

/**
 * Type definition for server action functions that handle form submissions
 * @template Args - Array type containing additional function arguments
 */

type ActionFunctionWithState<Args extends any[]> = (
  prevState: ServerActionResponse | undefined,
  formData: FormData,
  ...args: Args
) => Promise<ServerActionResponse>

/**
 * Configuration options for the action middleware
 * @interface
 * @property {boolean} [requireAuth=true] - Whether the action requires user authentication
 * @property {boolean} [requireAdmin] - Whether the action requires admin privileges
 * @property {boolean} [validateFormData=true] - Whether to validate the FormData object
 * @property {('form'|'query')} [type='form'] - The type of action being protected
 */

interface MiddlewareOptions {
  requireAuth?: boolean
  requireAdmin?: boolean
  validateFormData?: boolean
  type?: "form" | "query"
}

/**
 * Validates user authentication and optionally admin status
 * @param {boolean} requireAuth - Whether authentication is required
 * @param {boolean} requireAdmin - Whether admin privileges are required
 * @returns {Promise<{ isValid: boolean; error?: string }>}
 */

async function validateAuth(requireAuth: boolean, requireAdmin?: boolean) {
  const session = await auth()

  if (requireAuth && !session) {
    return {
      isValid: false,
      error: "You must be logged in to perform this action",
    }
  }

  if (requireAdmin && session) {
    const accountId = session.user.accountId
    const users = await fetchAccountUsers(accountId, ["admin", "owner"])

    if (
      Array.isArray(users) &&
      !users.some((user) => user.users.id === session?.user.id)
    ) {
      return {
        isValid: false,
        error: "You must be an admin or owner to perform this action",
      }
    }
  }

  return { isValid: true }
}

/**
 * Higher-order function that wraps server actions with protection middleware
 * @template T - The return type for query actions
 * @template Args - Array type containing the function arguments
 * @param {ActionFunction<T, Args>} action - The server action to protect
 * @param {MiddlewareOptions} options - Configuration options for the middleware
 * @returns {Promise<T>} Protected server action function
 * @throws {Error} When authentication or authorization fails
 */

export function withQueryProtection<T, Args extends any[]>(
  action: ActionFunction<T, Args>,
  options: Omit<MiddlewareOptions, "type" | "validateFormData"> = {
    requireAuth: true,
  },
) {
  return async (...args: Args): Promise<T> => {
    const { isValid, error } = await validateAuth(
      options.requireAuth ?? true,
      options.requireAdmin,
    )
    if (!isValid) {
      throw new Error(error)
    }
    return await action(...args)
  }
}

/**
 * Higher-order function that wraps form submission actions with protection middleware
 * @template Args - Array type containing additional function arguments
 * @param {ActionFunctionWithState<Args>} action - The form action to protect
 * @param {MiddlewareOptions} options - Configuration options for the middleware
 * @returns {Promise<ServerActionResponse>} Protected form action function
 */

export function withFormProtection<Args extends any[]>(
  action: ActionFunctionWithState<Args>,
  options: Omit<MiddlewareOptions, "type"> = {
    requireAuth: true,
    validateFormData: true,
  },
) {
  return async (...args: Args): Promise<ServerActionResponse> => {
    try {
      const { isValid, error } = await validateAuth(
        options.requireAuth ?? true,
        options.requireAdmin,
      )
      if (!isValid) {
        return {
          status: "error",
          messages: [{ title: "Unauthorized", body: error! }],
        }
      }

      const [prevState, formData, ...restArgs] = args
      if (options.validateFormData && !(formData instanceof FormData)) {
        return {
          status: "error",
          messages: [
            {
              title: "Form Error",
              body: "Form data is not a FormData object",
            },
          ],
        }
      }

      return await action(prevState, formData, ...(restArgs as Args))
    } catch (error) {
      return {
        status: "error",
        messages: [
          {
            title: "Error",
            body: error instanceof Error ? error.message : "An error occurred",
          },
        ],
      }
    }
  }
}
