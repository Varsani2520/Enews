import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";

export const addHandleArticleClick = async (article) => {
  try {
    if (!article?.headline?.main) return; // Ensure headline.main exists

    // Check if the article already exists in Firestore
    const q = query(
      collection(db, "clickArticle"),
      where("headline.main", "==", article.headline.main)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If article exists, update the click count
      const docRef = querySnapshot.docs[0].ref;
      const currentClicks = querySnapshot.docs[0].data().clicks || 0;

      await updateDoc(docRef, {
        clicks: currentClicks + 1, // Increment click count
      });
      console.log("Article click count updated.");
    } else {
      // If article doesn't exist, create a new entry with click count 1
      await addDoc(collection(db, "clickArticle"), {
        ...article,
        clicks: 1,
      });
      console.log("New article stored in Firestore.");
    }
  } catch (error) {
    console.error("Error adding article to Firestore:", error);
  }
};

// Fetch all clicked articles
export const getHandleArticleClick = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "clickArticle"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error retrieving articles from Firestore:", error);
    return [];
  }
};
