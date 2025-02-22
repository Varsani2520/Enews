"use client";
import { useParams } from "next/navigation";
import FavoritesPage from "../favorites/page";
import ReadLaterPage from "../read-later/page";
import ProfilePage from "../page";

const SelectedTabs = () => {
  const { selectTabs } = useParams();
  if (selectTabs == "favorites") return <FavoritesPage />;
  if (selectTabs == "bookmarks") return <ReadLaterPage />;
  if (selectTabs == "overview") return <ProfilePage />;

  return <div className="text-center py-10 text-gray-700">Page not found</div>;
};
export default SelectedTabs;
