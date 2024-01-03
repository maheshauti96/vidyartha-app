import { Box } from '@material-ui/core';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { formatDate } from '../../services/service';

const DisplayOrganisations = ({organisations}) => {
    console.log(organisations)
    
    function formatDateString(dateString) {
        const dateObject = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    
        return dateObject.toLocaleString(undefined, options);
    }

    console.log()
    let columns = [
        {
          field: "id",
          headerName: "ID",
          width: 150,
        },
        {
            field: "name",
            headerName: "Name",
            width: 300,
        },
        {
          field: "description",
          headerName: "Description",
          width: 300,
        },
        {
          field: "isActive",
          headerName: "Active",
          width: 150,
        },
        {
          headerName: "Creation Date",
          field: "created",
          width: 200,
          valueGetter: (params) => formatDateString(params?.row?.created) || params?.row?.created,
        },
        
      ];

    
  return (
    <div>
        <h2>Organisations- Our Temples</h2>
        {
            organisations && (
                <Box sx={{ height: "75vh", width: "90vw" }}>
                    <DataGrid 
                        components={{Toolbar : GridToolbar}}
                        columns={columns}
                        rows={organisations}
                        getRowId={row => row.id}
                        pageSize={10}
                    />
                </Box>
            )
        }
    </div>
  )
}

export default DisplayOrganisations