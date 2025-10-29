import { Alert as BsAlert } from "react-bootstrap";

const Alert = ({ variant = "info", children, className = "", ...props }) => {
  return (
    <BsAlert variant={variant} className={className} {...props}>
      {children}
    </BsAlert>
  );
};

export default Alert;
