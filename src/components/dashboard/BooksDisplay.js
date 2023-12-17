import { Box, Toolbar } from "@material-ui/core";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import {
  formatDate,
  getBooks,
  getBooksByCode,
  getBooksByName,
} from "../../services/service";

const BooksDisplay = () => {
  const [books, setBooks] = useState([]);
  const [codeParam, setCodeParam] = useState("");
  const [nameParam, setNameParam] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [prevList, setPrevList] = useState([]);
  const data = {
    content: [
      {
        code: "280N",
        description: "Marathi - Science of Self-Realization\t : Normal",
        author: "SP",
        publisher: "BBT",
        language: "Marathi",
        category: "Big",
        type: "Normal",
        createdAt: "2023-10-26T15:22:39.000+00:00",
        modifiedAt: "2023-10-26T15:22:39.000+00:00",
      },
      {
        code: "4369N",
        description: "Bengali - Journey of Self Discovery\t : Normal",
        author: "SP",
        publisher: "BBT",
        language: "Bengali",
        category: "Big",
        type: "Normal",
        createdAt: "2023-10-26T15:22:39.000+00:00",
        modifiedAt: "2023-10-26T15:22:39.000+00:00",
      },
      {
        code: "120N",
        description: "Bengali - Bhaktavatsal Bhagavan : Normal",
        author: "SP",
        publisher: "BBT",
        language: "Bengali",
        category: "Big",
        type: "Normal",
        createdAt: "2023-10-26T15:22:39.000+00:00",
        modifiedAt: "2023-10-26T15:22:39.000+00:00",
      },
      {
        code: "121N",
        description: "Bengali - Krishnabhakti Sarvottam Vigyan : Normal",
        author: "SP",
        publisher: "BBT",
        language: "Bengali",
        category: "Big",
        type: "Normal",
        createdAt: "2023-10-26T15:22:39.000+00:00",
        modifiedAt: "2023-10-26T15:22:39.000+00:00",
      },
      {
        code: "122N",
        description: "Bengali - Science of Self-Realization : Normal",
        author: "SP",
        publisher: "BBT",
        language: "Bengali",
        category: "Big",
        type: "Normal",
        createdAt: "2023-10-26T15:22:39.000+00:00",
        modifiedAt: "2023-10-26T15:22:39.000+00:00",
      },
      {
        code: "123N",
        description: "Bengali - Teachings of LORD CAITANYA : Normal",
        author: "SP",
        publisher: "BBT",
        language: "Bengali",
        category: "Big",
        type: "Normal",
        createdAt: "2023-10-26T15:22:39.000+00:00",
        modifiedAt: "2023-10-26T15:22:39.000+00:00",
      },
      {
        code: "124N",
        description: "Bengali - Teachings of LORD KAPILA : Normal",
        author: "SP",
        publisher: "BBT",
        language: "Bengali",
        category: "Big",
        type: "Normal",
        createdAt: "2023-10-26T15:22:39.000+00:00",
        modifiedAt: "2023-10-26T15:22:39.000+00:00",
      },
      {
        code: "125N",
        description: "Bengali - Yuga Dharma : Normal",
        author: "SP",
        publisher: "BBT",
        language: "Bengali",
        category: "Big",
        type: "Normal",
        createdAt: "2023-10-26T15:22:39.000+00:00",
        modifiedAt: "2023-10-26T15:22:39.000+00:00",
      },
      {
        code: "166N",
        description: "Telugu - Science of Self-Realization : Normal",
        author: "SP",
        publisher: "BBT",
        language: "Telugu",
        category: "Big",
        type: "Normal",
        createdAt: "2023-10-26T15:22:39.000+00:00",
        modifiedAt: "2023-10-26T15:22:39.000+00:00",
      },
      {
        code: "167N",
        description: "Telugu - Teachings of LORD CAITANYA : Normal",
        author: "SP",
        publisher: "BBT",
        language: "Telugu",
        category: "Big",
        type: "Normal",
        createdAt: "2023-10-26T15:22:39.000+00:00",
        modifiedAt: "2023-10-26T15:22:39.000+00:00",
      },
    ],
    pageable: {
      sort: {
        sorted: true,
        unsorted: false,
        empty: false,
      },
      pageNumber: 0,
      pageSize: 10,
      offset: 0,
      paged: true,
      unpaged: false,
    },
    last: false,
    totalElements: 900,
    totalPages: 90,
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
    first: true,
    number: 0,
    numberOfElements: 10,
    size: 10,
    empty: false,
  };
  let columns = [
    {
      field: "code",
      headerName: "Book Code",
      width: 150,
    },
    {
      field: "description",
      headerName: "Name",
      width: 450,
    },
    {
      field: "author",
      headerName: "Author",
      width: 150,
    },
    {
      field: "publisher",
      headerName: "Publisher",
      width: 150,
    },
    {
      field: "language",
      headerName: "Language",
      width: 150,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      width: 200,
      valueGetter: (params) => formatDate(params?.row?.createdAt) || "Problem",
    },
    {
      field: "modifiedAt",
      headerName: "Modified At",
      width: 200,
      valueGetter: (params) => formatDate(params?.row?.modifiedAt) || "Problem",
    },
  ];

  function selectedRowHandler(ids) {
    setPrevList(ids);

    if (prevList.length === ids.length - 1) {
      let addedRow = ids.filter((id) => !prevList.includes(id))
      const newArr = selectedRows
      newArr.push(...addedRow)
      setSelectedRows(newArr)
      
    }
    if (prevList.length === ids.length+1) {
      let removedItem = prevList.filter((id) => !ids.includes(id))
      const newArr = selectedRows.filter(id => id !== removedItem[0])
      setSelectedRows(newArr)
    }
  }
  function setByCode() {
    getBooksByCode(setBooks, codeParam);
  }

  function setByName() {
    getBooksByName(setBooks, nameParam);
  }
  useEffect(() => {
    getBooks(setBooks);
  }, []);

  useEffect(() => {
    if (!nameParam && !codeParam) {
      getBooks(setBooks);
    }
  }, [nameParam, codeParam]);
  return (
    <div>
      {books.length > 0 && (
        <div className="dashboard-books">
          <h2>Books</h2>
          
          <Box sx={{ height: "75vh", width: "90vw" }}>
            {books && (
              <DataGrid
                components={{ Toolbar: GridToolbar }}
                columns={columns}
                rows={books}
                getRowId={(row) => row.code}
                pageSize={25}
                checkboxSelection
                onSelectionModelChange={(ids) => selectedRowHandler(ids)}
                keepNonExistentRowsSelected
              />
            )}
          </Box>
        </div>
      )}
    </div>
  );
};

export default BooksDisplay;
