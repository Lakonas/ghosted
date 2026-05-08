import './ApplicationCard.css';
import { Draggable } from '@hello-pangea/dnd';
import api from '../api/axios';

const STATUS_COLORS = {
  saved: 'var(--saved)',
  applied: 'var(--applied)',
  phone_screen: 'var(--phone-screen)',
  interview: 'var(--interview)',
  offer: 'var(--offer)',
  rejected: 'var(--rejected)',
  ghosted: 'var(--ghosted)',
};

const ApplicationCard = ({ application, index, onDelete }) => {
  const { id, company, role, location, status } = application;

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await api.delete(`/applications/${id}`);
      onDelete(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            borderLeftColor: STATUS_COLORS[status],
          }}
        >
          <div className="card-header">
            <p className="card-company">{company}</p>
            <button className="card-delete" onClick={handleDelete}>✕</button>
          </div>
          <p className="card-role">{role}</p>
          {location && <p className="card-location">{location}</p>}
        </div>
      )}
    </Draggable>
  );
};

export default ApplicationCard;