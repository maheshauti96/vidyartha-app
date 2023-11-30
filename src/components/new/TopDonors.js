import { EmojiEventsOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0, // No decimal places
    maximumFractionDigits: 0, // No decimal places
  }).format(amount);
};


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
                 <Avatar
                    // className="donor-img"
                    src="/test-user.jpeg"
                    style={{zIndex: '-1'}}
                    // alt={donor.name}
                  />
                  <div>
                  <p className="amount"> {formatCurrency(donor.amount / 100)} </p>
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
