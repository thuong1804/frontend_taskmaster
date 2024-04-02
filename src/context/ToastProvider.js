"use client"
import { Toaster } from "sonner"

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <Toaster richColors  position="top-right" />
    </>
  )
}
