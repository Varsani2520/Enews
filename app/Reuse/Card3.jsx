import React from 'react';

const Card3 = ({ title, imageUrl, height, width, marginBottom }) => {
  return (
    <div
      className="bg-gray-200 border border-gray-300 rounded-lg p-4"
      style={{ height, width, marginBottom }}
    >
      {/* Image */}
      <div className="w-full h-72 mb-4">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={imageUrl}
          alt="Card Background"
          style={{ borderRadius: '10px' }}
        />
      </div>

      {/* Title Container */}
      <div className=" p-2  mb-4">
        <h2 className="text-[#0f1f40] text-xl font-bold">{title}</h2>
      </div>

      {/* View More Button */}
      <button className="bg-red-700 text-white font-semibold py-2 px-4 rounded-md">
        View More
      </button>
    </div>
  );
};



export default Card3;
