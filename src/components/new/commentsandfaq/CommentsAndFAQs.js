import { Box, Chip, Tab, Tabs,  } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import React, { useState } from 'react'
import Comments from './Comments'
import FAQ from './FAQ'

const CommentsAndFAQs = () => {
    const [index, setIndex] = useState('0')
    return (
        <div className='comments-faqs'>

            <TabContext className = "tab-context" value={index}>
            
                <TabList className='tablist' onChange={(event, value) => {
                setIndex(value)
            }}>
                <Tab label="Comments" value='0' />
                <Tab label="FAQ" value='1' />
                </TabList>
                
                <TabPanel className='tab-panel' value='0' >
                    <Comments/>
                </TabPanel>
                <TabPanel className='tab-panel' value='1' >
                    <FAQ/>
                </TabPanel>
        
            </TabContext>

        </div>
    )
}

export default CommentsAndFAQs