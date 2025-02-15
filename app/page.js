import Banner from "./Reuse/Banner";
import Heading from "./Reuse/Heading";
import PopularCards from "./Components/PopularNews";
import RecentNews from "./Components/RecentNews";
import Technology from "./Components/Technology";
import Travels from "./Components/Travels";
import BreakingNews from "./Components/BreakingNews";

export default function Home() {
  return (
    <main className="flex  flex-col  justify-between bg-gray-200">
      <Banner
        logo={"/logo.png"}
        title="Stay informed,stay ahead with our daily news."
        href="/categories-news/popular"
      />
      <Heading
        title={"Popular News"}
        subtitle={"Popular News Here"}
        buttonText={"View More"}
        link="/categories-news/popular"
      />
      <PopularCards />
      <Heading
        title={"Recent News"}
        subtitle={"Recent News Here"}
        buttonText={"View More"}
        link="/categories-news/recent"
      />
      <RecentNews />
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
