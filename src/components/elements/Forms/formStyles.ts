import { SizeVariant } from "@/types/componentsTypes"
import { twMerge } from "tailwind-merge"

interface Options {
  isInvalid?: boolean
  size?: SizeVariant
  colorTheme?: string
  isDense?: boolean
}

export const getFormStyles = (options?: Options) => {
  return twMerge(
    `
    !text-sm
    text-dark
    block
    w-full
    !border
    !border-gray-200
    !shadow-sm
    focus:outline-none
    !caret-dark
    placeholder-gray
    disabled:bg-gray-300
    disabled:text-gray-700
    rounded
  `,
    options?.isInvalid &&
      "!border-danger focus:!border-danger-lighter focus:!ring-1 focus:!ring-danger-light",
    options?.size === "large" ? "!py-2 !px-2" : "!py-1 !px-1"
  )
}
