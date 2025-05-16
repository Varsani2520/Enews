import React, { useState } from "react";
import Icons from "@/app/components/shared/Icons";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import PrintIcon from "@mui/icons-material/Print";
import CommentsDrawer from "./CommentDrawer";
import toast from "react-hot-toast";

import { useThemeContext } from "@/app/context/ThemeContext";
import { useAuth } from "@/app/context/AuthContext";

const NewsIcons = ({ article, title }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

   const { user } = useAuth();
  const { themeData } = useThemeContext();
  console.log("user", user);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/news/${article.slug}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: shareUrl,
        });

        // ✅ After successful native share, call the API
        await httpAxios.put(`/api/articles/${article._id}/share`);
      } else {
        setModalOpen(true);
      }
    } catch (err) {
      console.error("Share failed:", err);
      toast.error("Failed to share article");
    }
  };

  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex space-x-2">
        <Icons icon={<ShareIcon />} onClick={() => handleShare()} />
        <Icons
          icon={<CommentIcon />}
          onClick={() => {
            if (user) {
              setDrawerOpen(true);
            } else {
              toast.error("please logged in !");
            }
          }}
        />
      </div>
      <div className="flex space-x-2">

        <Icons icon={<PrintIcon />} onClick={() => window.print()} />
      </div>
      <CommentsDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        article={article}
      />
    </div>
  );
};

export default NewsIcons;
