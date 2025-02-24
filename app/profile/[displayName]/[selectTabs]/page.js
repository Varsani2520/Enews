"use client";
import ReadLaterPage from "@/app/Components/BookmarkPage";
import FavoritesPage from "@/app/Components/FavoritePage";
import { useParams } from "next/navigation";


const SelectedTabs = () => {
  const { selectTabs } = useParams();
  if (selectTabs == "favorites") return <FavoritesPage />;
  if (selectTabs == "bookmarks") return <ReadLaterPage />;

  return <div className="text-center py-10 text-gray-700">Page not found</div>;
};
export default SelectedTabs;
