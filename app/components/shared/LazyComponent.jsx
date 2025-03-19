"use client";
import React, { useState, useEffect, useRef } from "react";

const LazyComponent = ({ component: Component }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once loaded
        }
      },
      { threshold: 0.2 } // Load when 20% visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className="my-5">{isVisible ? <Component /> : null}</div>;
};

export default LazyComponent;
