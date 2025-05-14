// hooks/useSingleArticle.ts
"use client";

import { useEffect, useState } from "react";
import { getArticleBasedonCategory } from "../service/collectionOfArticle";

export const useArticleCollection = (slug) => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchArticleBasedOnCategory = async () => {
            try {
                const response = await getArticleBasedonCategory(slug);
                setArticle(response.articles);
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchArticleBasedOnCategory();
    }, [slug]);

    return { article, loading };
};
