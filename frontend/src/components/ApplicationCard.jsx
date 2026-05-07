const ApplicationCard = ({ application }) => {
  const { company, role, location, status } = application;

  return (
    <div className="card">
      <h3>{company}</h3>
      <p>{role}</p>
      {location && <p>{location}</p>}
    </div>
  );
};

export default ApplicationCard;