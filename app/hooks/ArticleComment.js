import { addDoc, getDocs, orderBy, query, where } from "firebase/firestore";
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
    const commentRef = collection(db, `articles/${articleId}/comments`);
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
export const getCommentsForArticle = async (article) => {
  if (!article || !article._id) return [];

  try {
    const articleId = article._id.replace(/[^a-zA-Z0-9-_]/g, "_");
    const commentRef = collection(db, `articles/${articleId}/comments`);
    const q = query(commentRef, orderBy("timestamp", "desc"));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};
