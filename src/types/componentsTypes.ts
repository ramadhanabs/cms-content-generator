/* eslint-disable no-unused-vars */
export type SizeVariant = "small" | "large"
export type MappedSizeVariant = { [key in SizeVariant]: string }

export interface FormInputProps<K, V> {
  name?: string
  isRequired?: boolean
  label?: string
  value?: K
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  isInvalid?: boolean
  error?: string
  onChange?: (value: V) => void
  onClick?: () => void
  onBlur?: (value: V) => void
}
