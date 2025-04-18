"use client";
import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/utils/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import slugify from "slugify";
import { Grid, Typography, IconButton, Button } from "@mui/material";
import { TravelSkeleton } from "./Skeleton";
import Card1 from "../cards/Card1";
import CustomPagination from "../shared/CustomPagination";


const FavoritesPage = () => {
  const [user] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Change as needed

  const fetchFavorites = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const querySnapshot = await getDocs(
        collection(db, `users/${user.email}/favorites`)
      );
      const favs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data().article,
      }));
      setFavorites(favs);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const removeFavorite = async (articleId) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, `users/${user.email}/favorites/${articleId}`));
      setFavorites((prev) =>
        prev.filter((article) => article.id !== articleId)
      );
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  // Pagination Logic: Slice articles for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFavorites = favorites.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {loading ? (
        <div className="flex justify-center py-10">
          <TravelSkeleton />
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <Typography>No favorite articles yet.</Typography>
          <Button variant="contained" color="primary" className="mt-4" href="/">
            Explore Articles
          </Button>
        </div>
      ) : (
        <>
          <Grid container spacing={2}>
            {currentFavorites.map((article) => (
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
                    onClick={() => removeFavorite(article.id)}
                    className="absolute top-2 right-2 text-red-500 bg-white rounded-full hover:bg-gray-200 transition"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Grid>
            ))}
          </Grid>

          {/* Pagination Component */}
          <CustomPagination
            totalItems={favorites.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
