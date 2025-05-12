import { useEffect, useState } from "react";
import { createComments, getComments } from "../service/comments"; // adjust path as needed

export const useComments = (articleId) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const data = await getComments();
            setComments(data.comments); // Assuming API response shape is { comments: [...] }
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false);
        }
    };

    const postComment = async (content) => {
        if (!articleId) return;
        setLoading(true);
        try {
            const newComment = await createComments({ articleId, content });
            setComments(prev => [...prev, newComment.comment]); // append new comment if returned
        } catch (error) {
            console.error("Error posting comment:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return { comments, loading, postComment };
};
