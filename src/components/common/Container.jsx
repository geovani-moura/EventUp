import { Container as BsContainer } from "react-bootstrap";

const Container = ({ children, className = "", ...props }) => {
  return (
    <BsContainer className={className} {...props}>
      {children}
    </BsContainer>
  );
};

export default Container;
