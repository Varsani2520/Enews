"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  addFavorite,
  clearFavorites,
  getFavorites,
  removeFavorite,
} from "../service/favs";
import { useFavorites } from "../context/FavoritesContext"; // Use the context

export const useArticleLikes = (articleId) => {
  const { favorites, setFavorites } = useFavorites();  // Get the current favorites from context
  const [loading, setLoading] = useState(true);  // To manage the loading state

  // Fetch the user's favorite articles on mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavorites();  // Fetch favorites from the service
        setFavorites(response.data.favorites.articles || []);  // Update context with fetched favorites
      } catch (err) {
        toast.error("Failed to fetch favorites");
      } finally {
        setLoading(false);  // Stop loading when the fetch is complete
      }
    };

    fetchFavorites();
  }, [setFavorites]);  // Only run once when the component mounts

  // Check if a specific article is a favorite
  const isArticleFavorite = (articleId) => {
    return favorites.some((article) => article?._id === articleId);  // Return true if the article is in favorites
  };

  // Add an article to favorites
  const addToFavorites = async (articleId) => {
    try {
      await addFavorite(articleId);  // Call API to add to favorites
      setFavorites((prev) => [...prev, { _id: articleId }]);  // Update the favorites list in context
      toast.success("Added to favorites!");
    } catch (err) {
      toast.error("Failed to add to favorites");
    }
  };

  // Remove an article from favorites
  const removeFromFavorites = async (articleId) => {
    try {
      await removeFavorite(articleId);  // Call API to remove from favorites
      setFavorites((prev) => prev.filter((a) => a._id !== articleId));  // Remove the article from the context state
      toast.success("Removed from favorites");
    } catch (err) {
      toast.error("Failed to remove from favorites");
    }
  };

  // Toggle favorite status of an article
  const toggleFavorite = async (articleId) => {
    if (isArticleFavorite(articleId)) {
      await removeFromFavorites(articleId);  // If already a favorite, remove it
    } else {
      await addToFavorites(articleId);  // Otherwise, add it to favorites
    }
  };

  // Clear all favorites
  const clearAllFavorites = async () => {
    try {
      await clearFavorites();  // Call API to clear all favorites
      setFavorites([]);  // Clear the favorites list in context
      toast.success("All favorites cleared");
    } catch (err) {
      toast.error("Failed to clear favorites");
    }
  };

  return {
    favorites,  // Current list of favorites
    loading,  // Loading state for fetching favorites
    isArticleFavorite,  // Function to check if a specific article is a favorite
    addToFavorites,  // Function to add an article to favorites
    removeFromFavorites,  // Function to remove an article from favorites
    toggleFavorite,  // Function to toggle the favorite status
    clearAllFavorites,  // Function to clear all favorites
  };
};
