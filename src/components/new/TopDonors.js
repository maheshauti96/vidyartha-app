import { EmojiEventsOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

const TopDonors = ({ topDonors }) => {
  const [donors, setDonors] = useState();
  useEffect(() => {
    setDonors(topDonors)
  } , [])

  return (
    <>
      {donors && donors.length > 0 && (
        <div className="top-donors">
          <h3 className="title">
            <EmojiEventsOutlined />
            Top Donors
          </h3>
          <div className="donors-list">
            {donors.map((val, index) =>
              index < donors.num ? (
                <div className="donors">
                  <img
                    className="donor-img"
                    src="/new-assets/testimonial-user.jpeg"
                  />
                  <div>
                    <p className="amount">Rs. 1200</p>
                    <p className="user"> By Lorem Ipsum</p>
                  </div>
                </div>
              ) : null
            )}
          </div>

          <button
            className="view-all"
            onClick={() => {
              setDonors((prev) => {
                if (prev.num === 2) {
                  return { num: donorsList.length, clicked: true };
                } else {
                  return { num: 2, clicked: false };
                }
              });
            }}
          >
            View {donors.clicked ? "less" : "more"}
          </button>
        </div>
      )}
    </>
  );
};

export default TopDonors;
