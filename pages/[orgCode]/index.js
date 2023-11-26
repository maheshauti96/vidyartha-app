import React, { useEffect } from "react";
import Header from "../../src/components/new/Header";
import LandingPageForm from "../../src/components/new/LandingPageForm";
import Analytics from "../../src/components/new/Analytics";
import FundraiserComponent from "../../src/components/new/FundraiserCarousel";
import DonationSteps from "../../src/components/new/DonationSteps";
import NewsAndStoriesCarousel from "../../src/components/new/NewsAndStoriesCarousel";
import TestimonialCarousel from "../../src/components/new/TestimonialCarousel";
import FAQ from "../../src/components/new/FAQ";
import Footer from "../../src/components/new/Footer";
import Head from "next/head";

const newLandingPage = ({ orgCode }) => {

  return (
    <>
      
      <div style={{ fontFamily: "Inter", width: "100vw" }}>
        <div>
          <Header orgCode={orgCode} />
        </div>
        <img className="landingpage-banner-image" src="/banner-bg-original.png" />
        <LandingPageForm orgCode={orgCode} />
        <Analytics orgCode={orgCode} />
        <FundraiserComponent orgCode={orgCode} />
        <DonationSteps orgCode={orgCode} />
        {/* <NewsAndStoriesCarousel />
        <TestimonialCarousel /> */}
        <FAQ orgCode={orgCode} />

        <Footer orgCode={orgCode} />
      </div>
    </>
  );
};

export default newLandingPage;

export async function getStaticPaths() {
  try {
    const response = await fetch(`https://api.vidyartha.org/shastradaan/admin/org`)
    const data = await response.json()
    if (data?.content && data?.content?.length) {
      const paths = data.content.map(i => {
            return {
              params: {
                orgCode: i.id
              }
            }
          })
      return { paths, fallback: false };
    } else {
      return {
        paths: [
            {
                params: {
                  orgCode: 'NVCCPUN'
                }
            }
        ],
        fallback: false
  };
    }
  } catch(err){
    console.log("getStaticPaths", err)
  }
}

export async function getStaticProps({ params: { orgCode } }) {
  return {
      props: {
        orgCode
      }
  };
}