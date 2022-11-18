import { useEffect,useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Link from "next/link";

const DonationReview = () => {
    const [donorList,setDonorList] = useState(false)
    const [list,setList] = useState([])
    useEffect(() => {
        getData()
    }, [])
    const getData = async() => {
        const pageNumber = 1;
        const pageSize = 100
        const donorObjInfo = await fetch(`https://api.vidyartha.org/shastradaan/order/donations/?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            .then(res => res.json())
              .then(data => data)
              .catch(error => console.log(error))
                if(donorObjInfo.content.length > 0) {
                    setList(donorObjInfo.content.map(d =>({...d, placeId: `https://vidyartha.org/fundraiser/${d.placeId}`})))
                    setDonorList(true)
                }
                console.log(donorObjInfo.content)
              return donorObjInfo
    }
    
    const rows = list
    const columns = [
        { field: 'id', headerName: 'Order Id',width: 250},
        { field: 'placeId', headerName: 'Place Id', width: 450,
        renderCell: (params) => (
            <Link href={`${params.value}`}>{params.value}</Link>
          )},
        {field: 'placeName', headerName: 'Place Name', width: 350},
        {field: 'placeAddress', headerName: 'Place Address', width: 250},
        { field: 'amount', headerName: 'Amount', width: 150},
        { field: 'donatedAt', headerName: 'Donated At',width: 150},
        {field: 'currency', headerName: 'Currency', width: 150},
        {field: 'donorName', headerName: 'Donar Name', width: 200},
        { field: 'donorContact', headerName: 'Donor Contact',width: 200},
        { field: 'donorEmail', headerName: 'Donor Email', width: 200},
        {field: 'paymentId', headerName: 'Payment Id', width: 200}
    ];
    return(
            <>
                {donorList && (<div style={{ height: 500, width: '90%',margin: '50px' }}>
                        <DataGrid rows={rows} columns={columns} />
                    </div>
                )}
            </>
    )
}

export default DonationReview;