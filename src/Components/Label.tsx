import React from 'react'
interface Props
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}

const Label = ({ children, ...props }: Props) => {
  return (
    <label {...props} className="block font-semibold">
      {children}
    </label>
  )
}

export default Label
