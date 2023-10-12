import {
  Box,
  LinearProgress,
  Slide,
  Slider,
  linearProgressClasses,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import styled from "@material-ui/core";
import CarouselComponent from "./CarouselComponent";
import Link from "next/link";
import { fetchTopFundraisers } from "../../services/service";

const FundraiserComponent = () => {
  let carouselList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [content, setContent] = useState([]);
  async function setFundraisers(){
    let response = await fetchTopFundraisers();
    setContent(response.content)
  }
  useEffect(() => {
    setFundraisers()
  }, []);

  return (
    <>
      {content.length > 0 && (
        <div className="fundraiser-component">
          <h3 className="section-title">Our Top Fundraisers</h3>
          <CarouselComponent>
            {content.map(({id , name , address , collected , donorCount}, index) => (
              <div key={id} className="fundraiser-carousel-item">
                {/* <div className="images">
                  <img
                    className="main-img"
                    src="./new-assets/placeholder.png"
                  />
                </div> */}
                <div style={{ width: "80%" }}>
                  <h3 className="name">{name}</h3>
                  <p className="address">{address}</p>
                </div>
                <div className="progress" style={{ width: "80%" }}>
                  <div>
                    <p>Total collected : {collected}</p>
                    {/* <Box sx={{ width: "80%" }}>
                      <LinearProgress
                        style={{
                          height: "12px",
                          borderRadius: "6px",
                          backgroundColor: "#fff",
                          outline: "1px solid black",
                        }}
                        variant="determinate"
                        value={70}
                      />
                    </Box> */}
                  </div>
                  <div>
                    <p>Total Donors : {donorCount}</p>
                    {/* <Box sx={{ width: "80%" }}>
                      <LinearProgress
                        style={{
                          height: "12px",
                          borderRadius: "6px",
                          backgroundColor: "#fff",
                          outline: "1px solid black",
                        }}
                        variant="determinate"
                        value={70}
                      />
                    </Box> */}
                  </div>
                </div>
                <div className="donate-btn">
                  <Link href={`/new/funds/${id}`}>Donate</Link>
                </div>
              </div>
            ))}
          </CarouselComponent>
        </div>
      )}
    </>
  );
};

export default FundraiserComponent;
