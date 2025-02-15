export const handleArticleClick = (article) => {
    if (article) {
      localStorage.setItem("clickedArticle", JSON.stringify(article));
    }
  };
  