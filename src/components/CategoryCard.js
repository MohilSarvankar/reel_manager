import React from 'react';

const CategoryCard = ({ name, movieCount, totalReels, uploadedCount, otherCount }) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-4 shadow-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-dark-accent">{name}</h2>
        <span className="text-dark-muted text-sm">{movieCount} movies</span>
      </div>
      <div className="flex justify-between text-sm text-dark-muted">
        <span className="font-semibold">{totalReels} reels</span>
        <span className="text-status-uploaded">{uploadedCount} uploaded</span>
        <span className="text-status-created">{otherCount} other</span>
      </div>
    </div>
  );
};

export default CategoryCard;