import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as usuarioService from "../../services/usuarioService";
import { Input, Button } from "../../components/common";
import MainLayout from "../../components/layout/MainLayout";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(""); // limpa erro ao digitar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    await usuarioService.registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    navigate("/events");
  };

  return (
    <MainLayout>
      <div className="d-flex justify-content-center align-items-center min-vh-75 bg-light">
        <div
          className="card shadow p-4 rounded-4"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h2 className="text-center mb-4 text-primary">Criar Conta</h2>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <Input
              label="Nome"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
            />
            <Input
              label="E-mail"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
            />
            <Input
              label="Senha"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Crie uma senha"
            />
            <Input
              label="Confirmar Senha"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repita a senha"
            />

            {error && (
              <div className="text-danger text-center fw-semibold small">
                {error}
              </div>
            )}

            <Button type="submit" className="w-100 btn btn-primary mt-2">
              Cadastrar
            </Button>
          </form>

          <p className="text-center mt-3 text-muted">
            Já tem uma conta?{" "}
            <span
              role="button"
              onClick={() => navigate("/login")}
              className="text-primary fw-semibold text-decoration-underline"
            >
              Entrar
            </span>
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
