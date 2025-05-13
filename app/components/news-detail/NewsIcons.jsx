import React, { useState } from "react";
import useArticleBookmark from "@/app/hooks/useArticleBookmark";
import Icons from "@/app/components/shared/Icons";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PrintIcon from "@mui/icons-material/Print";
import CommentsDrawer from "./CommentDrawer";
import toast from "react-hot-toast";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { httpAxios } from "@/app/utils/httpAxios";

const NewsIcons = ({ article, title }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isBookmark, toggleBookmark } = useArticleBookmark(article);
  const user = useCurrentUser();
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
        await httpAxios.put(`/articles/${article._id}/share`);
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
        <Icons
          icon={isBookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          onClick={toggleBookmark}
        />
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
