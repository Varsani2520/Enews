"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { auth, db } from "@/app/utils/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import slugify from "slugify";
import Card1 from "../cards/Card1";
import { TravelSkeleton } from "./Skeleton";

const ReadLaterPage = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  const fetchBookmarks = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const querySnapshot = await getDocs(
        collection(db, `users/${user.email}/bookmark`)
      );
      const articles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data().article,
      }));
      console.log("book", articles);
      setBookmarkedArticles(articles);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

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
    <div className="p-6 max-w-5xl mx-auto">
      {loading ? (
        <div className="flex justify-center py-10">
          <TravelSkeleton />
        </div>
      ) : bookmarkedArticles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          {/* <img
          src="/empty-favorites.svg"
          alt="No favorites"
          className="w-40 h-40 mb-4"
        /> */}
          <Typography>No Bookmark articles yet.</Typography>
          <Button variant="contained" color="primary" className="mt-4" href="/">
            Explore Articles
          </Button>
        </div>
      ) : (
        <Grid container spacing={2}>
          {bookmarkedArticles.map((article) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={article.id}>
              <div className="relative h-full">
                <Link href={`/news/${slugify(article.headline.main)}`}>
                  <Card1
                    article={article}
                    category={article.section_name}
                    imageUrl={
                      article.multimedia?.[0]?.url
                        ? `https://www.nytimes.com/${article.multimedia[0].url}`
                        : "/fallback-image.jpg"
                    }
                    title={article.headline.main}
                    height="250px"
                  />
                </Link>
                <IconButton
                  onClick={() => removeBookmark(article.id)}
                  className="absolute top-2 right-2 text-red-500 bg-white rounded-full hover:bg-gray-200 transition"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ReadLaterPage;
