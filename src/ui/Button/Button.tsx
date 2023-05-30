import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  fullWidth?: boolean;
  rounded: string;
  text?: string;
}
const Button: React.FC<ButtonProps> = ({
  value,
  rounded,
  fullWidth = false,
  text,
  ...props
}) => {
  return (
    <button
      className={`disabled:opacity-5 h-fit bg-primary text-white  py-2 px-5 ${rounded} ${
        fullWidth ? "w-full" : "w-fit"
      } ${text}`}
      {...props}
    >
      {value}
    </button>
  );
};

export default Button;
