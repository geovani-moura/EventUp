import { Modal as BsModal } from "react-bootstrap";
import Button from "./Button";

const Modal = ({ isOpen, title, children, onClose, onConfirm, confirmText = "Confirmar", cancelText = "Cancelar" }) => {
  return (
    <BsModal show={isOpen} onHide={onClose} centered>
      {title && (
        <BsModal.Header closeButton>
          <BsModal.Title>{title}</BsModal.Title>
        </BsModal.Header>
      )}

      <BsModal.Body>{children}</BsModal.Body>

      <BsModal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {cancelText}
        </Button>
        {onConfirm && (
          <Button variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        )}
      </BsModal.Footer>
    </BsModal>
  );
};

export default Modal;
