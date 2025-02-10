import React from "react";
import Icons from "./Icons";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
const Card5 = ({ category, title, imageUrl, date }) => {
  return (
    <div className="relative  overflow-hidden">
      <div className="relative h-64">
        <img
          src={imageUrl}
          alt="Article Image"
          className="w-full h-full object-cover object-center rounded transition-transform duration-300 ease-in-out hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-[#f20404] text-white px-2 py-1 rounded-lg">
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
