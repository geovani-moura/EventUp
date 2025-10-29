import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../Events/EventForm";
import * as eventService from "../../services/eventService";
import MainLayout from "../../components/layout/MainLayout";

const EventCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (eventData) => {
    try {
      setLoading(true);
      await eventService.createEvent(eventData);
      setTimeout(() => {
        setLoading(false);
        alert("Evento criado com sucesso!");
        navigate("/events");
      }, 1000);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      alert("Erro ao criar evento. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="event-create-page">
        <div className="container">
          <header className="page-header">
            <h1>Criar Novo Evento</h1>
            <p>Preencha os dados do seu evento comunitário</p>
          </header>

          <EventForm
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel="Criar Evento"
            />
        </div>
      </div>
    </MainLayout>
  );
};

export default EventCreate;
