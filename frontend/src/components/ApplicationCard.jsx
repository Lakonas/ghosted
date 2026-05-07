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
          <h3>{company}</h3>
          <p>{role}</p>
          {location && <p>{location}</p>}
        </div>
      )}
    </Draggable>
  );
};

export default ApplicationCard;