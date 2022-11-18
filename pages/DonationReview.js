import Link from 'next/link';
import { Grid } from "@material-ui/core";
import { useEffect,useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { generateRandomString } from '../src/services/service'

const DonationReview = () => {
    const [donorList,setDonorList] = useState(false)
    const [list,setList] = useState([])
    useEffect(() => {
        getData()
    }, [])
    const getData = async() => {
        const pageNumber = 1;
        const pageSize = 100
        const donorObjInfo = await fetch(`https://api.vidyartha.org/shastradaan/donors/?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            .then(res => res.json())
              .then(data => data)
              .catch(error => console.log(error))
                if(donorObjInfo.content.length > 0) {
                    setList(donorObjInfo.content.map(d =>({...d, id: generateRandomString()})))
                    setDonorList(true)
                }
                console.log(donorObjInfo.content)
              return donorObjInfo
    }
    
    const rows = list
    const columns = [

        { field: 'name', headerName: 'Name',width: 200},
        { field: 'amount', headerName: 'Amount', width: 200},
        {field: 'lastPaidAt', headerName: 'Last Paid At', width: 200},
        {field: 'emailId', headerName: 'Email Id', width: 200}

    ];
    return(
            <>
                {donorList && (<div style={{ height: 500, width: '80%',margin: '100px' }}>
                        <DataGrid rows={rows} columns={columns} />
                    </div>
                )}
            </>
    )
}

export default DonationReview;