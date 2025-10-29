import { Link } from "react-router-dom";
import Button from "../common/Button";
import { useAuth } from "../../contexts/AuthContext";
import { formatDate } from "../../utils/helpers";

const EventCard = ({ event, viewLink, editLink, onDelete }) => {
  const { id, title, date, location, description, image } = event;
  const { isAuthenticated } = useAuth();
  return (
    <div className="card h-100">
      <img
        src={image || `https://picsum.photos/200/300?random=${id}`}
        alt={title}
        className="card-img-top"
        style={{ objectFit: "cover", height: "200px" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text mb-1">📅 {formatDate(date)}</p>
        <p className="card-text mb-2">📍 {location}</p>
        <p className="card-text flex-grow-1">
          {description.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>

        <div className="d-flex flex-wrap gap-2 mt-3">
          {viewLink && (
            <Link to={viewLink} className="btn btn-primary btn-sm">
              Ver detalhes
            </Link>
          )}

          {isAuthenticated() && (
            <>
              {editLink && (
                <Link to={editLink} className="btn btn-secondary btn-sm">
                  Editar
                </Link>
              )}
              {onDelete && (
                <Button variant="danger" size="small" onClick={onDelete}>
                  Excluir
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
