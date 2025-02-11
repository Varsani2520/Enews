import React from 'react';

const Card1 = ({  height, width, marginBottom ,article,imageUrl,category,title}) => {
  
  const handleClick = () => { 
    localStorage.setItem('clickedArticle', JSON.stringify(article));
  };

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg" style={{ height: height || "300px", width: width || "100%" , marginBottom }} onClick={handleClick}>
      {/* Background Image */}
      <img
        className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110"
        src={imageUrl}
        alt="Card Background"
      />

      {/* Category Label */}
      <div className="absolute top-2 left-2 bg-red-700 text-white text-lg font-semibold  px-2 py-1 rounded-md ">
        {category}
      </div>

      {/* Title Container */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent px-4 py-2">
        <h2 className="text-lg font-semibold text-white font-bold">{title}</h2>
      </div>
    </div>
  );
};

export default Card1;
