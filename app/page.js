"use client";

import { useEffect } from "react";
import BreakingNews from "./Components/sections/BreakingNews";
import Banner from "./components/shared/Banner";
import Heading from "./components/shared/Heading";
import PopularCards from "./components/sections/PopularNews";
import RecentNews from "./components/sections/RecentNews";
import Technology from "./components/sections/Technology";
import Travels from "./components/sections/Travels";
export default function Home() {

  useEffect(() => {
    document.title = "Enews - Latest news & Updates";
  }, []);
  
  return (
    <main className="flex  flex-col  justify-between bg-gray-200">
      <Banner
        logo={"/logo.png"}
        title="Stay informed,stay ahead with our daily news."
        href="/categories-news/popular"
      />
      <div className="hidden md:block">
        <Heading
          title={"Popular News"}
          subtitle={"Popular News Here"}
          buttonText={"View More"}
          link="/categories-news/popular"
        />
      </div>
      <PopularCards />
      <Heading
        title={"Recent News"}
        subtitle={"Recent News Here"}
        buttonText={"View More"}
        link="/categories-news/recent"
      />
      <RecentNews />
      <Heading
        title={"Technology"}
        subtitle={"Tech News Here"}
        buttonText={"View More"}
        link="/categories-news/technology"
      />
      <Technology />
      <Heading
        title={"Travels"}
        subtitle={"Travels"}
        buttonText={"View More"}
        link="/categories-news/travel"
      />
      <Travels />
      <Banner
        logo={"/logo.png"}
        title="Stay informesd with us- 24/7 news updates"
        href="/categories-news/breaking"
      />
      <Heading
        title={"Breaking News"}
        subtitle={"Breaking News Here"}
        buttonText={"View More"}
        link="/categories-news/breaking"
      />

      <BreakingNews />
    </main>
  );
}
