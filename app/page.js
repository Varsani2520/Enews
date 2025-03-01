import Banner from "./Reuse/Banner";
import Heading from "./Reuse/Heading";
import PopularCards from "./Components/PopularNews";
import RecentNews from "./Components/RecentNews";
import Technology from "./Components/Technology";
import Travels from "./Components/Travels";
import BreakingNews from "./Components/BreakingNews";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>ENews - Latest Breaking News & Updates</title>
        <meta
          name="description"
          content="Stay updated with breaking news, trending articles, and in-depth stories on politics, technology, entertainment, business, health, and more."
        />
        <meta
          name="keywords"
          content="ENews, breaking news, latest updates, technology, politics, business, sports, health"
        />
        <meta name="author" content="ENews Team" />
        <meta property="og:image" content="/logo.png" />
        <meta
          property="og:title"
          content="ENews - Latest Breaking News & Updates"
        />
        <meta
          property="og:description"
          content="Stay informed with ENews, your source for daily breaking news and in-depth articles."
        />
        <meta property="og:url" content="https://enews-varsani.vercel.app" />
      </Head>

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
    </>
  );
}
