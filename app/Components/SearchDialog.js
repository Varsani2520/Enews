'use client'
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  InputBase,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import { getNews } from '@/app/utils/getNews';
import Card4 from '../Reuse/Card4';

const SearchDialog = ({ open, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await getNews(searchQuery);
      setResults(response.docs);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle>
        Search
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div className="flex items-center mb-4">
          <InputBase
            autoFocus
            fullWidth
            placeholder="Enter your search query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-lg flex-1"
          />
          <IconButton onClick={handleSearch} aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {results.map((article) => (
              <Card4
                key={article._id}
                title={article.headline.main}
                category={article.section_name}
                imageUrl={`https://www.nytimes.com/${
                  article.multimedia?.[0]?.url || '/placeholder.jpg'
                }`}
              />
            ))}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchDialog;
