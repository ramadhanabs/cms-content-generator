import { MappedSizeVariant, SizeVariant } from "@/types/componentsTypes"
import { ButtonHTMLAttributes, cloneElement, ReactElement } from "react"
import { twMerge } from "tailwind-merge"

type MappedSizeVariantExtended = MappedSizeVariant & { "x-small": string }

const BUTTON_SIZE_VARIANT: MappedSizeVariantExtended = {
  "x-small": "min-w-6 w-6 h-6",
  small: "min-w-8 w-8 h-8",
  large: "min-w-10 w-10 h-10",
}

const ICON_SIZE_VARIANT: MappedSizeVariantExtended = {
  "x-small": "w-4 h-4",
  small: "w-5 h-5",
  large: "w-6 h-6",
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: SizeVariant | "x-small"
  icon: ReactElement
  ariaLabel: string
  className?: string
  isLoading?: boolean
  disabled?: boolean
  id?: string
  isWrapElement?: boolean
}
export default function IconButton(props: IconButtonProps) {
  const {
    icon,
    ariaLabel,
    size = "small",
    className,
    isLoading,
    id,
    isWrapElement = false,
    ...otherProps
  } = props

  const btnClassNames = twMerge(
    "px-0 py-0 flex-shrink-0 flex-grow-0 rounded-lg hover:bg-gray-100 flex items-center justify-center",
    BUTTON_SIZE_VARIANT[size]
  )

  return (
    <button
      aria-label={ariaLabel}
      className={twMerge(btnClassNames, className, isWrapElement && "!min-w-0 w-max h-max")}
      id={id}
      {...otherProps}
    >
      {isLoading
        ? null
        : cloneElement(icon, {
            className: twMerge(ICON_SIZE_VARIANT[size], icon.props.className),
          })}
    </button>
  )
}
