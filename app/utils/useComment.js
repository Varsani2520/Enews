import { useEffect, useState } from "react";
import { createComments, getComments } from "../service/comments"; // make sure paths are correct

export const useComments = (article) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    if (!article?._id) return;

    try {
      const data = await getComments(article);
      console.log("📦 result from getComments:", data);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const postComment = async ({ content }) => {
    if (!article?._id) return;
    setLoading(true);
    try {
      const newComment = await createComments({ article, content });
      setComments((prev) => [newComment, ...prev]); // add to top
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [article]);

  return { comments, loading, postComment, setComments };
};
