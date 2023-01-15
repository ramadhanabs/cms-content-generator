/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import { SizeVariant } from "@/types/componentsTypes"
import { ChangeEvent, forwardRef, LegacyRef } from "react"
import { twMerge } from "tailwind-merge"
import Text from "../Text"
import { getFormStyles } from "./formStyles"

interface Option {
  value: string | number
  label: string
  disabled?: boolean
}
interface FormInputSelectProps {
  id?: string
  name?: string
  options: Array<Option>
  label?: string
  value?: string | number
  disabled?: boolean
  isRequired?: boolean
  readOnly?: boolean
  isInvalid?: boolean
  error?: string
  size?: SizeVariant
  placeholder?: string
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  onBlur?: (event: ChangeEvent<HTMLSelectElement>) => void
}

const FormInputSelect = forwardRef(
  (props: FormInputSelectProps, ref: LegacyRef<HTMLSelectElement>) => {
    const {
      onChange,
      onBlur,
      name,
      label,
      options,
      id = "",
      isRequired,
      isInvalid,
      size = "large",
      value,
      disabled,
      placeholder,
      error,
      ...otherProps
    } = props

    return (
      <>
        {label && (
          <label htmlFor={id} className="font-bold">
            {label} {!isRequired && <Text className="font-normal text-gray">(Opsional)</Text>}
          </label>
        )}

        <select
          {...otherProps}
          name={name}
          ref={ref}
          className={twMerge(getFormStyles({ isInvalid, size }))}
          required={isRequired}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <Text className="text-danger">{error}</Text>}
      </>
    )
  }
)

export default FormInputSelect
