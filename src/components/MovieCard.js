import React from 'react';

const MovieCard = ({ name, totalCount, uploadedCount, createdCount, pendingCount }) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-4 shadow-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-lg text-dark-accent">{name}</span>
        <span className="text-dark-muted text-sm">{totalCount} reels</span>
      </div>
      <div className="flex justify-between gap-4 text-sm">
        <span className="text-status-uploaded">{uploadedCount} uploaded</span>
        <span className="text-status-created">{createdCount} created</span>
        <span className="text-status-pending">{pendingCount} pending</span>
      </div>
    </div>
  );
};

export default MovieCard;
