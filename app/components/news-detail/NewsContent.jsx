import React, { useState } from "react";
import Card5 from "@/app/components/cards/Card5";
import FontSizeSlider from "./FontSlider";
import { useThemeContext } from "@/app/context/ThemeContext";

const NewsContent = ({ article }) => {
  const [fontSize, setFontSize] = useState(18);
  const { themeData } = useThemeContext()

  return (
    <>
      {/* News Image */}
      <Card5 imageUrl={article.image_url} height="400px" />
      {/* Font Size Slider */}
      <FontSizeSlider fontSize={fontSize} setFontSize={setFontSize} />
      {/* News Content */}
      {article.content && (
        <p
          style={{
            fontSize: `${fontSize}px`,
            color: themeData?.cardText,
          }}
          className="leading-7 mb-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      )}
      {article.excerpt && (
        <p style={{
          fontSize: `${fontSize}px`,
          color: themeData?.secondary,
          fontStyle: "italic",
        }}
          className="mb-4" dangerouslySetInnerHTML={{ __html: article.excerpt }}

        />
      )}

      {/* Keywords Section */}
      {article.tags?.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2" style={{ color: themeData?.cardText }}>Keywords:</h2>
          <ul className="list-disc list-inside" style={{ color: themeData?.cardText }}>
            {article.tags.map((tag, index) => (
              <li key={index}>{tag.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default NewsContent;
