"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/utils/firebase";

const ReadLater = () => {
  const [user] = useAuthState(auth);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchBookmarks();
  }, [user]);

  const fetchBookmarks = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const querySnapshot = await getDocs(
        collection(db, `users/${user.email}/bookmark`)
      ); // ✅ Fixed path
      const data = querySnapshot.docs.map((doc) => doc.data());
      setBookmarks(data);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Bookmark Articles</h2>
      {bookmarks.length === 0 ? (
        <p>No Bookmark articles yet.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {bookmarks.map((article) => (
            <li key={article.id} className="bg-gray-100 p-4 rounded-lg">
              {article.article.headline.main}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReadLater;
