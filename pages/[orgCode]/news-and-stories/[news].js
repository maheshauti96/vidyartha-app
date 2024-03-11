import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../../src/components/new/Header";
import { ArrowBack } from "@material-ui/icons";
import Link from "next/link";
import Footer from "../../../src/components/new/Footer";
import data from "./data.json";

const News = () => {
  const [school, setSchool] = useState();
  const router = useRouter();
  const { news } = router.query;

  useEffect(() => {
    setSchool(data[news]);
  }, [router]);
  return (
    <div style={{ fontFamily: "Inter" }}>
      <Header />
      {school && <div className="news-story-item" style={{ marginTop: "7rem" }}>
        <Link href="/news-and-stories">
          <ArrowBack />
        </Link>
        <div>
          <h1 className="news-heading">{school.name}</h1>
          
            <div className="image-gallery">
                {school.images.map((imageSrc) => (
                <div key ={imageSrc}>
                    <img src={`/news-and-stories-images/${news}/${imageSrc}`} />
                </div>
                ))}
            </div>
          
        </div>
      </div>}
      <Footer />
    </div>
  );
};

export default News;
