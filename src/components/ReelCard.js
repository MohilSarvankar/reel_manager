import React from 'react';

const statusColors = {
  uploaded: 'bg-status-uploaded',
  created: 'bg-status-created',
  downloaded: 'bg-status-downloaded',
  pending: 'bg-status-pending',
};

const ReelCard = ({ name, status, note }) => {
  return (
    <div className={`bg-dark-card border border-dark-border rounded-lg p-4 shadow-md mb-4 relative`}> 
      <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-dark-bg ${statusColors[status]}`}>{status}</span>
      <h3 className="text-base font-semibold text-dark-accent mb-1">{name}</h3>
      <p className="text-sm text-dark-muted">{note}</p>
    </div>
  );
};

export default ReelCard;
