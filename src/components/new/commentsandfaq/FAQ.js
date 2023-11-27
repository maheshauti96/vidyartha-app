import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Input, Button, TextField } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

const FAQ = () => {
  const FAQs = [
    {
      question: "What is the purpose of Vidyartha?",
      answer:
        "The purpose of the Vidyartha is to make spiritual wisdom literature available in the school libraries. Children need a strong foundation of moral values, the ability to handle emotionally turbulent situations, strong determination, and healthy habits, all these needs can be effectively fulfilled by spiritual literature. They also instill within us healthy pride about our own native culture and heritage and explain the deeper meanings behind them. Vidyartha is committed to gift this literature to the schools.",
    },
    {
      question: "How does Vidyartha work?",
      answer:
        "The Vidyartha is a Crowdfunding platform where alumni can find their school & sponsor their choice amount to gift spiritual literature as gratitude for their schools. They can also share this campaign with other alumni to quickly complete the target.",
    },
    {
      question: "What books will be gifted to the school?",
      answer:
        "Spiritual books like Ramayana, Mahabharata, Srimad Bhagavatam, Bhagavad Gita, many other value education, story and picture books will be gifted to the schools.",
    },
    {
      question: "What if you can not complete your targeted amount?",
      answer:
        "After the set target date whatever amount is collected worth those amount of books will be gifted to the school.",
    },
    {
      question: "What if the school refuses to accept the books?",
      answer:
        "If you are doubtful about acceptance of the books by your school, you may once inform the school about your desire to gift them books and check their response. From our side too, if some school has any concerns we shall try our best to address those concerns, if still, any particular school is not willing to take the books then they will be given to some other interested school.",
    },
    {
      question: "What if I am not able to find my school?",
      answer:
        "Please search the name of your school on Google Maps and try the same name.",
    },
  ]
  return (
    <div>
        <div className="faq-main">
            <div className="container" >
            {
                FAQs.map(({question , answer}) => (
                    <Accordion key={question} className="">
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="accordian-summary"
                        >
                            <Typography className="question">{question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="accordian-details">
                            <Typography className="answer">
                                {answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
            <div className='input-el'>
            <TextField label = "Still have a question?" variant='outlined' fullWidth /><button>Ask</button>
            </div>
            </div>

        </div>
    </div>
  )
}

export default FAQ