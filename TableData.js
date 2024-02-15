//Data Table is to show data 
import React, { useState, useEffect, useMemo } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Snackbar, Button, TableFooter, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditModal from './EditModal';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import FileCopyIcon from '@mui/icons-material/FileCopy';

function TableData({ formDataList }) {
  const defaultFormDataList = [
    { firstName: 'John', lastName: 'Doe', employeeId: 123, email: 'john@example.com', phone: '1234567890', gender: 'male', shareholding: '100' },
    { firstName: 'Jane', lastName: 'Doe', employeeId: 456, email: 'jane@example.com', phone: '9876543210', gender: 'female', shareholding: '200' },
    { firstName: 'Alice', lastName: 'Smith', employeeId: 789, email: 'alice@example.com', phone: '5555555555', gender: 'female', shareholding: '300' }
  ];

  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [formData, setFormData] = useState([...defaultFormDataList]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    setFormData([...defaultFormDataList, ...formDataList]);
  }, [formDataList]); 

  //to show total cost of shares
  // const totalShareholdings = formData.reduce((total, data) => {
  //   const shareholding = parseFloat(data.shareholding);
  //   return isNaN(shareholding) ? total : total + shareholding;
  // }, 0);
  const totalShareholdings = useMemo(() => {
    return formData.reduce((total, data) => {
      const shareholding = parseFloat(data.shareholding);
      return isNaN(shareholding) ? total : total + shareholding;
    }, 0);
  }, [formData]);

  const handleDelete = (index) => {
    setSnackbarOpen(true);
    setSnackbarMessage('Data deleted successfully!');
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData.splice(index, 1);
      return updatedFormData;
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleEdit = (index) => {
    setEditingRow(index);
    setEditedData({ ...formData[index] });
  };

  const handleEditSubmit = (index, editedData) => {
    setFormData(prevFormData => {
      const updatedFormData = [...prevFormData];
      updatedFormData[index] = editedData;
      return updatedFormData;
    });
    setEditingRow(null);
    setEditedData({});
  };
  
  const isEditing = (index) => index === editingRow;

  // Sorting functionality
  const sortedData = () => {
    const sortableData = [...formData];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Search function for table
  const filteredData = sortedData().filter((data) => {
    return (
      data.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination
  const pageSize = 7;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredData.length);
  const currentData = filteredData.slice(startIndex, endIndex);

  // Function to copy row data to clipboard
  const copyRowData = (rowData) => {
    const rowDataString = Object.values(rowData).join(', ');
    navigator.clipboard.writeText(rowDataString)
      .then(() => {
        setSnackbarOpen(true);
        setSnackbarMessage('Row data copied to clipboard!');
      })
      .catch((error) => {
        console.error('Error copying row data: ', error);
        setSnackbarOpen(true);
        setSnackbarMessage('Error copying row data');
      });
  };

  return (
    <div className='tableData-cls'>
      <div className='tableData-sub-cls'>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        style={{ marginBottom: '1rem', width: "40%", float: "right",backgroundColor:"white"
      }}
      />
      <TableContainer component={Paper}>
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Edit</TableCell>
              <TableCell onClick={() => requestSort('firstName')}>Full Name<Tooltip title="Sort" arrow><SwapVertIcon/></Tooltip></TableCell>
              <TableCell align="right" onClick={() => requestSort('employeeId')}>Employee Id</TableCell>
              <TableCell align="right" onClick={() => requestSort('email')}>Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right" >Gender</TableCell>
              <TableCell align="right">$ Holdings</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>
                  {isEditing(index) ? (
                    <EditModal
                      data={editedData}
                      setData={setEditedData}
                      handleSubmit={(editedData) => handleEditSubmit(index, editedData)}
                      handleCancel={() => setEditingRow(null)}
                    />
                  ) : (
                    <Tooltip title="Edit" arrow><ModeEditIcon className='icon-pointer-cls' onClick={() => handleEdit(index)} /></Tooltip>
                  )}
                </TableCell>
                <TableCell>{`${data.firstName} ${data.lastName}`}</TableCell>
                <TableCell align="right">{data.employeeId}</TableCell>
                <TableCell align="right">{data.email}</TableCell>
                <TableCell align="right">{data.phone}</TableCell>
                <TableCell align="right">{data.gender}</TableCell>
                <TableCell align="right">${data.shareholding}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete" arrow><DeleteIcon className='icon-pointer-cls' onClick={() => handleDelete(index)} /></Tooltip>
                  <Tooltip title="Copy" arrow><FileCopyIcon className='icon-pointer-cls' onClick={() => copyRowData(data)} /></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
             <TableFooter>
              <TableRow>
                <TableCell colSpan={9}>
                  <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
                  <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
                  <Box paddingLeft="8px"><Typography>{`Page ${currentPage} of ${totalPages}`}</Typography></Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={6} />
                <TableCell align="right">Total:</TableCell>
                <TableCell align="right">${totalShareholdings.toFixed(2)}</TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />
      </div>
    </div>
  );
}

export default TableData;
