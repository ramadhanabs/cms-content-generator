import { HTMLProps, PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

interface Props extends HTMLProps<HTMLParagraphElement> {
  asParagraph?: boolean
  noGutter?: boolean
  // eslint-disable-next-line no-undef
  innerRef?: React.RefObject<HTMLParagraphElement>
}

export default function Text(props: PropsWithChildren<Props>) {
  const { children, asParagraph, className = "", noGutter, innerRef, ...otherProps } = props

  if (asParagraph)
    return (
      <p
        ref={innerRef}
        {...otherProps}
        className={twMerge("tracking-[0.03em]", className, noGutter && "leading-none")}
      >
        {children}
      </p>
    )

  return (
    <span
      {...otherProps}
      ref={innerRef}
      className={twMerge("tracking-[0.03em]", className, noGutter && "leading-none")}
    >
      {children}
    </span>
  )
}
