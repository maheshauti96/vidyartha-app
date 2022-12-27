import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import { Button } from "@material-ui/core";

const DonationReview = () => {
  const [donorList, setDonorList] = useState(false);
  const [list, setList] = useState([]);
  const [paginationData, setPaginationData] = useState({
    page: 0,
    first: true,
    last: false,
    totalPages: 1,
  });
  useEffect(() => {
    getData(0);
  }, []);
  const getData = async (page) => {
    const pageNumber = page;
    const pageSize = 100;
    const donorObjInfo = await fetch(
      `https://api.vidyartha.org/shastradaan/order/donations/?page=${pageNumber}&size=${pageSize}`
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => console.log(error));
    if (donorObjInfo.content.length > 0) {
      setList(
        donorObjInfo.content.map((d) => ({
          ...d,
          placeId: `https://vidyartha.org/fundraiser/${d.placeId}`,
          donorContact: `No: ${d.donorContact}`,
        }))
      );
      setDonorList(true);
    }
    setPaginationData({
      page: donorObjInfo.number,
      first: donorObjInfo.first,
      last: donorObjInfo.last,
      totalPages: donorObjInfo.totalPages,
    });
    return donorObjInfo;
  };

  const rows = list;
  const columns = [
    { field: "id", headerName: "Order Id", width: 250 },
    {
      field: "placeId",
      headerName: "Place Id",
      width: 450,
      renderCell: (params) => (
        <Link href={`${params.value}`}>{params.value}</Link>
      ),
    },
    { field: "placeName", headerName: "Place Name", width: 350 },
    { field: "placeAddress", headerName: "Place Address", width: 250 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "donatedAt", headerName: "Donated At", width: 150 },
    { field: "currency", headerName: "Currency", width: 150 },
    { field: "donorName", headerName: "Donar Name", width: 200 },
    { field: "donorContact", headerName: "Donor Contact", width: 200 },
    { field: "donorEmail", headerName: "Donor Email", width: 200 },
    { field: "paymentId", headerName: "Payment Id", width: 200 },
  ];
  return (
    <>
      {donorList && (
        <div style={{ height: "90vh", width: "90%", margin: "50px" }}>
          <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
            <Button
              variant="contained"
              color="primary"
              disabled={paginationData.first}
              onClick={() => getData(+paginationData.page - 1)}
            >
              Previous Page
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={paginationData.last}
              onClick={() => getData(Number(paginationData.page) + 1)}
            >
              Next Page
            </Button>
            <p style={{ fontWeight: "700" }}>
              Page: {paginationData?.page + 1} / {paginationData?.totalPages}
            </p>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      )}
    </>
  );
};

export default DonationReview;
