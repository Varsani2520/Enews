import Image from "next/image";
import Weather from "./Components/Weather";
import Navigation from "./Components/Navigation";
import Banner from "./Reuse/Banner";
import Header from "./Components/Header";
import Heading from "./Reuse/Heading";
import PopularCards from "./Components/PopularNews";
import RecentNews from "./Components/RecentNews";
import Technology from "./Components/Technology";

export default function Home() {
  return (
    <main className="flex  flex-col  justify-between ">
      <Weather />
      <Navigation />
      <Header />
      <Banner
        logo={"/logo.png"}
        title="Stay informed,stay ahead with our daily news."
        buttonText={"Buy Now"}
      />
      <Heading
        title={"Popular News"}
        subtitle={"Popular News Here"}
        buttonText={"View More"}
      />
      <PopularCards />
      <Banner
        logo={"/logo.png"}
        title="News that matters,delivered daily."
        buttonText={"Buy Now"}
      />
      <Heading
        title={"Recent News"}
        subtitle={"Recent News Here"}
        buttonText={"View More"}
      />
      <RecentNews />
      <Technology />
    </main>
  );
}
