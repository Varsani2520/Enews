import React, { useState } from "react";
import Card5 from "@/app/components/cards/Card5";
import FontSizeSlider from "./FontSlider";

const NewsContent = ({ article }) => {
  const [fontSize, setFontSize] = useState(18);

  return (
    <>
    

      {/* News Image */}
      <Card5 imageUrl={`https://www.nytimes.com/${article.multimedia?.[0]?.url}`} height="400px" />
  {/* Font Size Slider */}
  <FontSizeSlider fontSize={fontSize} setFontSize={setFontSize} />
      {/* News Content */}
      {article.lead_paragraph && (
        <p style={{ fontSize: `${fontSize}px` }} className="text-gray-700 leading-7 mb-4">
          {article.lead_paragraph}
        </p>
      )}
      {article.abstract && (
        <p style={{ fontSize: `${fontSize}px` }} className="text-gray-500 italic mb-4">
          {article.abstract}
        </p>
      )}

      {/* Keywords Section */}
      {article.keywords && article.keywords.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Keywords:</h2>
          <ul className="list-disc list-inside text-gray-600">
            {article.keywords.map((keyword, index) => (
              <li key={index}>{keyword.value}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default NewsContent;
