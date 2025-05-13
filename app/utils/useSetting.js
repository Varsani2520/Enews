"use client";

import { useEffect, useState } from "react";
import { getSettings } from "../service/settings";


export const useSettings = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await getSettings();
                setSettings(response.data.webSettings);
             
            } catch (error) {
                console.log("errorr", error)
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return { settings, loading };
};