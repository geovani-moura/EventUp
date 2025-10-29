import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import EventCard from "../../components/events/EventCard";
import * as eventService from "../../services/eventService";
import MainLayout from "../../components/layout/MainLayout";
import { Loading, Modal } from "../../components/common";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    date: "",
    location: "",
  });

  // Controle do modal de exclusão
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, events]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const eventColecao = await eventService.getEvents();
      setTimeout(() => {
        setEvents(eventColecao);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...events];

    if (filters.search) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter((event) => event.category === filters.category);
    }

    if (filters.location) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.date) {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date).toISOString().slice(0, 10);
        return eventDate === filters.date;
      });
    }

    setFilteredEvents(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Abre o modal de confirmação de exclusão
  const handleOpenDeleteModal = (eventId) => {
    setEventToDelete(eventId);
    setIsModalOpen(true);
  };

  // Fecha o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEventToDelete(null);
  };

  // Confirma exclusão
  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;

    try {
      await eventService.deleteEvent(eventToDelete);
      setEvents((prev) => prev.filter((e) => e.id !== eventToDelete));
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
    } finally {
      handleCloseModal();
    }
  };

  if (loading) return <Loading />;

  return (
    <MainLayout>
      <div className="container my-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Eventos Comunitários</h1>
          <Link
            to="/events/create"
            className="btn btn-primary d-flex align-items-center"
          >
            <Plus size={20} className="me-2" />
            Criar Evento
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-4">
          <div className="row g-3">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por título..."
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por categoria..."
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por local..."
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <input
                type="date"
                className="form-control"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>

        {/* Event Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center mt-5">
            <p className="lead">Nenhum evento encontrado</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredEvents.map((event) => (
              <div className="col-md-4 mb-4" key={event.id}>
                <EventCard
                  event={event}
                  viewLink={`/events/details/${event.id}`}
                  editLink={`/events/edit/${event.id}`}
                  onDelete={() => handleOpenDeleteModal(event.id)}
                  isOwner={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmação */}
      <Modal
        isOpen={isModalOpen}
        title="Excluir Evento"
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        confirmText="Excluir"
        cancelText="Cancelar"
      >
        Tem certeza de que deseja excluir este evento?
      </Modal>
    </MainLayout>
  );
};

export default EventsPage;
