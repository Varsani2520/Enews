"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { getNews } from "@/app/utils/getNews";
import Card4 from "@/app/Reuse/Card4";
import Breadcumbs from "@/app/Reuse/Breadcumps";
import { useParams, useRouter } from "next/navigation";
import CardSkeleton, { NewsDetailSkeleton } from "@/app/Components/Skeleton";
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
import slugify from "slugify";
import { getHandleArticleClick } from "@/app/hooks/ArticleClick";

const NewsDetailPage = () => {
  const [clickedArticle, setClickedArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const { title } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const [user] = useAuthState(auth);

  const { isBookmark, toggleBookmark } = useArticleBookmark(clickedArticle);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articles = await getHandleArticleClick();
        const foundArticle = articles.find(
          (art) => slugify(art.headline.main) === title
        );
        if (foundArticle) {
          setClickedArticle(foundArticle);
          const response = await getNews(foundArticle.category);
          setRelatedArticles(response.docs);
        } else {
          console.error("No article found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching clicked article:", error);
      }
    };

    fetchArticle();
  }, [title]);

  if (!clickedArticle) {
    return <NewsDetailSkeleton />;
  }
  const articleTitle = clickedArticle.headline?.main;
  const articleUrl =
    typeof window !== "undefined" ? slugify(window.location.href) : "";

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
              <div className="bg-red-700 text-white text-xs md:text-lg font-semibold px-3 py-1 rounded-lg w-fit">
                {clickedArticle.section_name}
              </div>
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
            <div className="bg-red-700 text-white text-xs md:text-lg font-semibold px-3 py-1 rounded-lg mb-4">
              Related News
            </div>
            <div className="space-y-4">
              {relatedArticles.length > 0 ? (
                relatedArticles.map((article) => (
                  <Link
                    href={`/news/${slugify(article.headline.main)}`}
                    key={article._id}
                  >
                    <Card4
                      article={article}
                      category={article.section_name}
                      title={article.headline.main}
                      alt={article.headline.main}
                      imageUrl={
                        article.multimedia?.[0]?.url
                          ? `https://www.nytimes.com/${article.multimedia[0].url}`
                          : "/default-image.jpg"
                      }
                    />
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  No related articles found.
                </p>
              )}
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
      <DrawerContent
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Add Comment"
      >
        <CommentForm
          article={clickedArticle}
          user={user}
          key={clickedArticle._id}
        />
      </DrawerContent>
    </div>
  );
};

export default NewsDetailPage;
