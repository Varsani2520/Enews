import { addDoc, getDocs, query, where } from "firebase/firestore";
import { collection, db } from "../utils/firebase";
import toast from "react-hot-toast";
// add comment to firestore
export const createCommnet = async (article, user, commentText) => {
  try {
    if (!user || !user.email) throw new Error("User is not authenticated");
    if (!article || !article._id) throw new Error("Invalid article data");
    if (!commentText) throw new Error("comment text is required");

    // Generate a safe firestore document ID
    const articleId = article._id.replace(/[^a-zA-Z0-9-_]/g, "_");

    // Firestore document reference
    const commentRef = collection(db, "comments");
    // save comment to firestore
    await addDoc(commentRef, {
      email: user.email,
      articleId,
      commentText,
      timestamp: new Date().toISOString(),
    });
    toast.success("Comment Added!");
    console.log(article, user, commentText, "comments");
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};

// Fetch comments for an article
export const getComment = async (article, user) => {
  try {
    if (!article || !article._id) throw new Error("Invalid article data");

    const articleId = article._id.replace(/[^a-zA-Z0-9-_]/g, "_");

    const commentRef = collection(db, "comments");
    const q = query(commentRef, where("articleId", "==", articleId));
    const querySnapshot = await getDocs(q);

    const comments = querySnapshot.docs.map((doc) => doc.data());
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};
