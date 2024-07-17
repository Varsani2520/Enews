import { useRouter } from 'next/navigation';
import React from 'react';

const Card2 = ({ category, title, imageUrl, height, width, abstract, snippet }) => {
    const router = useRouter();

    // Function to handle click and store data in localStorage
    const handleClick = () => {
        const articleData = {
            category,
            title,
            imageUrl,
            height,
            width,
            abstract,
            snippet
            // Other fields as needed
        };


        // Store data in localStorage
        localStorage.setItem('clickedArticle', JSON.stringify(articleData));

        router.push(`/news/${encodeURIComponent(title)}`);
    };
    return (
        <div className="relative overflow-hidden rounded-lg shadow-lg bg-white mb-4" style={{ height, width }}onClick={handleClick}>
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
