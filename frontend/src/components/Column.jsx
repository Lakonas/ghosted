import ApplicationCard from './ApplicationCard';

const Column = ({ title, applications }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="column-cards">
        {applications.map(app => (
          <ApplicationCard key={app.id} application={app} />
        ))}
      </div>
    </div>
  );
};

export default Column;