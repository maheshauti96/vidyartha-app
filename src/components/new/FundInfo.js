import React, { useState } from "react";
import { Box, Input, LinearProgress, TextField } from "@material-ui/core";
import RazorpayPayment from "../RazorpayPayment";
import { formatCurrency } from "./TopDonors";
import { useRouter } from "next/router";

const FundInfo = ({
  schoolInformation,
  raisedAmount,
  requiredAmount,
  progress,
  orgCode,
  href,
  placeid,
}) => {
  const { schoolName, schoolAdress } = schoolInformation;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState();
  const [updateRaiseAmount, setUpdateRaisedAmount] = useState(false);
  const router = useRouter()
  return (
    <div className="fund-info">
      <div className="fund-title new-classname-for-funds">
        <h1  style={{ textAlign: "center" }} className="fund-name">
          {schoolName}
        </h1>
        <div className="fund-links">
          
          <a
            href= {href}
            data-action="share/whatsapp/share"
          >
            <img src="/whatsapp.png" />
          </a> 
          <a
            href={href}
            data-action="share/instagram/share"
          >
            <img src="/instagram.png" alt="instagram" />
          </a>

          <a
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src="/facebook.png" alt="facebook" />
          </a>
        </div>
      </div>
      <p className="address">{schoolAdress}</p>
      <div className="progress-container">
        <div className="fund-progress">
          <p style={{ textAlign: "center" }}>
            {formatCurrency(raisedAmount)} raised out of{" "}
            {formatCurrency(requiredAmount)}
          </p>
          <Box sx={{ width: "80%", margin: "auto" }}>
            <LinearProgress
              style={{
                height: "12px",
                borderRadius: "6px",
                backgroundColor: "#fff",
                outline: "1px solid black",
              }}
              variant="determinate"
              value={progress}
            />
          </Box>
        </div>
        {/* { progress > 0 && <div className="fund-progress">
          <p>Books worth Rs. 3000 have been sent</p>
          <Box sx={{ width: "80%" }}>
            <LinearProgress
              style={{
                height: "12px",
                borderRadius: "6px",
                backgroundColor: "#fff",
                outline: "1px solid black",
              }}
              variant="determinate"
              value={30}
            />
          </Box>
        </div>} */}
      </div>
      <form className="donate-form">
        <div className="textfield">
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder=""
            type="text"
          />
          <label>Name</label>
        </div>
        <div className="textfield">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            type="text"
          />
          <label>Email Address</label>
        </div>
        <div className="amount-options">
          <span
            onClick={() => {
              setAmount(1000);
            }}
          >
            {formatCurrency(1000)}
          </span>
          <span
            onClick={() => {
              setAmount(1500);
            }}
          >
            {formatCurrency(1500)}
          </span>
          <span
            onClick={() => {
              setAmount(2000);
            }}
          >
            {formatCurrency(2000)}
          </span>
        </div>
        <div className="textfield">
          <input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            placeholder=""
            type="number"
          />
          <label>Amount</label>
        </div>
        <RazorpayPayment
          name={name}
          email={email}
          amount={amount}
          setName={setName}
          setEmail={setEmail}
          setAmount={setAmount}
          placeId={placeid}
          setUpdateRaisedAmount={setUpdateRaisedAmount}
          orgCode={orgCode}
        ></RazorpayPayment>
      </form>
    </div>
  );
};

export default FundInfo;
