import { Form as BsForm } from "react-bootstrap";

const Form = ({ children, onSubmit, className = "", ...props }) => (
  <BsForm onSubmit={onSubmit} className={className} {...props}>
    {children}
  </BsForm>
);

Form.Group = BsForm.Group;
Form.Label = BsForm.Label;
Form.Control = BsForm.Control;

export default Form;
