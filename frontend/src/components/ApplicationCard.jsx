import './ApplicationCard.css';
import { Draggable } from '@hello-pangea/dnd';
import api from '../api/axios';

const ApplicationCard = ({ application, index, onDelete }) => {
  const { id, company, role, location } = application;

  const handleDelete = async (e) => {
    e.stopPropagation(); // prevent drag from firing
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