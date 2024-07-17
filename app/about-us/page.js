import React from "react";
import Breadcumbs from "../Reuse/Breadcumps";
import { Container } from "@mui/material";

const AboutPage = () => {
  return (
    <div className="bg-gray-200">
      <Breadcumbs title="About Us" />
      <Container maxWidth="xl">
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-4">About Us:</h1>
          <p className="text-lg">
            Most people wouldn&apos;t even consider getting a physical morning
            newspaper anymore, so we depend on digital sources for our news.
            Finding an app that helps you get the news you want in a timely
            manner is essential.
          </p>
          <br />
          <p className="text-lg">
            Now all are in your handy. The app contains so many popular
            categories of news. Such as breaking news, top news, travels,
            sports, health, entertainment, world, etc. You can read, bookmark,
            like, comment, and share the news with others.
          </p>
          <h1 className="text-2xl font-bold mb-4">About Our Company:</h1>
          <p className="text-lg">
            Our company provides multi-technology services with a multi-skilled
            and highly competent workforce and strong global presence.
          </p>
          <br />
          <p className="text-lg">
            Our motto is to help the customer expand their business with the help of
            technology. Yes, we aren&apos;t alone, we are a team of developers &amp;
            technology lovers who are enthusiastic, passionate, skilled,
            creative, multi-talented, ready to strive, helpful &amp; always there to
            support our lovable clients, who are an integral part of our team.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
