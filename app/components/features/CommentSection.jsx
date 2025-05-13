"use client";
import React, { useEffect, useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { toast } from "react-hot-toast";
import { createComment, createCommnet, getCommentsForArticle } from "@/app/hooks/useArticleComment";
import CustomPagination from "../shared/CustomPagination";
import { auth } from "@/app/utils/firebase";
import useCurrentUser from "@/app/hooks/useCurrentUser";

const CommentForm = ({ article }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const commentsPerPage = 5; // Define how many comments per page
  const user = useCurrentUser();
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const fetchedComments = await getCommentsForArticle(article);
        const filtered = fetchedComments.filter(
          (c) => c.article?._id === article?._id
        );
        setComments(filtered);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
      setLoading(false);
    };

    fetchComments();
  }, [article]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await createComment(article, user, text);
      setText("");

      // Refresh comments after posting
      const updated = await getCommentsForArticle(article);
      const filtered = updated.filter(
        (c) => c.article?._id === article?._id
      );
      setComments(filtered);

      toast.success("Comment posted!");
    } catch (error) {
      toast.error("Failed to add comment!");
    }
  };

  // Paginate comments
  const startIndex = (page - 1) * commentsPerPage;
  const selectedComments = comments.slice(
    startIndex,
    startIndex + commentsPerPage
  );

  return (
    <div className="p-2 bg-white  rounded-lg ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-1">
        {/* Comment Input Field */}
        <TextField
          label="Write a comment..."
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
        >
          Post Comment
        </Button>
      </form>

      {/* Comments List */}
      <div className="mt-4  overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : comments.length > 0 ? (
          selectedComments.map((comment, index) => (
            <div key={comment._id} className="border-b py-2">
              <p className="font-medium text-blue-600">{comment.user?.fullname || "Anonymous"}</p>
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-sm text-gray-400">
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>

      {/* Pagination */}
      <CustomPagination
        totalItems={comments.length}
        itemsPerPage={commentsPerPage}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default CommentForm;
