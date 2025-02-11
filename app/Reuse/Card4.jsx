import React from 'react';

const Card4 = ({ imageUrl, category, title,alt,article }) => {
  const handleClick = () => { 
    localStorage.setItem('clickedArticle', JSON.stringify(article));
  };
  return (
    <div className="flex items-center bg-white shadow-md rounded-md overflow-hidden mb-4" onClick={handleClick}>
      {/* Left side image */}
      <div className="flex-shrink-0">
        <img
          src={imageUrl}
          alt={alt}
          className="w-32 h-32 object-cover rounded-md"
        />
      </div>
      {/* Right side content */}
      <div className="p-4">
        <div className="text-sm text-white bg-[#f20404] w-fit py-1 px-4 rounded-md font-bold">{category}</div>
        <h2 className="  text-[#0f1f40] text-lg font-semibold">{title}</h2>
      </div>
    </div>
  );
};

export default Card4;
