import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import MainLayout from "../../components/layout/MainLayout";
import { Container, Card, Form, Button, Alert, Row, Col } from "../../components/common";

const ProfilePage = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });
  const [changePassword, setChangePassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setChangePassword(checked);
      if (!checked) {
        setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (changePassword && form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      setSuccess("");
      return;
    }

    try {
      const updatedData = {
        name: form.name,
        email: form.email,
        ...(changePassword && { password: form.password }),
      };

      await updateUser(updatedData);

      setSuccess("Informações atualizadas com sucesso!");
      setError("");

      // Aguarda um pouco antes de redirecionar (para mostrar o feedback)
      setTimeout(() => {
        navigate("/events");
      }, 1000);
    } catch {
      setError("Erro ao atualizar informações.");
      setSuccess("");
    }
  };

  return (
    <MainLayout>
      <Container className="py-5 d-flex justify-content-center">
        <Card className="p-4" title="Meu Perfil" style={{ maxWidth: 500, width: "100%" }}>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Nome */}
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* E-mail */}
            <div className="mb-3">
              <label className="form-label">E-mail</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Checkbox: alterar senha */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="changePassword"
                checked={changePassword}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="changePassword">
                Deseja alterar a senha?
              </label>
            </div>

            {/* Campos de senha (condicional) */}
            {changePassword && (
              <>
                <div className="mb-3">
                  <label className="form-label">Nova Senha</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Digite sua nova senha"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirme a Senha</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Confirme sua nova senha"
                    required
                  />
                </div>
              </>
            )}

            {/* Botões */}
            <Row className="mt-4">
              <Col md={6} className="mb-2">
                <Button type="submit" fullWidth variant="primary">
                  Salvar Alterações
                </Button>
              </Col>
              <Col md={6}>
                <Button fullWidth variant="outline-danger" onClick={logout}>
                  Sair
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </MainLayout>
  );
};

export default ProfilePage;
