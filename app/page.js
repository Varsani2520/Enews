"use client";

import { useEffect } from "react";
import BreakingNews from "./components/sections/BreakingNews";
import Banner from "./components/shared/Banner";
import Heading from "./components/shared/Heading";
import PopularCards from "./components/sections/PopularNews";
import RecentNews from "./components/sections/RecentNews";
import Technology from "./components/sections/Technology";
import Travels from "./components/sections/Travels";
import LazyComponent from "./components/shared/LazyComponent";
import { useThemeContext } from "./context/ThemeContext";
export default function Home() {
  const {themeData}=useThemeContext()

  useEffect(() => {
    document.title = "Enews - Latest news & Updates";
  }, []);
  
  return (
    <main className="flex  flex-col  justify-between" style={{background:themeData.background}}>
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
      <LazyComponent component={PopularCards} />
      <Heading
        title={"Recent News"}
        subtitle={"Recent News Here"}
        buttonText={"View More"}
        link="/categories-news/recent"
      />
      <LazyComponent component={RecentNews} />
      <Heading
        title={"Technology"}
        subtitle={"Tech News Here"}
        buttonText={"View More"}
        link="/categories-news/technology"
      />
      <LazyComponent component={Technology} />
      <Heading
        title={"Travels"}
        subtitle={"Travels"}
        buttonText={"View More"}
        link="/categories-news/travel"
      />
      <LazyComponent component={Travels} />
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

      <LazyComponent component={BreakingNews} />
    </main>
  );
}
