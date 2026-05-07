import { Droppable } from '@hello-pangea/dnd';
import ApplicationCard from './ApplicationCard';

const Column = ({ id, title, applications }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="column-cards"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {applications.map((app, index) => (
              <ApplicationCard key={app.id} application={app} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;