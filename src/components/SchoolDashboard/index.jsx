import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const columns = [
  { field: "donorName", headerName: "Donor Name", width: 250 },
  { field: "amount", headerName: "Amount", width: 200 },
  { field: "donorContact", headerName: "Donor Contact", width: 250 },
  { field: "donorEmail", headerName: "Donor Email", width: 250 },
  { field: "donatedAt", headerName: "Donated At", width: 250 },
  { field: "currency", headerName: "Currency", width: 250 },
  { field: "paymentId", headerName: "Payment Id", width: 250 },
  { field: "id", headerName: "Id", width: 250 },
];

function getFormattedDate(date) {
  const newDate = new Date(date);

  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
}

const SchoolDashboard = ({ placeId, data, goToAllSchools }) => {
  const [schoolData, setSchoolData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getSchoolData() {
      const schoolDonors = data
        .filter((el) => el.placeId === placeId)
        .map((el) => ({
          ...el,
          amount: el.amount / 100,
          donatedAt: getFormattedDate(el.donatedAt),
          donorContact: `No: ${el.donorContact}`,
        }));
      setSchoolData(schoolDonors);
    }

    function init() {
      getSchoolData();
      setLoading(false);
    }

    init();
  }, [data, placeId]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!loading && schoolData && schoolData.length === 0) {
    return <h2>No Data</h2>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <button onClick={() => goToAllSchools()}>Go back</button>
      <h1>School Dashboard</h1>

      {!loading && schoolData && (
        <>
          <p><b>School Name: </b>{schoolData[0].placeName}</p>
          <p><b>School Address: </b> {schoolData[0].placeAddress}</p>
          <p><b>Link: </b> <Link
            href={`https://vidyartha.org/fundraiser/${schoolData[0].placeId}`}
          >{`https://vidyartha.org/fundraiser/${schoolData[0].placeId}`}</Link></p>
          
          <div style={{ width: "90vw", margin: "1rem auto", height: "90vh" }}>
            <DataGrid
              components={{ Toolbar: GridToolbar }}
              rows={schoolData}
              columns={columns}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SchoolDashboard;
