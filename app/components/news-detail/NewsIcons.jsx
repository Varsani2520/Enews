import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/utils/firebase";
import useArticleBookmark from "@/app/hooks/useArticleBookmark";
import Icons from "@/app/components/shared/Icons";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PrintIcon from "@mui/icons-material/Print";

const NewsIcons = ({ article, title }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { isBookmark, toggleBookmark } = useArticleBookmark(article);

  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex space-x-2">
        <Icons
          icon={<ShareIcon />}
          onClick={() => {
            const shareUrl = `${window.location.origin}/news/${title}`;
            if (navigator.share) {
              navigator.share({
                title: article.headline.main,
                text: article.abstract,
                url: shareUrl,
              }).catch(console.error);
            } else {
              setModalOpen(true);
            }
          }}
        />
        <Icons icon={<CommentIcon />} onClick={() => setDrawerOpen(true)} />
      </div>
      <div className="flex space-x-2">
        <Icons icon={isBookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />} onClick={toggleBookmark} />
        <Icons icon={<PrintIcon />} onClick={() => window.print()} />
      </div>
    </div>
  );
};

export default NewsIcons;
