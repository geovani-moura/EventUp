import { useState } from "react";
import { Container, Form, Input, Button, Textarea } from "../../components/common";

const EventForm = ({ initialData = {}, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    id: initialData.id,
    title: initialData.title || "",
    date: initialData.date || "",
    location: initialData.location || "",
    description: initialData.description || "",
    image: initialData.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
        />

        <Input
          label="Data"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <Input
          label="Local"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <Textarea
          label="Descrição"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descreva seu evento..."
          rows={5}
          required
        />

        <Input
          label="URL da imagem"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://exemplo.com/imagem.jpg"
        />

        <div className="text-end mt-3">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EventForm;
