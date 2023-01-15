import { Switch } from "@headlessui/react"
import { memo, ReactElement } from "react"
import Text from "../Text"

interface FormInputSwitchProps {
  name?: string
  disabled?: boolean
  label?: string | ReactElement
  checked?: boolean
  // eslint-disable-next-line no-unused-vars
  onChange?: (checked: boolean) => void
}

function FormInputSwitch(props: FormInputSwitchProps) {
  const { label, checked = false, onChange = () => {}, ...otherProps } = props

  return (
    <div className="flex gap-2 items-center">
      <Switch
        checked={checked}
        onChange={onChange}
        className={`${checked ? "bg-black" : "bg-gray-400"}
          relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 z-10`}
        {...otherProps}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${checked ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>

      {label && typeof label === "string" && <Text className="text-sm">{label}</Text>}

      {label && typeof label !== "string" && label}
    </div>
  )
}

export default memo(FormInputSwitch)
