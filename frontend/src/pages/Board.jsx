import { useEffect, useState } from 'react';
import api from '../api/axios';
import Column from '../components/Column';

const STATUSES = ['saved', 'applied', 'phone_screen', 'interview', 'offer', 'rejected', 'ghosted'];

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

  useEffect(() => {
    api.get('/applications').then(res => setApplications(res.data));
  }, []);

  const getByStatus = (status) => applications.filter(app => app.status === status);

  return (
    <div className="board">
      {STATUSES.map(status => (
        <Column
          key={status}
          title={LABELS[status]}
          applications={getByStatus(status)}
        />
      ))}
    </div>
  );
};

export default Board;