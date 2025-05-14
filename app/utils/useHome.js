// context/HomeContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getHome } from "@/app/service/home";

const HomeContext = createContext(null);

export const HomeProvider = ({ children }) => {
    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHome = async () => {
            try {
                const response = await getHome();
                setHomeData(response);
            } catch (error) {
                console.error("Error fetching home data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHome();
    }, []);

    return (
        <HomeContext.Provider value={{ homeData, loading }}>
            {children}
        </HomeContext.Provider>
    );
};

export const useHomeContext = () => useContext(HomeContext);
