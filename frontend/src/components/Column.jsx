import './Column.css';
import ApplicationCard from './ApplicationCard';
import { Droppable } from '@hello-pangea/dnd';

const STATUS_COLORS = {
  saved: 'var(--saved)',
  applied: 'var(--applied)',
  phone_screen: 'var(--phone-screen)',
  interview: 'var(--interview)',
  offer: 'var(--offer)',
  rejected: 'var(--rejected)',
  ghosted: 'var(--ghosted)',
};

const Column = ({ id, title, applications }) => {
  return (
    <div className="column">
      <div className="column-header">
        <span className="column-status-dot" style={{ background: STATUS_COLORS[id] }} />
        <span className="column-title">{title}</span>
        <span className="column-count">{applications.length}</span>
      </div>
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