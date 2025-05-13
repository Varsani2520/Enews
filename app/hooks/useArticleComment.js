import { httpAxios } from "@/app/utils/httpAxios";

// Create a comment
export async function createComment(article, user, content) {
  try {
    const res = await httpAxios.post("/comments", {
      articleId: article?._id,
      content,
    });
    return res.data?.data?.comment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

// Get comments for a specific article (can filter later)
export async function getCommentsForArticle() {
  try {
    const res = await httpAxios.get("/comments");
    return res.data?.comments || [];
  } catch (error) {
    console.error("Error getting comments:", error);
    throw error;
  }
}
