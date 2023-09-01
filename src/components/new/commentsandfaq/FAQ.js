import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Input, Button, TextField } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

const FAQ = () => {
    const FAQs = [
        {
          ques: "Lorem ipsum dolor sit amet?",
          ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi."
        },
        {
          ques: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas?",
          ans: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo."
        },
        {
          ques: "Maecenas accumsan eros nec libero commodo tincidunt?",
          ans: "Maecenas accumsan eros nec libero commodo tincidunt. Nullam vel sem. Praesent sodales velit quis augue. Cras suscipit, urna at aliquam rhoncus, urna quam viverra nisi, in interdum massa nibh nec erat."
        },
        {
          ques: "Fusce vulputate eleifend sapien?",
          ans: "Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Aenean vestibulum velit id placerat dapibus."
        },
        {
          ques: "Cras nec ante?",
          ans: "Cras nec ante. Pellentesque a nulla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam tincidunt urna. Nulla ullamcorper vestibulum turpis."
        },
        {
          ques: "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem?",
          ans: "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."
        },
        {
          ques: "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo?",
          ans: "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi."
        },
        {
          ques: "Nullam dictum felis eu pede mollis pretium?",
          ans: "Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim."
        },
        {
          ques: "Vivamus elementum semper nisi?",
          ans: "Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus."
        },
        {
          ques: "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus?",
          ans: "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue."
        }
      ];
  return (
    <div>
        <div className="faq-main">
            <div className="container" >
            {
                FAQs.map(({ques , ans}) => (
                    <Accordion className="">
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="accordian-summary"
                        >
                            <Typography className="question">{ques}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="accordian-details">
                            <Typography className="answer">
                                {ans}
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