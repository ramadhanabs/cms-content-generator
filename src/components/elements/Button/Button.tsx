import React, { PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

export type ButtonType = "button" | "submit" | "reset"
interface ButtonProps {
  className?: string
  onClick?: () => void
  type?: ButtonType
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { type = 'button', className, children, ...others } = props
  return (
    <button
      type={type}
      className={twMerge(
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
        className
      )}
      {...others}
    >
      {children}
    </button>
  )
}

export default Button
