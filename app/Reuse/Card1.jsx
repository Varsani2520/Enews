import React from 'react';
import { useRouter } from 'next/navigation';

const Card1 = ({ category, title, imageUrl, height, width, marginBottom }) => {
  const router = useRouter();

  // Function to handle click and store data in localStorage
  const handleClick = () => {
    const articleData = {
      category,
      title,
      imageUrl,
      height,
      width,
      // Other fields as needed
    };
    

    // Store data in localStorage
    localStorage.setItem('clickedArticle', JSON.stringify(articleData));

    router.push(`/news/${encodeURIComponent(title)}`);
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
      <div className="absolute top-2 left-2 bg-red-700 text-white px-2 py-1 rounded-md text-sm font-semibold">
        {category}
      </div>

      {/* Title Container */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent px-4 py-2">
        <h2 className="text-white text-xs  font-bold">{title}</h2>
      </div>
    </div>
  );
};

export default Card1;
