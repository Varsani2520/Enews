import React, { useState, useCallback } from "react";
import { TextField, Button, Pagination, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/app/utils/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const CommentsSection = ({
  comments,
  onSubmitComment,
  currentPage,
  onPageChange,
  clickedArticle,
}) => {
  const [comment, setComment] = useState("");
  const [user] = useAuthState(auth); // Firebase user

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleSubmit = useCallback(async () => {
    if (comment.trim() === "") {
      alert("Please enter a comment.");
      return;
    }
    if (!user?.email) {
      console.error("User is not logged in");
      return;
    }

    try {
      // Define Firestore path: users/${user.email}/comments/${articleId}
      const commentDocRef = doc(firestore, `users/${user.email}/comments/${clickedArticle._id}`);

      // Add comment data to Firestore
      await setDoc(commentDocRef, {
        user: user?.displayName || "Anonymous", // Display name or "Anonymous"
        text: comment, // Comment text
        createdAt: Timestamp.fromDate(new Date()), // Timestamp of comment
        articleId: clickedArticle._id, // Reference to the article
      });

      // Update the local state with the new comment
      onSubmitComment({
        user: user?.displayName || "Anonymous",
        text: comment,
      });

      // Reset comment input field
      setComment("");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  }, [comment, user, clickedArticle, onSubmitComment]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl mb-4">Leave a Comment</h3>
      <TextField
        label="Your Comment"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={comment}
        onChange={handleCommentChange}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Comment
      </Button>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Comments
      </Typography>

      {comments && comments.length > 0 ? (
        comments.slice((currentPage - 1) * 5, currentPage * 5).map((comment, index) => (
          <div key={index} className="mb-4">
            <p>
              <strong>{comment.user}</strong>: {comment.text}
            </p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}

      {/* Pagination */}
      <Pagination
        count={Math.ceil(comments.length / 5)} // Display 5 comments per page
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
        sx={{ mt: 2 }}
      />
    </div>
  );
};

export default CommentsSection;
