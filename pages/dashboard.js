import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SchoolDashboard from "../src/components/SchoolDashboard";

const MODES = {
  ALL_SCHOOLS: "ALL_SCHOOLS",
  ONE_SCHOOL: "ONE_SCHOOL",
};

const Dashboard = () => {
  const [data, setData] = useState();
  const dataRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "2022-01-01",
    endDate: "2023-01-01",
    value: "All",
  });
  const [showFilteredMsg, setShowFilteredMsg] = useState(false);
  const [mode, setMode] = useState(MODES.ALL_SCHOOLS);
  const [selectedSchool, setSelectedSchool] = useState();
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
        const donationsData = await getAllDonations(totalNumberOfElements);
        const sum = donationsData.content
          .map((d) => ({
            ...d,
            placeUrl: `https://vidyartha.org/fundraiser/${d.placeId}`,
            donorContact: `No: ${d.donorContact}`,
            amount: d.amount / 100,
          }))
          .reduce((acc, curr) => {
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
        setLoading(false);
      } catch (err) {
        console.log({ err });
      }
    }

    init();
  }, []);

  function applyFilters() {
    setLoading(true);
    setShowFilteredMsg(false);
    const startDate = new Date(filters.startDate);
    const endDate = new Date(filters.endDate);

    const dateFilteredData = dataRef.current.filter((el) => {
      const donatedDate = new Date(el.donatedAt);

      return startDate <= donatedDate && donatedDate <= endDate;
    });

    const amountFilteredData = dateFilteredData.filter((el) => {
      const donatedAmount = el.sum;

      switch (filters.amountRange) {
        case "1-2k":
          return donatedAmount <= 2000;
        case "2k-5k":
          return donatedAmount >= 2000 && donatedAmount <= 5000;
        case "5k-8k":
          return donatedAmount >= 5000 && donatedAmount <= 8000;
        case "8k-10k":
          return donatedAmount >= 8000 && donatedAmount <= 10000;
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
      field: "placeId",
      headerName: "Place Id",
      width: 450,
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
    { field: "placeAddress", headerName: "Place Address", width: 250 },
    { field: "id", headerName: "Order Id", width: 250 },
  ];
  return (
    <div style={{ width: "90vw", margin: "auto" }}>
      {loading && <h2>Loading...</h2>}
      {mode === MODES.ALL_SCHOOLS && (
        <>
          {!loading && (
            <div style={{ margin: "1rem", display: "flex", gap: "1rem" }}>
              <label style={{ display: "block" }}>
                <span>Start Date:</span>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                />
              </label>
              <label style={{ display: "block" }}>
                <span>End Date:</span>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                />
              </label>
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
                    <option value="1-2k">1 to 2k</option>
                    <option value="2k-5k">2k to 5k</option>
                    <option value="5k-8k">5k to 8k</option>
                    <option value="8k-10k">8k to 10k</option>
                    <option value="10k-more">10k and more</option>
                  </select>
                </label>
              </div>
              <div>
                <button onClick={applyFilters}>Apply Filters</button>
              </div>
              {showFilteredMsg && <span>Filters applied!</span>}
            </div>
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
    </div>
  );
};

export default Dashboard;
