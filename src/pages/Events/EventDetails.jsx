import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventForm from "../Events/EventForm";
import { Loading, Button } from "../../components/common";
import * as eventService from "../../services/eventService";
import MainLayout from "../../components/layout/MainLayout";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        const e = await eventService.getEventById(parseInt(id));
        setEvent(e);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadEvent();
  }, [id]);

  if (loading) return <Loading />;
  if (!event)
    return <div className="text-center mt-5">Evento não encontrado</div>;

  return (
    <MainLayout>
      <div className="event-view-page">
        <div className="container">
          <header className="page-header mb-4 d-flex justify-content-between align-items-center">
            <h1>Detalhes do Evento</h1>
          </header>

          <EventForm initialData={event} readOnly={true} />
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDetails;
