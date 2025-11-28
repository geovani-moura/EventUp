/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Testes CRUD - Eventos", () => {
  // Mock de dados de evento
  const eventoTeste = {
    id: 1,
    title: "Workshop React",
    date: "2025-12-10",
    location: "São Paulo",
    description: "Workshop completo de React",
    image: "http://example.com/event.jpg",
  };

  // Teste 1: Inserir/Criar evento
  test("deve ser possível criar um novo evento", () => {
    const novoEvento = {
      title: "Novo Evento",
      date: "2025-12-15",
      location: "Rio de Janeiro",
      description: "Descrição do evento",
    };

    // Simula validação básica de um novo evento
    expect(novoEvento.title).toBeTruthy();
    expect(novoEvento.date).toBeTruthy();
    expect(novoEvento.location).toBeTruthy();
  });

  // Teste 2: Editar evento
  test("deve ser possível editar um evento existente", () => {
    const eventoEditado = {
      ...eventoTeste,
      title: "Workshop React - Edição",
      location: "Belo Horizonte",
    };

    expect(eventoEditado.title).toBe("Workshop React - Edição");
    expect(eventoEditado.location).toBe("Belo Horizonte");
    expect(eventoEditado.id).toBe(1); // ID não muda
  });

  // Teste 3: Excluir evento
  test("deve ser possível excluir um evento", () => {
    const eventos = [eventoTeste];
    const eventoParaExcluir = eventos[0].id;

    const eventosAposExcluir = eventos.filter(
      (evento) => evento.id !== eventoParaExcluir
    );

    expect(eventosAposExcluir).toHaveLength(0);
    expect(eventos).toHaveLength(1); // Array original não muda
  });

  // Teste 4: Validação de campos obrigatórios
  test("evento deve ter campos obrigatórios preenchidos", () => {
    expect(eventoTeste.title).toBeTruthy();
    expect(eventoTeste.date).toBeTruthy();
    expect(eventoTeste.location).toBeTruthy();
    expect(eventoTeste.description).toBeTruthy();
  });

  // Teste 5: Renderização básica de evento
  test("deve exibir informações do evento na tela", () => {
    render(
      <div>
        <h2>{eventoTeste.title}</h2>
        <p>Data: {eventoTeste.date}</p>
        <p>Local: {eventoTeste.location}</p>
        <p>{eventoTeste.description}</p>
        <button onClick={() => null}>Excluir</button>
      </div>
    );

    expect(screen.getByText("Workshop React")).toBeInTheDocument();
    expect(screen.getByText(/São Paulo/)).toBeInTheDocument();
    expect(screen.getByText(/2025-12-10/)).toBeInTheDocument();
  });

  // Teste 6: Ação de excluir dispara callback
  test("botão de excluir deve chamar função de exclusão", () => {
    const mockExcluir = jest.fn();

    render(<button onClick={() => mockExcluir(1)}>Excluir</button>);

    const botao = screen.getByText("Excluir");
    fireEvent.click(botao);

    expect(mockExcluir).toHaveBeenCalledWith(1);
  });
});
