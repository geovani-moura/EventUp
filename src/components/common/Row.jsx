import { Row as BsRow } from "react-bootstrap";

const Row = ({ children, className = "", ...props }) => {
  return (
    <BsRow className={className} {...props}>
      {children}
    </BsRow>
  );
};

export default Row;
