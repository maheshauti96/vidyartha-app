import { EmojiEventsOutlined } from "@material-ui/icons";
import React, { useState } from "react";

const TopDonors = ({ topDonors }) => {
  const [showAll, setShowAll] = useState(false); // state to toggle between show more and show less

  const displayedDonors = showAll ? topDonors : topDonors.slice(0, 2); // Show first 2 or all donors based on state

  return (
    <>
      {topDonors && topDonors.length > 0 && (
        <div className="top-donors">
          <h3 className="title">
            <EmojiEventsOutlined />
            Top Donors
          </h3>
          <div className="donors-list">
            {displayedDonors.map((donor, index) =>
              donor ? (
                <div key={index} className="donors"> {/* Added key for list rendering */}
                  <img
                    className="donor-img"
                    src="/new-assets/testimonial-user.jpeg"
                    alt="Donor"
                  />
                  <div>
                    <p className="amount"> {donor.amount} </p>
                    <p className="user"> {donor.name}</p>
                  </div>
                </div>
              ) : null
            )}
          </div>

          {topDonors.length > 2 && (  // Only show button if there are more than 2 donors
            <button
              className="view-all"
              onClick={() => setShowAll(prev => !prev)}  // Toggle the showAll state
            >
              View {showAll ? "less" : "more"}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default TopDonors;
