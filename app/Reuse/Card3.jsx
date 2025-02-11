import React from "react";

const Card3 = ({ title, imageUrl, height, width, marginBottom, article }) => {
  // Function to handle click and store data in localStorage
  const handleClick = () => {
    localStorage.setItem("clickedArticle", JSON.stringify(article));
  };
  return (
    <div
      className="bg-gray-200 border border-gray-300 rounded-lg p-4"
      style={{ height, width, marginBottom }}
      onClick={handleClick}
    >
      {/* Image */}
      <div className="w-full h-48">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={imageUrl}
          alt="Card Background"
          style={{ borderRadius: "10px" }}
        />
      </div>

      {/* Title Container */}
      <div className=" p-2 ">
        <h2 className="text-[#0f1f40] text-lg font-semibold">{title}</h2>
      </div>

    </div>
  );
};

export default Card3;
