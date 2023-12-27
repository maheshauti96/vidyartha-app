import React from "react";
import Header from "../../../src/components/new/Header";
import Footer from "../../../src/components/new/Footer";
import { useRouter } from "next/router";

const AboutUs = () => {
  const purpose = [
    {
      img: "/new-assets/purpose-1.svg",
      text: "Raise funds for making spiritual wisdom literature available in  school/college libraries",
    },
    {
      img: "/new-assets/purpose-2.svg",
      text: "Build a strong foundation of moral values, the ability to handle emotionally turbulent situations, strong  determination, and healthy habits.",
    },
    {
      img: "/new-assets/purpose-3.svg",
      text: "Encourage spiritual literature and",
    },
  ];
  const router = useRouter()
  let { orgCode } = router.query;
  return (
    <div className="about-us-page">
      <Header orgCode={orgCode} />
      <div className="about-us" style={{ marginTop: "7rem" }}>
        <h1>
          We at Vidyartha are trying to build a moral and good habitual
          foundation in children by donating spiritual wisdom literature
        </h1>
        <img className="main-img" src="/PVG_School.jpg" />

        <div className="purpose">
          <h2>What is the purpose of Vidyartha</h2>
          <div className="purpose-container">
            {purpose.map(({ img, text }) => (
              <div key = {img} className="purpose-item">
                <img src={img} />
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="description">
          <p className="desc-text">
            The Vidyartha is a <strong>crowdfunding platform</strong> where <strong>alumni can find their schools/colleges</strong> and raise funds to gift spiritual literature as
            gratitude for their schools/colleges. They can also <strong>share this
            campaign with other alumni</strong> to quickly complete the target.
          </p>
        </div>
      </div>
      <Footer orgCode={orgCode} />
    </div>
  );
};

export default AboutUs;
