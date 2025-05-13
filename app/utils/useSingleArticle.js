// hooks/useSingleArticle.ts
"use client";

import { useEffect, useState } from "react";
import { getSingleArticle } from "../service/singleArticle";

export const useSingleArticles = (slug) => {
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchSingleArticle = async () => {
            try {
                const response = await getSingleArticle(slug);
                console.log("single", response.article)
                setArticle(response.article);
                setRelatedArticles(response.relatedArticles)
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchSingleArticle();
    }, [slug]);

    return { article, relatedArticles, loading };
};
