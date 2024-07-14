import Image from "next/image";
import Weather from "./Components/Weather";
import Navigation from "./Components/Navigation";
import Banner from "./Reuse/Banner";
import Header from "./Components/Header";
import Heading from "./Reuse/Heading";
import PopularCards from "./Components/PopularCards";

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
        buttonText={"Biew More"}
      />
      <PopularCards />
    </main>
  );
}
