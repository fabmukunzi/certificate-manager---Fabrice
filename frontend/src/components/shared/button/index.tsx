import { ButtonHTMLAttributes, FC } from 'react';

type ButtonProps = {
  label?: string | React.ReactNode;
  icon?: string | React.ReactNode;
};
const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = ({
  label,
  className,
  icon,
  ...props
}) => {
  return (
    <button className={`button ${className}`.trim()} {...props}>
      {icon} {label}
    </button>
  );
};
export default Button;
