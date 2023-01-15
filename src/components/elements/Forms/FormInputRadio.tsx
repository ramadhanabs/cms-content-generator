/* eslint-disable no-unused-vars */
import { ChangeEvent, FocusEvent, forwardRef, ReactNode } from "react"
import Box from "../Box"
import Stack from "../Stack"
import Text from "../Text"

type FormInputRadioProps = {
  value: string
  name?: string
  label: string | ReactNode
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const FormInputRadio = forwardRef<HTMLInputElement, FormInputRadioProps>((props, ref) => {
  const { label, ...otherProps } = props

  return (
    <Stack dir="row">
      <label className="flex flex-row gap-2">
        <input {...otherProps} ref={ref} type="radio" className="relative top-0.5" />

        {typeof label === "string" ? <Text className="text-sm">{label}</Text> : label}
      </label>
    </Stack>
  )
})
FormInputRadio.displayName = "FormInputRadio"

export default FormInputRadio
