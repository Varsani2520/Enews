"use client";

import { useEffect, useState } from "react";
import { getSearch } from "../service/search";

export const useSearch = (slug) => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchSearchNews = async () => {
        try {
            const response = await getSearch(slug);
            console.log("response search", response.articles)
            setNews(response.articles)
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!slug) return;
        fetchSearchNews();
    }, [slug]);

    return { news, loading };
};
