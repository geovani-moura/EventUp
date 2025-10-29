import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Input,
  Button,
  Textarea,
} from "../../components/common";

const EventForm = ({
  initialData = {},
  onSubmit,
  loading = false,
  readOnly = false,
  submitLabel = "Salvar",
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: initialData.id,
    title: initialData.title || "",
    date: initialData.date || "",
    location: initialData.location || "",
    description: initialData.description || "",
    image: initialData.image || "",
  });

  const handleChange = (e) => {
    if (readOnly) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!readOnly) onSubmit(formData);
  };

  return (
    <Container className="my-4">
      <Form onSubmit={handleSubmit}>
        <Input
          label="Título do evento"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          readOnly={readOnly}
        />

        <Input
          label="Data"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          readOnly={readOnly}
        />

        <Input
          label="Local"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          readOnly={readOnly}
        />

        <Textarea
          label="Descrição"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descreva seu evento..."
          rows={5}
          required
          readOnly={readOnly}
        />

        <Input
          label="URL da imagem"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://exemplo.com/imagem.jpg"
          readOnly={readOnly}
        />

        {/* Botões Salvar e Voltar lado a lado */}
        <div className="d-flex justify-content-end mt-3 gap-2">
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            ← Voltar
          </Button>
          {!readOnly && (
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Salvando..." : submitLabel}
            </Button>
          )}
        </div>
      </Form>
    </Container>
  );
};

export default EventForm;
