import React from "react";
import Link from "next/link";

const SwiperCard = ({ category, title, imageUrl,height,width,marginBottom,handleClick }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg" style={{ height: height || "300px", width: width || "100%" , marginBottom }} onClick={handleClick}>
      {/* Image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      
      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Category */}
        <span className="text-sm font-semibold text-gray-600 bg-gray-200 px-2 py-1 rounded-md">
          {category}
        </span>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {title}
        </h3>
        
        {/* Read More */}
        <Link href="#">
          <div className="text-sm font-medium text-gray-600 flex items-center gap-1 hover:text-gray-800">
            Read more 
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SwiperCard;
