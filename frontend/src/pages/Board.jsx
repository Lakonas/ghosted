import { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import api from '../api/axios';
import Column from '../components/Column';
import ApplicationModal from '../components/ApplicationModal';
import Navbar from '../components/Navbar';
import './Board.css';
import StatsPanel from '../components/StatsPanel'; // NEW

const STATUSES = ['saved', 'applied', 'phone_screen', 'interview', 'offer', 'rejected', 'ghosted'];
const handleDelete = (id) => {
  setApplications(prev => prev.filter(app => app.id !== id));
};
const LABELS = {
  saved: 'Saved',
  applied: 'Applied',
  phone_screen: 'Phone Screen',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
  ghosted: 'Ghosted',
};

const Board = () => {
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get('/applications').then(res => setApplications(res.data));
  }, []);

  const getByStatus = (status) =>
    applications
      .filter(app => app.status === status)
      .sort((a, b) => a.position - b.position);

  const onDragEnd = async (result) => {
    const { draggableId, source, destination } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const newStatus = destination.droppableId;
    const id = parseInt(draggableId);

    // optimistic update
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: newStatus, position: destination.index } : app
      )
    );

    try {
      await api.patch(`/applications/${id}`, { status: newStatus, position: destination.index });
    } catch (err) {
      console.error('Failed to update application', err);
    }
  };
  const handleAdd = (newApp) => {
    setApplications(prev => [...prev, newApp]);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-container">
        <Navbar onAdd={() => setShowModal(true)} />
        <StatsPanel applications={applications} />
        <div className="board">
          {STATUSES.map(status => (
            <Column
            key={status}
            id={status}
            title={LABELS[status]}
            applications={getByStatus(status)}
            onDelete={handleDelete} // NEW
          />
          ))}
        </div>
        {showModal && <ApplicationModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}
      </div>
    </DragDropContext>
  );
};

export default Board;