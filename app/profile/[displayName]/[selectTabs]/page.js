"use client";

import ReadLaterPage from "@/app/components/features/BookmarkPage";
import FavoritesPage from "@/app/components/features/FavoritePage";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const SelectedTabs = () => {
  const { selectTabs } = useParams();

  useEffect(() => {
    document.title = "Enews - Favorites";
  }, [selectTabs]);

  if (selectTabs == "favorites") return <FavoritesPage />;

  return <div className="text-center py-10 text-gray-700">Page not found</div>;
};
export default SelectedTabs;
