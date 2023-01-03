import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Dashboard = () => {
  const [data, setData] = useState();
  const dataRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "2023-01-01",
    endDate: "2023-01-01",
  });

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
        console.log("fetching total number");
        const totalNumberOfElements = await getTotalNumberOfDonations();
        console.log("fetching donations");
        const donationsData = await getAllDonations(totalNumberOfElements);
        console.log("calculating by school");
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
        dataRef.current = sum;
        setData(sum);
      } catch (err) {
        console.log({ err });
      }
    }

    init();
  }, []);

  function applyFilters() {
    console.log("applying filters");
    setLoading(true);
    const startDate = new Date(filters.startDate);
    const endDate = new Date(filters.endDate);

    const newData = dataRef.current.filter((el) => {
      const donatedDate = new Date(el.donatedAt);
      return startDate <= donatedDate && donatedDate <= endDate;
    });
    console.log("done", newData);
    setLoading(false);
    setData(newData);
  }

  const rows = data;

  const columns = [
    {
      field: "placeId",
      headerName: "Place Id",
      width: 450,
      renderCell: (params) => (
        <Link
          href={`https://vidyartha.org/fundraiser/${params.value}`}
        >{`https://vidyartha.org/fundraiser/${params.value}`}</Link>
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
      {loading && <div>Loading</div>}
      {!loading && (
        <div style={{ margin: "1rem", display: "flex", gap: "1rem" }}>
          <label style={{ display: "block" }}>
            <span>Start Date:</span>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, startDate: e.target.value }))
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
            <button onClick={applyFilters}>Apply Filters</button>
          </div>
        </div>
      )}
      {!loading && data && data.length > 0 && (
        <div style={{ height: "90vh" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
