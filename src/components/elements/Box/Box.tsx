import { forwardRef, HTMLProps, PropsWithChildren } from "react"

interface Props extends HTMLProps<HTMLDivElement> {
  as?: "div" | "span"
}
function Box(props: PropsWithChildren<Props>, ref: any) {
  const { children, as = "div", ...otherProps } = props

  if (as === "span")
    return (
      <span ref={ref} {...otherProps}>
        {children}
      </span>
    )

  return (
    <div {...otherProps} ref={ref}>
      {children}
    </div>
  )
}

export default forwardRef(Box)
