import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as eventService from "../../services/eventService";
import Loading from "../../components/common/Loading";
import MainLayout from "../../components/layout/MainLayout";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        const e = await eventService.getEventById(parseInt(id));
        setEvent(e);
      } catch (error) {
        console.error("Erro ao carregar evento:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadEvent();
  }, [id]);

  if (loading) return <Loading />;
  if (!event) return <div>Evento não encontrado</div>;

  return (
    <MainLayout>
      <div className="event-details-page">
        <h1>{event.title}</h1>
        <p><strong>Data:</strong> {new Date(event.date).toLocaleDateString("pt-BR")}</p>
        <p><strong>Horário:</strong> {event.time}</p>
        <p><strong>Local:</strong> {event.location}</p>
        {event.isPaid && <p><strong>Valor:</strong> R$ {event.price}</p>}
        <p><strong>Organizador:</strong> {event.organizerName}</p>
        <p>{event.description}</p>
        <p><strong>Confirmados:</strong> {event.attendees}</p>
        {event.image && <img src={event.image} alt={event.title} />}
      </div>
    </MainLayout>
  );
};

export default EventDetails;
