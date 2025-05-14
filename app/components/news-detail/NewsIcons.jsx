import React, { useState } from "react";
import useArticleBookmark from "@/app/hooks/useArticleBookmark";
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
  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex space-x-2">
        <Icons
          icon={<ShareIcon />}
          onClick={() => {
            const shareUrl = `${window.location.origin}/news/${article.slug}`;
            if (navigator.share) {
              navigator.share({
                title: article.title,
                text: article.excerpt,
                url: shareUrl,
              }).catch(console.error);
            } else {
              setModalOpen(true);
            }
          }}
        />
        <Icons icon={<CommentIcon />} onClick={() => {
          if (user) {
            setDrawerOpen(true)
          } else { toast.error("please logged in !") }
        }} />
      </div>
      <div className="flex space-x-2">

        <Icons icon={<PrintIcon />} onClick={() => window.print()} />
      </div>
      <CommentsDrawer open={drawerOpen} setOpen={setDrawerOpen} article={article} />
    </div>

  );
};

export default NewsIcons;
