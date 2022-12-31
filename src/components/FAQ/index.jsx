import React from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { faqs as faqsData } from "./data";

const FAQ = () => {
  return (
    <div className="ques-wrap">
      <h4>FAQ</h4>
      {faqsData.data.map((item, idx) => {
        return (
          <Accordion>
            <AccordionSummary
              className="acc-sum"
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="accor">
                {idx + 1}{". "} {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="acc-det">
              <Typography className="acc-par">{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default FAQ;
