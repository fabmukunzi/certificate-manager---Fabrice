import React, { FC } from 'react'
type ButtonProps = {
  label: string
  className?: string
}
const Button: FC<ButtonProps> = ({ label, className }) => {
  return <button className={`btn ${className}`}>{label}</button>
}
export default Button
