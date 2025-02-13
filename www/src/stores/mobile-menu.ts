"use client"

import type { Dispatch } from "react"
import { create } from "zustand"

const useMobileMenuStore = create<{
  isOpen: boolean
}>(() => ({
  isOpen: false,
}))

export const useMobileMenu = () => useMobileMenuStore((state) => state.isOpen)

export const setMobileMenu: Dispatch<boolean> = (isOpen) => {
  useMobileMenuStore.setState({ isOpen })
}
