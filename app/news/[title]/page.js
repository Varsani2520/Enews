"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { getNews } from "@/app/utils/getNews";
import Card4 from "@/app/Reuse/Card4";
import Breadcumbs from "@/app/Reuse/Breadcumps";
import { useParams, useRouter } from "next/navigation";
import CardSkeleton from "@/app/Components/Skeleton";
import Link from "next/link";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PrintIcon from "@mui/icons-material/Print";
import Icons from "@/app/Reuse/Icons";
import ShareModal from "@/app/Models/ShareModal";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/utils/firebase";
import DrawerContent from "@/app/Models/useDrawer";
import useArticleBookmark from "@/app/hooks/ArticleBookmark";
import CommentForm from "@/app/Components/CommentSection";

const NewsDetailPage = () => {
  const [clickedArticle, setClickedArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const { title } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const [user] = useAuthState(auth);

  const storedArticle = localStorage.getItem("clickedArticle");
  const parsedArticle = storedArticle ? JSON.parse(storedArticle) : null;
  const { isBookmark, toggleBookmark } = useArticleBookmark(parsedArticle);

  useEffect(() => {
    if (storedArticle) {
      const parsedArticle = JSON.parse(storedArticle);
      setClickedArticle(parsedArticle);
      getNews(parsedArticle.category)
        .then((response) => setRelatedArticles(response.docs))
        .catch((error) =>
          console.error("Error fetching related articles:", error)
        );
    } else {
      console.error("No article found in localStorage.");
    }
  }, [storedArticle]);

  if (!clickedArticle) {
    return <CardSkeleton />;
  }
  const articleTitle = clickedArticle.headline.main;
  const articleUrl = encodeURIComponent(window.location.href);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${articleUrl}&text=${articleTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${articleTitle}%20-%20${articleUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${articleUrl}&title=${articleTitle}`,
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Breadcumbs heading={title} />
      <Container maxWidth="xl" sx={{ mt: "2%" }}>
        <Grid container spacing={3}>
          {/* Left Side - Display Big Image */}
          <Grid item xs={12} md={8}>
            <div className="mb-4">
              <p className="text-white bg-red-700 px-2 w-fit rounded-md">
                {clickedArticle.section_name}
              </p>
              <h1 className="text-3xl font-bold mt-1 text-[#1a2e51]">
                {clickedArticle.headline.main}
              </h1>
              <p className="text-gray-500 mt-1">
                {clickedArticle.byline?.original} •{" "}
                {new Date(clickedArticle.pub_date).toLocaleDateString()}
              </p>
            </div>
            {/* left side share and comment icon and right side of img read later and print icon */}
            {/* Icons Section (Share, Comment, Read Later, Print) */}
            <div className="flex justify-between items-center my-4">
              <div className="flex space-x-2">
                <Icons
                  icon={<ShareIcon />}
                  sx={{ cursor: "pointer" }}
                  onClick={() => setModalOpen(true)}
                />
                <Icons
                  icon={<CommentIcon />}
                  sx={{ cursor: "pointer" }}
                  onClick={() => setDrawerOpen(true)}
                />
              </div>
              <div className="flex space-x-2">
                <Icons
                  icon={isBookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  sx={{
                    cursor: "pointer",
                    color: isBookmark ? "primary" : "inherit",
                  }}
                  onClick={toggleBookmark}
                  aria-label={isBookmark ? "Remove Bookmark" : "Add Bookmark"}
                />
                <button
                  onClick={() =>
                    router.push(`/profile/${user?.displayName}/read-later`)
                  }
                  className="text-gray-600 hover:underline"
                >
                  Read Later
                </button>
                <Icons
                  icon={<PrintIcon />}
                  onClick={() => window.print()}
                  sx={{ cursor: "pointer" }}
                />
              </div>
            </div>
            <img
              src={`https://www.nytimes.com/${clickedArticle.multimedia?.[0]?.url}`}
              alt={clickedArticle.headline_main}
              className="w-full h-auto rounded-lg shadow-lg mb-6"
            />
            {/* Lead Paragraph */}
            {clickedArticle.lead_paragraph && (
              <p className="text-gray-700 leading-7 mb-4">
                {clickedArticle.lead_paragraph}
              </p>
            )}
            {/* Abstract */}
            {clickedArticle.abstract && (
              <p className="text-gray-500 italic mb-4">
                {clickedArticle.abstract}
              </p>
            )}
            {/* Keywords */}
            {clickedArticle.keywords && clickedArticle.keywords.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Keywords:</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {clickedArticle.keywords.map((keyword, index) => (
                    <li key={index}>{keyword.value}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* Full Article Link */}
            <div className="mt-4 text-blue-500">
              <a
                href={clickedArticle.web_url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Read the full article on The New York Times
              </a>
            </div>{" "}
          </Grid>
          {/* Right Side - Display Related Articles */}
          <Grid item xs={12} md={4}>
            <h2 className="text-2xl  mb-4 bg-red-700 text-center text-white px-2 rounded-lg">
              Related News
            </h2>
            <div className="space-y-4">
              {relatedArticles.map((article) => (
                <Link href={`/news/${article.headline.main}`} key={article._id}>
                  {" "}
                  <Card4
                    article={article}
                    category={article.section_name}
                    title={article.headline.main}
                    alt={article.headline.main}
                    imageUrl={`https://www.nytimes.com/${
                      article.multimedia?.[0]?.url || "/placeholder.jpg"
                    }`}
                  />
                </Link>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
      <ShareModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        shareLinks={shareLinks}
      />
      {/* Comments Drawer */}
      <DrawerContent open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <CommentForm
          article={parsedArticle}
          user={user}
          key={parsedArticle._id}
        />
      </DrawerContent>
    </div>
  );
};

export default NewsDetailPage;
