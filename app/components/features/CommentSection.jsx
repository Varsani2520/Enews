"use client";
import React, { useState } from "react";
import { TextField, Button, CircularProgress, Avatar } from "@mui/material";
import { toast } from "react-hot-toast";
import CustomPagination from "../shared/CustomPagination";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { useComments } from "@/app/utils/useComment";

const CommentForm = ({ article }) => {
  const user = useCurrentUser();
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const commentsPerPage = 5;

  // Use custom hook to handle comment operations
  const { comments, loading, postComment } = useComments(article);
  console.log("🟢 Comments from useComments:", comments);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return toast.error("Comment cannot be empty.");
    if (!user) return toast.error("You must be logged in to comment.");

    try {
      await postComment({ content: text });
      toast.success("Comment posted!");
      setText("");
      setPage(1);
    } catch (error) {
      toast.error("Failed to post comment.");
      console.error(error);
    }
  };


  // Paginate comments
  const startIndex = (page - 1) * commentsPerPage;
  const selectedComments = comments.slice(
    startIndex,
    startIndex + commentsPerPage
  );

  return (
    <div className="p-2 bg-white rounded-lg">
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
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Comment"}
        </Button>
      </form>

      {/* Comments List */}
      <div className="mt-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : comments.length > 0 ? (

          selectedComments.map((comment) => (
            <div key={comment._id} className="border-b py-2">
              <div className="flex items-start gap-3 mb-2">
                <Avatar
                  src={comment.user?.avatar_url || ""}
                  alt={comment.user?.fullname || "User"}
                  sx={{ bgcolor: "#1976d2", width: 40, height: 40 }}
                >
                  {comment.user?.fullname?.charAt(0).toUpperCase() || "A"}
                </Avatar>

                <div>
                  <p className="font-medium text-blue-600">
                    {comment.user?.fullname || "Anonymous"}
                  </p>
                  <p className="text-gray-700">{comment.content}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
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
