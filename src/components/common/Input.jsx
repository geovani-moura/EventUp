import { Form } from "react-bootstrap";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  ...props
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      {label && (
        <Form.Label>
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}

      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        isInvalid={!!error}
        {...props}
      />

      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default Input;
