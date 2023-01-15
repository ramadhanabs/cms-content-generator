import React, { forwardRef, HTMLProps } from "react"

type FormInputCheckProps = HTMLProps<HTMLInputElement>

const FormInputCheck = forwardRef<HTMLInputElement, FormInputCheckProps>((props, ref) => {
  const { id, label, ...otherProps } = props
  return (
    <div className="flex items-center">
      <input
        {...otherProps}
        ref={ref}
        id={id}
        type="checkbox"
        className="w-4 h-4 accent-blue-600 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
      />
      <label htmlFor={id} className="ml-2 text-xs tracking-[.3px]">
        {label}
      </label>
    </div>
  )
})
FormInputCheck.displayName = "FormInputCheck"

export default FormInputCheck
