import React from 'react';

const Card2 = ({ category, title, imageUrl, height ,width}) => {
    return (
        <div className="relative overflow-hidden rounded-lg shadow-lg bg-white mb-4" style={{ height,width }}>
            {/* Background Image */}
            <img
                className="object-cover w-full h-full"
                src={imageUrl}
                alt="Card Background"
            />
            {/* Category and Title */}
            <div className="absolute bottom-0 left-0 w-full bg-red-500 text-white p-4">
                <div className="text-lg font-bold">{category}</div>
                <div className="text-xl font-bold">{title}</div>
            </div>
        </div>
    );
};

export default Card2;
