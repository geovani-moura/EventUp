import { Button as BsButton } from "react-bootstrap";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  onClick,
  disabled,
  className = "",
  ...props
}) => {
  return (
    <BsButton
      variant={variant}
      size={size}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${fullWidth ? "w-100" : ""} ${className}`}
      {...props}
    >
      {children}
    </BsButton>
  );
};

export default Button;
