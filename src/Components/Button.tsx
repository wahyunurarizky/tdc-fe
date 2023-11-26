import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, ...props }: Props) => {
  return (
    <button
      className="bg-orange-500 px-8 py-2 font-semibold rounded-sm hover:bg-orange-800 hover:text-white"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
