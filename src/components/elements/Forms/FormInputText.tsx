/* eslint-disable no-unused-vars */
import Box from "@/components/elements/Box/Box"
import Text from "@/components/elements/Text/Text"
import { FormInputProps, SizeVariant } from "@/types/componentsTypes"
import { ChangeEvent, forwardRef, KeyboardEvent, LegacyRef, memo, ReactNode } from "react"
import { twMerge } from "tailwind-merge"
import { getFormStyles } from "./formStyles"

type FormInputTextProps = FormInputProps<string | number, ChangeEvent<HTMLInputElement>> & {
  size?: SizeVariant
  leftElement?: ReactNode
  rightElement?: ReactNode
  rightLabelElement?: ReactNode
  defaultValue?: string
  type?: string
  id?: string
  isElementButton?: boolean
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void
  onFocus?: () => void
  className?: string
  colorTheme?: string
  isHideSpinButton?: boolean
}

function FormInputText(props: FormInputTextProps, ref: LegacyRef<HTMLInputElement>) {
  const {
    size = "large",
    label,
    leftElement,
    rightElement,
    rightLabelElement,
    placeholder = "",
    isRequired = false,
    isInvalid = false,
    error,
    defaultValue,
    type = "text",
    id = "",
    isElementButton = false,
    className,
    colorTheme = "primary",
    isHideSpinButton = true,
    ...otherprops
  } = props

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <Box className="flex flex-row">
          <label htmlFor={id} className="font-bold">
            {label}
          </label>
          {rightLabelElement}
        </Box>
      )}
      <div className="relative">
        <input
          id={id}
          type={type}
          className={twMerge(
            leftElement && "pl-9",
            rightElement && "pr-9",
            getFormStyles({ isInvalid, size }),
            "border p-[10px]",
            isHideSpinButton && "hide-spin-button",
            className
          )}
          required={isRequired}
          placeholder={`${placeholder}${isRequired ? " *" : ""}`}
          ref={ref}
          defaultValue={defaultValue}
          {...otherprops}
        />

        {leftElement && (
          <div
            className={`absolute inset-y-0 left-0 flex items-center pl-2 ${
              isElementButton ? "cursor-pointer" : "pointer-events-none"
            }`}
          >
            {leftElement}
          </div>
        )}

        {rightElement && (
          <div
            className={`absolute inset-y-0 right-0 flex items-center ${
              isElementButton ? "cursor-pointer" : "pointer-events-none"
            }`}
          >
            {rightElement}
          </div>
        )}
      </div>

      {error && <Text className="text-red-500 text-xs">{error}</Text>}
    </div>
  )
}

export default memo(forwardRef<HTMLInputElement, FormInputTextProps>(FormInputText))
