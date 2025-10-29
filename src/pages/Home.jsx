import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../services/eventService";
import EventCard from "../components/events/EventCard";
import Button from "../components/common/Button";
import MainLayout from "../components/layout/MainLayout";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data.slice(0, 3)); // mostra apenas os 3 primeiros
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
    }
  };

  return (
    <MainLayout>
      <div className="container my-5">
        {/* Hero Section */}
        <section className="text-center mb-5">
          <h1 className="display-4">
            Bem-vindo ao <span className="text-primary">EventUp</span> 🎉
          </h1>
          <p className="lead">
            Descubra, crie e participe dos melhores eventos da sua região.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            {!isAuthenticated() && (
              <Button
                variant="primary"
                size="large"
                onClick={() => navigate("/login")}
              >
                Entrar
              </Button>
            )}
            <Button
              variant="secondary"
              size="large"
              onClick={() => navigate("/events")}
            >
              Ver Eventos
            </Button>
          </div>
        </section>

        {/* Featured Events */}
        <section>
          <h2 className="mb-4">Próximos eventos</h2>
          <div className="row g-4">
            {events.map((event) => (
              <div className="col-md-4" key={event.id}>
                <EventCard
                  event={event}
                  viewLink={`/events/details/${event.id}`}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;
