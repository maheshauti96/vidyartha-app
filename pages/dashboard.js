import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SchoolDashboard from "../src/components/SchoolDashboard";
import BooksDisplay from "../src/components/dashboard/BooksDisplay";
import DeliveryDisplay from "../src/components/dashboard/DeliveryDisplay";
import CreateDeliveryForm from "../src/components/dashboard/CreateDeliveryForm";
import DisplayOrganisations from "../src/components/dashboard/DisplayOrganisations";
import TempleSearch from "../src/components/new/TempleSearch";

const MODES = {
  ALL_SCHOOLS: "ALL_SCHOOLS",
  ONE_SCHOOL: "ONE_SCHOOL",
};

const Dashboard = () => {
  const [data, setData] = useState();
  const dataRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    value: "All",
  });
  const [showFilteredMsg, setShowFilteredMsg] = useState(false);
  const [mode, setMode] = useState(MODES.ALL_SCHOOLS);
  const [selectedSchool, setSelectedSchool] = useState();
  const [deliverySchool , setDeliverySchool] = useState({showModal : false})
  const [organisations , setOrganisations] = useState()
  const [totalFundsCollected, setTotalFundsCollected] = useState(0);
  const [totalDonors, setTotalDonors] = useState(0);
  const allDataRef = useRef();

  useEffect(() => {
    async function getTotalNumberOfDonations() {
      const res = await fetch(
        `https://api.vidyartha.org/shastradaan/order/donations/`
      );

      const data = await res.json();

      return data.totalElements;
    }

    async function getAllDonations(totalNumberOfElements) {
      const res = await fetch(
        `https://api.vidyartha.org/shastradaan/order/donations?size=${totalNumberOfElements}`
      );

      const data = await res.json();

      return data;
    }

    async function init() {
      try {
        setLoading(true);
        const totalNumberOfElements = await getTotalNumberOfDonations();
        setTotalDonors(totalNumberOfElements);
        const donationsData = await getAllDonations(totalNumberOfElements);
        let totalFunds = 0;
        const sum = donationsData.content
          .map((d) => ({
            ...d,
            placeUrl: `https://vidyartha.org/fundraiser/${d.placeId}`,
            donorContact: `No: ${d.donorContact}`,
            amount: d.amount / 100,
            schoolId: d.placeId
          }))
          .reduce((acc, curr) => {

            totalFunds += curr.amount;

            const elFound = acc.filter((el) => el.placeId === curr.placeId)[0];

            if (elFound) {
              acc[elFound.idx] = { ...elFound, sum: elFound.sum + curr.amount };
            } else {
              const newData = { ...curr, sum: curr.amount, idx: acc.length };
              acc.push(newData);
            }

            return [...acc];
          }, []);
        allDataRef.current = donationsData.content
        dataRef.current = sum;
        setData(sum);
        setTotalFundsCollected(totalFunds)
        setLoading(false);
      } catch (err) {
        console.log({ err });
      }
    }



    init();
  }, []);

  useEffect(() => {
    function getOrgs(){
      fetch('/api/organisations/organisations')
        .then(res => res.json())
        .then(data => {
            setOrganisations(data.data.content)
        })
        .catch(err => console.log(err))
    }

    getOrgs()
  }, [])

  

  function applyFilters() {
    setLoading(true);
    setShowFilteredMsg(false);

    const amountFilteredData = dataRef.current.filter((el) => {
      const donatedAmount = el.sum;

      switch (filters.amountRange) {
        case "1-1999":
          return donatedAmount <= 1999;
        case "2k-4999":
          return donatedAmount >= 2000 && donatedAmount <= 4999;
        case "5k-7999":
          return donatedAmount >= 5000 && donatedAmount <= 7999;
        case "8k-9999":
          return donatedAmount >= 8000 && donatedAmount <= 9999;
        case "10k-more":
          return donatedAmount >= 10000;
        default:
          return true;
      }
    });

    const filteredData = [...amountFilteredData];

    setLoading(false);
    setData(filteredData);
    setShowFilteredMsg(true);
    setTimeout(() => setShowFilteredMsg(false), 3000);
  }
  const rows = data;
  const columns = [
    {
      field: "placeId" ,
      headerName: "View School Dashboard",
      width: 300,
      disableExport: true,
      renderCell: (params) => (
        <button
          onClick={() => {
            setMode(MODES.ONE_SCHOOL);
            setSelectedSchool(params.value);
          }}
        >
          View School Dashboard
        </button>
      ),
    },
    { field: "placeName", headerName: "Place Name", width: 350 },
    {
      field: "schoolId",
      headerName: "School Link",
      width: 450,
      renderCell: (params) => (
        <Link href={`https://vidyartha.org/fundraiser/${params.value}`}>{`https://vidyartha.org/fundraiser/${params.value}`}</Link>
      ),
    },
    {
      field: "sum",
      headerName: "Sum",
      width: 150,
      valueFormatter: (params) => {
        if (params.value == null) {
          return "";
        }

        const valueFormatted = String(params.value);
        return `${valueFormatted}`;
      },
    },
    { field: "placeAddress", headerName: "Place Address", width: 450 },
    {
      field : 'createDelivery' ,
      headerName : 'Create Delivery' , 
      width : 200,
      renderCell : params => (
        <button onClick={() => setDeliverySchool({data : params.row , showModal : true})}>
          Create Delivery
        </button>
      )
    }
  ];
  return (
    <div style={{ width: "90vw", margin: "auto" }}>
      {loading && <h2>Loading...</h2>}
      {mode === MODES.ALL_SCHOOLS && (
        <>
          {!loading && (
            <>
            <p><b>Total Campaigns:</b> {dataRef.current.length}</p>
            <p><b>Total Funds Collected:</b> {totalFundsCollected}</p>
            <p><b>Total Donors:</b> {totalDonors}</p>
            <div style={{ margin: "1rem", display: "flex", gap: "1rem" }}>
              <div>
                <label>
                  <span>Amount Range: </span>
                  <select
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        amountRange: e.target.value,
                      }))
                    }
                  >
                    <option value="All">All</option>
                    <option value="1-1999">1 to 1999</option>
                    <option value="2k-4999">2k to 4999</option>
                    <option value="5k-7999">5k to 7999</option>
                    <option value="8k-9999">8k to 9999</option>
                    <option value="10k-more">10k and more</option>
                  </select>
                </label>
              </div>
              <div>
                <button onClick={applyFilters}>Apply Filters</button>
              </div>
              {showFilteredMsg && <span>Filters applied!</span>}
            </div>
            </>
          )}
          {!loading && data && data.length > 0 && (
            <div style={{ height: "90vh" }}>
              <DataGrid
                components={{ Toolbar: GridToolbar }}
                rows={rows}
                columns={columns}
              />
            </div>
          )}
          {!loading && data && data.length === 0 && <h2>No data!</h2>}
        </>
      )}
      {mode === MODES.ONE_SCHOOL && selectedSchool && (
        <SchoolDashboard
          data={allDataRef.current}
          placeId={selectedSchool}
          goToAllSchools={() => setMode(MODES.ALL_SCHOOLS)}
        />
      )}
      <BooksDisplay/>
      <DeliveryDisplay/>
      <TempleSearch/>
      <DisplayOrganisations organisations = {organisations}/>
      
      {deliverySchool.showModal && <CreateDeliveryForm organisations = {organisations} setDeliverySchool = {setDeliverySchool} schoolData={deliverySchool}/>}
    </div>

  );
};

export default Dashboard;
