import { Col as BsCol } from "react-bootstrap";

const Col = ({ children, className = "", ...props }) => {
  return (
    <BsCol className={className} {...props}>
      {children}
    </BsCol>
  );
};

export default Col;
