import React, { useEffect, useState } from "react";
import { formatDate, getDeliveries } from "../../services/service";
import { Box, Toolbar } from "@material-ui/core";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const DeliveryDisplay = () => {
  const [deliveryList, setDeliveryList] = useState();
  useEffect(() => {
    getDeliveries(setDeliveryList);
  }, []);
  let columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
    },
    {
      field: "deliveryOwner",
      headerName: "Delivery Owner",
      width: 250,
    },
    {
      field: "place",
      headerName: "School",
      width: 250,
      renderCell: (params) => (
        <a href={`/campaigns/${params.row.place}`}>Visit School</a>
      ),
    },
    {
      field: "fromAddress",
      headerName: "From Address",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
    },
    {
      field: "shippingAmount",
      headerName: "shippingAmount",
      width: 150,
    },
    {
      field: "shippingService",
      headerName: "shippingService",
      width: 150,
    },
    {
      field: "toAddress",
      headerName: "To Address",
      width: 300,
    },
    {
      field: "taxAmount",
      headerName: "taxAmount",
      width: 150,
    },
    {
      field: "totalAmount",
      headerName: "totalAmount",
      width: 150,
    },
    {
      field: "trackingId",
      headerName: "trackingId",
      width: 250,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      width: 200,
      valueGetter: (params) => formatDate(params?.row?.createdAt) || "Problem",
    },
  ];
  return (
    <div>
      {deliveryList?.data.data.content?.length > 0 && (
        <div className="dashboard-books">
          <h2>Deliveries</h2>

          <Box sx={{ height: "75vh", width: "90vw" }}>
            {deliveryList.data.data.content && (
              <DataGrid
                components={{ Toolbar: GridToolbar }}
                columns={columns}
                rows={deliveryList.data.data.content}
                getRowId={(row) => row.id}
                pageSize={25}
              />
            )}
          </Box>
        </div>
      )}
    </div>
  );
};

export default DeliveryDisplay;
