"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { auth, db } from "@/app/utils/firebase";
import DeleteIcon from "@mui/icons-material/Delete";

const ReadLaterPage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    fetchBookmarks();
  }, [user]);

  const fetchBookmarks = async () => {
    if (!user) return;

    try {
      const querySnapshot = await getDocs(
        collection(db, `users/${user.email}/bookmark`)
      );
      const articles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data().article,
      }));
      setBookmarkedArticles(articles);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  const removeBookmark = async (articleId) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, `users/${user.email}/bookmark/${articleId}`));
      setBookmarkedArticles((prev) =>
        prev.filter((article) => article.id !== articleId)
      );
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Read Later Articles</h2>
      {bookmarkedArticles.length === 0 ? (
        <p className="text-gray-500">No saved articles yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookmarkedArticles.map((article) => (
            <li key={article.id} className="bg-gray-100 p-4 rounded-lg">
              <Link href={`/news/${article.headline.main}`}>
                {article.headline?.main}
              </Link>

              <DeleteIcon
                onClick={() => removeBookmark(article.id)}
                sx={{ cursor: "pointer" }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReadLaterPage;
