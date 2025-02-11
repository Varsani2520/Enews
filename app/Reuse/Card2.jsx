import React from "react";

const Card2 = ({
  category,
  title,
  imageUrl,
  height,
  width,
  article
}) => {

  const handleClick = () => {
    localStorage.setItem("clickedArticle", JSON.stringify(article));
  };
  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg bg-white mb-4"
      style={{ height, width }}
      onClick={handleClick}
    >
      {/* Background Image */}
      <img
        className="object-cover w-full"
        src={imageUrl}
        alt="Card Background"
      />
      {/* Category and Title */}
      <div className="absolute bottom-0 left-0 w-full bg-red-[#f20404] text-white p-4">
        <div className="text-lg font-bold">{category}</div>
        <div className=" font-bold text-lg font-semibold">{title}</div>
      </div>
    </div>
  );
};

export default Card2;
