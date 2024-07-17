import React from 'react';

const Card4 = ({ imageUrl, category, title }) => {
  return (
    <div className="flex items-center bg-white shadow-md rounded-lg overflow-hidden mb-4">
      {/* Left side image */}
      <div className="flex-shrink-0">
        <img
          src={imageUrl}
          alt="Article"
          className="w-32 h-32 object-cover"
        />
      </div>
      {/* Right side content */}
      <div className="p-4">
        <div className="text-sm text-red-600 py-3 font-bold">{category}</div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </div>
  );
};

export default Card4;
