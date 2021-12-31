import Head from 'next/head'
import Image from 'next/image';
import { createTheme } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

export default function Home() {
  return (
  <div>
    <div className="home-wrap">
      <div className="logo-wrap">
        <img id="logo" className="position-absolute logo-image" src="/logo-white.png" />
      </div>
      <div className="banner-wrap">
        <h1>Help Us To Donate</h1>
        <h1>Books For Your School!</h1>
        <div className="form-wrap">
          <TextField className="id" label="Find your city" variant="outlined" />
          <br />
          <TextField className="id" label="Find your school" variant="outlined" />
          <br />
          <Button className="btn" variant="contained">
            <p>Donate Now</p>
          </Button>
        </div>
      </div>
    </div>

    {/* <div className="item">
      <img src="/ques-1.jpeg" alt="image" />
    </div> */}

    <div className="step-wrap">
      <h4>Donate in three simple steps</h4>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={5} className="time-wrap">
          <Timeline>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot><img src="/icon-1.svg" alt="icon one" /></TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className="content">
                <Typography className="time-head">Search for your school</Typography>
                <Typography className="time-body">Search for your school by entering the location and name of the school.</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot><img src="/icon-3.svg" alt="icon three" /></TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className="content">
                <Typography className="time-head">Donate Now</Typography>
                <Typography className="time-body">Your donations will safely reach to us and once completed, we will donate books to the school.</Typography>                
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator className="icon-2">
                <TimelineDot><img src="/icon-2.svg" alt="icon two" /></TimelineDot>
              </TimelineSeparator>
              <TimelineContent className="content">
                <Typography className="time-head">Share with others</Typography>
                <Typography className="time-body">Help us in spreading this campaign and encourage others to donate.</Typography>                
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Grid>
        <Grid item xs={12} sm={5} className="phone">
          <img src="/phone.png"></img>
        </Grid>
      </Grid>
    </div>

    {/* <div className="video-wrap">
      <p>Watch this short video on importance of spiritual books.</p>
    </div> */}

    {/* <div className="item">
      <img src="/ques-2.jpeg" alt="image" />
    </div> */}

    {/* <div className="tm-wrap">
       <p>Testimonials</p>
    </div> */}

    <div className="ques-wrap">
      <h4>FAQ</h4>
      <Accordion>
        <AccordionSummary className="acc-sum"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="accor">1. What is the purpose of Vidyartha?</Typography>
        </AccordionSummary>
        <AccordionDetails className="acc-det">
          <Typography className="acc-par">
            The purpose of the Vidyartha is to make spiritual wisdom literature available in the school libraries. Children need a stronng foundation of moral values, the ability to handle emotionally turbulent situations, strong determination, and healthy habits, all these needs can be effectively fulfilled by spiritual literature. They also instill within us healthy pride about our own native culture and heritage and explain the deeper meanings behind them. Vidyartha is committed to gift this literature to the schools.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary className="acc-sum"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="accor">2. How does Vidyartha work?</Typography>
        </AccordionSummary>
        <AccordionDetails className="acc-det">
          <Typography className="acc-par">
          The Vidyartha is a Crowdfunding platform where alumni can find their school & sponsor their choice amount to gift spiritual literature as gratitude for their schools. They can also share this Campaign with other alumni to quickly complete the target.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary className="acc-sum"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="accor">3. What books will be gifted to the school?</Typography>
        </AccordionSummary>
        <AccordionDetails className="acc-det">
          <Typography className="acc-par">
          Spiritual books like Ramayana, Mahabharata, Sriman Bhagavatam, and Bhagavad Gita will be gifted to the schools.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary className="acc-sum"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="accor">4. What if you can not complete your targeted amount?</Typography>
        </AccordionSummary>
        <AccordionDetails className="acc-det">
          <Typography className="acc-par">
          After the set target date whatever amount is collected worth those amount of books will be gifted to the school.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary className="acc-sum"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="accor">5. What if the school refuses to accept the books?</Typography>
        </AccordionSummary>
        <AccordionDetails className="acc-det">
          <Typography className="acc-par">
          If some school has any concerns we shall try our best to address those concerns, if still, any particular school is not willing to take the books then they will be given to some other interested school.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>

    <div className="cont-wrap">
      <h4>Contact Us</h4>
      <div className="form1-wrap">
        <TextField className="id1" label="Name" variant="outlined" />
        <br />
        <TextField className="id1" label="Email" variant="outlined" />
        <br />
        <textarea className="id2" type="text" placeholder="Feedback" cols="auto" rows="10" />
        <br />
        <Button className="btn1" variant="contained">
          <p>Submit</p>
        </Button>
      </div>
    </div>
    <footer className="foot-wrap">
      <Grid container>
        <Grid item xs={12} sm={3}>
          <p>Terms & Conditions</p>
        </Grid>
        <Grid item xs={12} sm={3}>
          <p>Privacy Policy</p>
        </Grid>
        <Grid item xs={12} sm={3}>
          <p>Return Policy</p>
        </Grid>
      </Grid>
    </footer>
  </div>
  )
}
