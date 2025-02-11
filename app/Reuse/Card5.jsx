import React from "react";
const Card5 = ({ category, title, imageUrl, height,article }) => {

  const handleClick = () => {
    localStorage.setItem("clickedArticle", JSON.stringify(article));
  };
  return (
    <div className="relative  overflow-hidden">
      <div className="relative" style={{height}} onClick={handleClick}>
        <img
          src={imageUrl}
          alt="Article Image"
          className="w-full h-full object-cover object-center rounded " 
        />
        <div className="absolute top-4 left-4 bg-[#f20404] text-white px-2 py-1 rounded-md" >
          <p className="text-sm font-semibold">{category}</p>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-[#1a2e51]">{title}</h2>
      </div>
    </div>
  );
};

export default Card5;
