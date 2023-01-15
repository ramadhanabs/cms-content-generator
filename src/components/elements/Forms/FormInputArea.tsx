import { getFormStyles } from "@/components/elements/Forms/formStyles"
import Text from "@/components/elements/Text"
import { FormInputProps } from "@/types/componentsTypes"
import { ChangeEvent, forwardRef, KeyboardEvent, LegacyRef, memo, ReactElement } from "react"
import { twMerge } from "tailwind-merge"

type FormInputAreaProps = FormInputProps<string, ChangeEvent<HTMLTextAreaElement>> & {
  leftElement?: ReactElement
  rightElement?: ReactElement
  defaultValue?: string
  id?: string
  // eslint-disable-next-line no-unused-vars
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void
  onFocus?: () => void
  className?: string
}

function FormInputArea(props: FormInputAreaProps, ref: LegacyRef<HTMLTextAreaElement>) {
  const {
    label,
    leftElement,
    rightElement,
    placeholder = "",
    isRequired = false,
    isInvalid = false,
    error,
    defaultValue,
    id = "",
    className,
    ...otherprops
  } = props

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={id} className="font-semibold text-sm">
          {label} {!isRequired && <Text className="font-normal text-gray">(Opsional)</Text>}
        </label>
      )}
      <div className="relative">
        {leftElement && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            {leftElement}
          </div>
        )}

        <textarea
          id={id}
          className={twMerge(
            leftElement && "pl-9",
            rightElement && "pr-9",
            getFormStyles({ isInvalid }),
            className
          )}
          required={isRequired}
          placeholder={`${placeholder}${isRequired ? " *" : ""}`}
          ref={ref}
          defaultValue={defaultValue}
          {...otherprops}
        />

        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {rightElement}
          </div>
        )}
      </div>

      {error && <Text className="text-danger">{error}</Text>}
    </div>
  )
}

export default memo(forwardRef<HTMLTextAreaElement, FormInputAreaProps>(FormInputArea))
