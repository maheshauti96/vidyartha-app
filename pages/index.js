import React, { useEffect } from "react";
import Header from "../src/components/new/Header";
import LandingPageForm from "../src/components/new/LandingPageForm";
import Analytics from "../src/components/new/Analytics";
import FundraiserComponent from "../src/components/new/FundraiserCarousel";
import DonationSteps from "../src/components/new/DonationSteps";
import NewsAndStoriesCarousel from "../src/components/new/NewsAndStoriesCarousel";
import TestimonialCarousel from "../src/components/new/TestimonialCarousel";
import FAQ from "../src/components/new/FAQ";
import Footer from "../src/components/new/Footer";
import Head from "next/head";
import { useRouter } from "next/router";

const newLandingPage = () => {
  let router = useRouter()
  console.log(router.query)
  return (
    <>
      <Head>
        <title>Vidyartha</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLAaadQJ2iA8m6Nq2KGAQXwL9B6CwVvZ8&libraries=places&callback=Function.prototype"></script>
        <meta
          property="title"
          content="Vidyartha | Help Us To Donate Books For Your School Library!"
          key="title"
        />
        <meta
          name="description"
          content="In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically. In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically."
        />
        <meta property="image" content="/banner-bg-original.png" />
        <meta
          property="og:title"
          content="Vidyartha | Help Us To Donate Books For Your School Library!"
          key="title"
        />
        <meta
          name="og:description"
          content="In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically. In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically."
        />
        <meta property="og:image" content="/banner-bg-original.png" />
      </Head>
      <div style={{ fontFamily: "Inter", width: "100vw" }}>
        <div>
          <Header />
        </div>
        <img className="landingpage-banner-image" src="/banner-bg-original.png" />
        <LandingPageForm />
        <Analytics />
        <FundraiserComponent />
        <DonationSteps />
        {/* <NewsAndStoriesCarousel />
        <TestimonialCarousel /> */}
        <FAQ />

        <Footer />
      </div>
    </>
  );
};

export default newLandingPage;
