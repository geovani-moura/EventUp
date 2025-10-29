import { Card as BsCard } from "react-bootstrap";

const Card = ({ title, children, className = "", ...props }) => {
  return (
    <BsCard className={`shadow-sm ${className}`} {...props}>
      {title && <BsCard.Header className="fw-semibold">{title}</BsCard.Header>}
      <BsCard.Body>{children}</BsCard.Body>
    </BsCard>
  );
};

export default Card;
