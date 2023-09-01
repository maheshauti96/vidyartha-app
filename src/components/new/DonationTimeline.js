import React from 'react'
import { Timeline , TimelineItem , TimelineConnector , TimelineSeparator , TimelineContent } from '@material-ui/lab';


const DonationTimeline = () => {
  return (
    <Timeline position = 'alternate' className='donation-timeline' style={{ height: "100vh" }}>
      <TimelineItem style = {{height : '150px' , maxWidth : '80%'}}>
        <TimelineSeparator>
        <div className = "icon-image">
            <img src='/phone.png' />
          </div>
          <TimelineConnector />
        </TimelineSeparator>
        
        <TimelineContent className = "timeline-desc">Search for your school/college on Vidyartha platform</TimelineContent>
        
        
      </TimelineItem>
      <TimelineItem style = {{height : '150px' , maxWidth : '80%'}}>
        <TimelineSeparator>
          <div className = "icon-image">
            <img src='./new-assets/timeline-icon-2.svg' />
          </div>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className = "timeline-desc">Contribute your desired amount</TimelineContent>
      </TimelineItem>
      <TimelineItem style = {{height : '150px' , maxWidth : '80%'}}>
        <TimelineSeparator>
        <div className = "icon-image">
            <img src='./new-assets/timeline-icon-3.svg' />
          </div>
          <TimelineConnector />
        </TimelineSeparator>
        
        <TimelineContent className = "timeline-desc"  >Contribute your desired amount</TimelineContent>
        
        
      </TimelineItem>
      <TimelineItem style = {{maxWidth : '80%'}}>
        <TimelineSeparator>
          <div className = "icon-image">
            <img src='./new-assets/timeline-icon-4.svg' /> 
          </div>
        </TimelineSeparator>
        <TimelineContent className = "timeline-desc" style = {{marginTop : '1rem'}}>We deliver the books to your school when we receive sufficient amount</TimelineContent>
      </TimelineItem>
      
    </Timeline>
  )
}

export default DonationTimeline