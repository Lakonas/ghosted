import './StatsPanel.css';

const StatsPanel = ({ applications }) => {
  const total = applications.length;

  const responded = applications.filter(a =>
    ['phone_screen', 'interview', 'offer', 'rejected', 'ghosted'].includes(a.status)
  ).length;

  const rejected = applications.filter(a => a.status === 'rejected').length;

  const responseRate = total === 0 ? 0 : Math.round((responded / total) * 100);
  const rejectionRate = total === 0 ? 0 : Math.round((rejected / total) * 100);

  const stats = [
    { label: 'Total Applied', value: total },
    { label: 'Response Rate', value: `${responseRate}%` },
    { label: 'Rejection Rate', value: `${rejectionRate}%` },
    { label: 'Active', value: applications.filter(a => !['rejected', 'ghosted'].includes(a.status)).length },
  ];

  return (
    <div className="stats-panel">
      {stats.map(stat => (
        <div key={stat.label} className="stat-card">
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsPanel;
