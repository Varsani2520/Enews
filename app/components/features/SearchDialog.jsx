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
import { getNews } from "@/app/utils/getNews";
import Link from "next/link";
import slugify from "slugify";
import Card4 from "../cards/Card4";

const SearchDialog = ({ open, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const response = await getNews(searchQuery);
      setResults(response.docs || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="flex justify-between items-center border-b pb-2">
        <span className="text-xl font-semibold">Search</span>
        <IconButton
          onClick={onClose}
          className="text-gray-500 hover:text-red-500"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
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
        ) : searched && results.length === 0 ? (
          <p className="text-gray-500 text-center w-full mt-4">
            No results found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
            {results.map((article) => (
              <Link
                key={article}
                href={`/news/${slugify(article.headline.main)}`}
              >
                <Card4
                  article={article}
                  key={article._id}
                  title={article.headline.main}
                  category={article.section_name}
                  imageUrl={`https://www.nytimes.com/${article.multimedia?.[0]?.url}`}
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
