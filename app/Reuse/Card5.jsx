import React from "react";
import Icons from "./Icons";
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
const Card5 = ({ category, title, imageUrl, date }) => {
    return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative h-64">
                <img
                    src={imageUrl}
                    alt="Article Image"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 left-4 bg-[#f20404] text-white px-2 py-1 rounded-lg">
                    <p className="text-sm font-semibold">{category}</p>
                </div>
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-[#1a2e51]">{title}</h2>
                <div className="flex items-center text-gray-500 text-sm">
                    <Icons icon={<DateRangeOutlinedIcon />} />                    <p>{new Date(date).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default Card5;
