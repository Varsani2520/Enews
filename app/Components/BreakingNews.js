'use client';

import React, { useEffect, useState } from 'react';
import { getNews } from '../utils/getNews';
import { Container, Grid, Button } from '@mui/material';
import Card2 from '../Reuse/Card2';
import Card3 from '../Reuse/Card3';
import Link from 'next/link';
import CardSkeleton from './Skeleton';

const Technology = () => {
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await getNews('videos');
                setArticles(response.docs);
                console.log('technology', response);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? Math.max(0, articles.length - 4) : prevIndex - 3
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 3 >= articles.length ? 0 : prevIndex + 3
        );
    };

    if (articles.length === 0) {
        return <CardSkeleton />; // Show a loading indicator while fetching data
    }

    // Ensure there are at least 4 articles to display
    const currentArticles = articles.slice(currentIndex, currentIndex + 4);

    return (
        <Container maxWidth="xl" sx={{ marginY: '5%' }}>
            <Grid container spacing={3}>
                {/* Left Side - Big Card */}
                <Grid item xs={12} md={3}>
                    <Link
                        href={`/news/${encodeURIComponent(currentArticles[0]?.headline?.main)}`}
                    >
                        <Card2
                            category={currentArticles[0]?.section_name}
                            title={currentArticles[0]?.headline?.main}
                            imageUrl={`https://www.nytimes.com/${
                                currentArticles[0]?.multimedia?.[0]?.url || '/placeholder.jpg'
                            }`}
                            height="518px"
                        />
                    </Link>
                </Grid>

                {/* Right Side - Three Smaller Cards */}
                <Grid item xs={12} md={9}>
                    <Grid container spacing={3} style={{ height: '100%' }}>
                        {currentArticles.slice(1).map((article, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Link
                                    href={`/news/${encodeURIComponent(article.headline.main)}`}
                                >
                                    <Card3
                                        category={article.section_name}
                                        title={article.headline.main}
                                        imageUrl={`https://www.nytimes.com/${
                                            article.multimedia?.[0]?.url || '/placeholder.jpg'
                                        }`}
                                        height="100%"
                                        width="100%"
                                    />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                        alignItems="center"
                        style={{ marginTop: '20px' }}
                    >
                        <Grid item>
                            <Button
                                onClick={handlePrev}
                                variant="contained"
                                sx={{ background: '#ef4444' }}
                            >
                                Prev
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={handleNext}
                                variant="contained"
                                sx={{ background: '#ef4444' }}
                            >
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Technology;
