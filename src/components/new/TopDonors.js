import { EmojiEventsOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { getTopDonorsBySchool } from "../../services/service";

const TopDonors = ({ topDonors , placeId }) => {
  const [donors, setDonors] = useState([]);
  console.log(donors)
  useEffect(() => {
    getDonors()
  } , [])
  async function getDonors(){
    let data = await getTopDonorsBySchool(placeId)
    setDonors(data)
  }
  return (
    <>
      {donors.length > 0 && (
        <div className="top-donors">
          <h3 className="title">
            <EmojiEventsOutlined />
            Top Donors : 
          </h3>
          <div className="donors-list">
            {donors.map(({name, amount}, index) =>
               (
                <div className="donors">
                  <div>
                    <p className="amount">{amount / 100}Rs</p>
                    <p className="user"> {name} </p>
                  </div>
                </div>
              ) 
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TopDonors;
