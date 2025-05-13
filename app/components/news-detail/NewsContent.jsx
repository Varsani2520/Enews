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
            color: themeData?.text?.primary,
            lineHeight: "1.6",
          }}
          className="leading-7 mb-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      )}
      {article.excerpt && (
        <p style={{
          fontSize: `${fontSize}px`,
          color: themeData?.text?.secondary,
          fontStyle: "italic",
        }}
          className="mb-4" dangerouslySetInnerHTML={{ __html: article.excerpt }}

        />
      )}

      {/* Keywords Section */}
      {article.tags?.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2" style={{ color: themeData?.text?.primary }}>Keywords:</h2>
          <ul className="list-disc list-inside" style={{ color: themeData?.text?.primary }}>
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
