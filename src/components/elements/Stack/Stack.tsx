import { PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

interface StackProps {
  dir?: "row" | "col"
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  className?: string
}

export default function Stack(props: PropsWithChildren<StackProps>) {
  const { dir, gap, className, children } = props

  return (
    <div
      className={twMerge(
        "flex flex-col items-start gap-1 w-full",
        gap && `gap-${gap}`,
        dir && `flex-${dir}`,
        className
      )}
    >
      {children}
    </div>
  )
}
