import { PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

interface ContainerDesktopProps {
  className?: string
}

const ContainerDesktop = (props: PropsWithChildren<ContainerDesktopProps>) => {
  const { className, children } = props
  return <div className={twMerge("w-full max-w-[1440px] mx-auto bg-white rounded p-4", className)}>{children}</div>
}

export default ContainerDesktop
