"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/app/utils/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const ReadLaterPage = () => {
  const [user] = useAuthState(auth);
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchReadLater = async () => {
      const q = query(collection(db, `users/${user.email}/readLater`));
      const querySnapshot = await getDocs(q);
      const articles = querySnapshot.docs.map(doc => doc.data());
      setSavedArticles(articles);
    };

    fetchReadLater();
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Read Later</h2>
      {savedArticles.length === 0 ? (
        <p>No saved articles.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {savedArticles.map((article, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg">{article.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReadLaterPage;
