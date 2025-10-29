import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import MainLayout from "../../components/layout/MainLayout";
import { Container, Card, Input, Button, Alert, Form } from "../../components/common";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(form.email, form.password);
    if (success) {
      navigate("/events");
    } else {
      setError("E-mail ou senha inválidos.");
    }
  };

  return (
    <MainLayout>
      <Container className="py-5 d-flex justify-content-center align-items-center">
        <Card className="p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
          <h3 className="text-center mb-4">
            Entrar no <span className="text-primary">EventUp</span>
          </h3>

          <Form onSubmit={handleSubmit}>
            <Input
              label="E-mail"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              required
            />

            <Input
              label="Senha"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
            />

            {error && (
              <Alert variant="danger" className="text-center py-2">
                {error}
              </Alert>
            )}

            <Button type="submit" variant="primary" fullWidth>
              Entrar
            </Button>
          </Form>

          <p className="text-center mt-4 mb-0">
            Não tem uma conta?{" "}
            <Button
              variant="link"
              className="p-0 text-decoration-none"
              onClick={() => navigate("/register")}
            >
              Cadastre-se
            </Button>
          </p>
        </Card>
      </Container>
    </MainLayout>
  );
};

export default Login;
