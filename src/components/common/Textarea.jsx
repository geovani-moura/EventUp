import { Form } from "react-bootstrap";

const Textarea = ({
  label,
  name,
  value,
  onChange,
  rows = 4,
  placeholder = "",
  error,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <Form.Group className={`mb-3 ${className}`} controlId={name}>
      {label && (
        <Form.Label>
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}

      <Form.Control
        as="textarea"
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
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

export default Textarea;
