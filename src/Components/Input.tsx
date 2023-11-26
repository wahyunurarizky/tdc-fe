import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: Props) => {
  return (
    <input
      className="p-2 w-full shadow-md border-black border rounded-md"
      {...props}
    />
  )
}

export default Input
