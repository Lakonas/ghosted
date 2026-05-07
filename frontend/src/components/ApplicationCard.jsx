import './ApplicationCard.css';
import { Draggable } from '@hello-pangea/dnd';

const ApplicationCard = ({ application, index }) => {
  const { id, company, role, location } = application;

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="card-company">{company}</p>
          <p className="card-role">{role}</p>
          {location && <p className="card-location">{location}</p>}
        </div>
      )}
    </Draggable>
  );
};

export default ApplicationCard;