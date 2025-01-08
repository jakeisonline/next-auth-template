import { createContext, useContext, useState } from "react"

export const useFormGroupIsSubmitting = () => {
  const context = useContext(FormGroupContext)

  if (!context) {
    throw new Error(
      "useFormGroupIsSubmitting must be used within a <FormGroupContextProvider>",
    )
  }

  return context
}

type FormGroupContextType = {
  formGroupIsSubmitting: boolean
  setFormGroupIsSubmitting: (isSubmitting: boolean) => void
}

export const FormGroupContext = createContext<FormGroupContextType | null>({
  formGroupIsSubmitting: false,
  setFormGroupIsSubmitting: () => {},
})

type FormGroupContextProviderProps = {
  children: React.ReactNode
}

export const FormGroupContextProvider = ({
  children,
}: FormGroupContextProviderProps) => {
  const [formGroupIsSubmitting, setFormGroupIsSubmitting] = useState(false)

  return (
    <FormGroupContext.Provider
      value={{ formGroupIsSubmitting, setFormGroupIsSubmitting }}
    >
      {children}
    </FormGroupContext.Provider>
  )
}
