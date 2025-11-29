import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Input,
  Button,
  Textarea,
} from "../../components/common";
import useCamera from "../../utils/useCamera";

const normalizeDateForInput = (v) => {
  if (!v) return "";
  const d = new Date(v);
  if (!isNaN(d)) return d.toISOString().slice(0, 10);
  const m = String(v).match(/(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : "";
};

const EventForm = ({
  initialData = {},
  onSubmit,
  loading = false,
  readOnly = false,
  submitLabel = "Salvar",
}) => {
  const navigate = useNavigate();
  const { abrirCamera, abrirGaleria, imagemPreview, setImagemPreview } =
    useCamera();

  const [formData, setFormData] = useState({
    id: initialData.id,
    title: initialData.title || "",
    date: normalizeDateForInput(initialData.date),
    location: initialData.location || "",
    description: initialData.description || "",
    image: initialData.image || "",
  });

  const [errosCampo, setErrosCampo] = useState({});

  const handleChange = (e) => {
    if (readOnly) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errosCampo[name]) setErrosCampo((prev) => ({ ...prev, [name]: "" }));
  };

  const validarFormulario = () => {
    const erros = {};
    if (!formData.title.trim()) erros.title = "Título é obrigatório";
    if (!formData.date) erros.date = "Data é obrigatória";
    if (!formData.location.trim()) erros.location = "Local é obrigatório";
    if (!formData.description.trim())
      erros.description = "Descrição é obrigatória";
    return erros;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (readOnly) return;
    const erros = validarFormulario();
    if (Object.keys(erros).length > 0) {
      setErrosCampo(erros);
      return;
    }
    onSubmit(formData);
  };

  const handleFotoCapturada = (resultado) => {
    // resultado: { arquivo, uri, nome, tipo, tamanho }
    setFormData((prev) => ({ ...prev, image: resultado.uri }));
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
          error={errosCampo.title}
        />
        {errosCampo.title && (
          <small className="text-danger">{errosCampo.title}</small>
        )}

        <Input
          label="Data"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          readOnly={readOnly}
          error={errosCampo.date}
        />
        {errosCampo.date && (
          <small className="text-danger">{errosCampo.date}</small>
        )}

        <Input
          label="Local"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          readOnly={readOnly}
          error={errosCampo.location}
        />
        {errosCampo.location && (
          <small className="text-danger">{errosCampo.location}</small>
        )}

        <Textarea
          label="Descrição"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descreva seu evento..."
          rows={5}
          required
          readOnly={readOnly}
          error={errosCampo.description}
        />
        {errosCampo.description && (
          <small className="text-danger">{errosCampo.description}</small>
        )}

        {/* Imagem */}
        <div className="mb-3">
          <label className="form-label fw-bold">Imagem do evento</label>

          {/* Preview */}
          {(imagemPreview || formData.image) && (
            <div className="mb-3">
              <img
                src={imagemPreview || formData.image}
                alt="Preview do evento"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          {!readOnly && (
            <div className="d-flex gap-2 mb-3">
              <Button
                type="button"
                variant="outline-primary"
                onClick={() => abrirCamera(handleFotoCapturada)}
                size="sm"
              >
                📷 Tirar Foto
              </Button>
              <Button
                type="button"
                variant="outline-primary"
                onClick={() => abrirGaleria(handleFotoCapturada)}
                size="sm"
              >
                🖼️ Escolher da Galeria
              </Button>
              {imagemPreview && (
                <Button
                  type="button"
                  variant="outline-danger"
                  onClick={() => {
                    setImagemPreview(null);
                    setFormData((prev) => ({ ...prev, image: "" }));
                  }}
                  size="sm"
                >
                  ✕ Remover
                </Button>
              )}
            </div>
          )}

          {/* Ou URL */}
          <Input
            label="Ou cole a URL de uma imagem"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://exemplo.com/imagem.jpg"
            readOnly={readOnly}
          />
        </div>

        {/* Ações */}
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
