import React, { ButtonHTMLAttributes, FC } from 'react';

type ButtonProps = {
  label: string;
};
const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = ({
  label,
  className,
  ...props
}) => {
  return (
    <button className={`button ${className}`.trim()} {...props}>
      {label}
    </button>
  );
};
export default Button;
