"use client";
import React, { useEffect, useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { createCommnet, getComment } from "../hooks/ArticleComment";
import CustomPagination from "../Reuse/CustomPagination";
import { toast } from "react-hot-toast";

const CommentForm = ({ article, user }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const commentsPerPage = 10; // Define how many comments per page

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const fetchedComments = await getComment(article);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
      setLoading(false);
    };

    fetchComments();
  }, [article]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim()) {
      try {
        await createCommnet(article, user, text);
        setText("");

        // Refresh comments after posting
        const updatedComments = await getComment(article);
        setComments(updatedComments);
      } catch (error) {
        toast.error("Failed to add comment!");
      }
    }
  };

  // Paginate comments
  const startIndex = (page - 1) * commentsPerPage;
  const selectedComments = comments.slice(startIndex, startIndex + commentsPerPage);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
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
      <div className="mt-4 max-h-[400px] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : comments.length > 0 ? (
          selectedComments.map((comment, index) => (
            <div key={index} className="border-b py-2">
              <p className="font-medium text-blue-600">{comment.email}</p>
              <p className="text-gray-600">{comment.commentText}</p>
              <p className="text-sm text-gray-400">
                {new Date(comment.timestamp).toLocaleString()}
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
