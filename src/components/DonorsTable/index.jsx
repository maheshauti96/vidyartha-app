import {
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper
} from "@material-ui/core";
import React from "react";


const DonorsTable = ({ topDonors }) => {

  const donors = topDonors.slice(0, 5);
  return (
    <Grid item xs={12} sm={5}>
      <TableContainer component={Paper}>
        <Table className="table-wrap" aria-label="simple table">
          <TableHead className="thead">
            <TableRow className="tr">
              <TableCell className="th" align="center">
                Top Donors
              </TableCell>
              <TableCell className="th" align="center">
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="tbody">
            {donors.map((donor) => (
              <TableRow className="tr" key={donor.name}>
                <TableCell className="td" align="left">
                  {donor.name}
                </TableCell>
                <TableCell className="td" align="left">
                  {parseInt(Number(donor.amount) / 100)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default DonorsTable;
