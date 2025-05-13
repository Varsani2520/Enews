"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
  InputBase,
  Button
} from "@mui/material";
import { Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material";
import Link from "next/link";
import slugify from "slugify";
import Card4 from "../cards/Card4";
import { useThemeContext } from "@/app/context/ThemeContext";
import { useSearch } from "@/app/utils/useSearch";

const SearchDialog = ({ open, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const { news, loading } = useSearch(searchQuery)
  const { themeData } = useThemeContext()

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearched(true);

  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="flex justify-between items-center border-b pb-2" sx={{ background: themeData?.primary, color: themeData?.navText }}>
        <span className="text-xl font-semibold">Search News</span>
        <IconButton
          onClick={onClose}
          className=" hover:text-red-500" style={{ color: themeData?.navText }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ background: themeData?.background }}>
        <div className="flex items-center bg-gray-100 p-2 rounded-lg">
          <InputBase
            autoFocus
            fullWidth
            placeholder="Enter your search query..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 text-gray-700 outline-none"
          />
          <Button
            onClick={handleSearch}
            variant="contained"
            color="error"
            className="ml-2"
            disabled={loading}
          >
            <SearchIcon className="text-white" />
          </Button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : searched && news.length === 0 ? (
          <p className="text-gray-500 text-center w-full mt-4">
            No results found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
            {news.map((article) => (
              <Link
                key={article}
                href={`/news/${slugify(article.slug)}`}
              >
                <Card4
                  article={article}
                  key={article?._id}
                  title={article.title}
                  category={article.category?.name}
                  imageUrl={article.image_url}
                />
              </Link>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
