import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../Events/EventForm";
import { Loading } from "../../components/common";
import * as eventService from "../../services/eventService";
import MainLayout from "../../components/layout/MainLayout";

const EventEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const e = await eventService.getEventById(parseInt(id));
      setTimeout(() => {
        setEvent(e);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Erro ao carregar evento:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (eventData) => {
    try {
      setSaving(true);
      eventService.updateEvent(eventData);
      setTimeout(() => {
        setSaving(false);
        alert("Evento atualizado com sucesso!");
        navigate(`/events`);
      }, 1000);
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      alert("Erro ao atualizar evento. Tente novamente.");
      setSaving(false);
    }
  };

  if (loading) return <Loading />;
  if (!event) return <div>Evento não encontrado</div>;

  return (
    <MainLayout>
      <div className="event-edit-page">
        <div className="container">
          <header className="page-header">
            <h1>Editar Evento</h1>
            <p>Atualize as informações do seu evento</p>
          </header>

          <EventForm
            initialData={event}
            onSubmit={handleSubmit}
            loading={saving}
            submitLabel="Salvar Alterações"
            />
        </div>
      </div>
    </MainLayout>
  );
};

export default EventEdit;
