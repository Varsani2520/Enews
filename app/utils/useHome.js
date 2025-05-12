"use client";

import { useEffect, useState } from "react";
import { getHome } from "../service/home";

export const useHomes = () => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [visited, setVisited] = useState(false);

    const fetchHome = async () => {
        try {
            const response = await getHome();
            setNews(response)
            setVisited(true);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchHome();
    }, [!visited]);

    return { news, loading };
};
