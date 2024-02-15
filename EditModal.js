//Edit Modal to edit any field from any row
import React, { useState } from 'react';
import { Grid, TextField, Button, Box, Container } from '@mui/material';

function EditModal({ data, setData, handleSubmit, handleCancel }) {
  const [editedData, setEditedData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
//submit button to save the data while editing
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(editedData); 
  };

  return (
    <div className='editModal-cls'>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} lg={6}>
            <TextField
              id="firstName"
              label="First Name"
              variant="outlined"
              type="text"
              name="firstName"
              value={editedData.firstName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={6}>
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              type="text"
              name="lastName"
              value={editedData.lastName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={6}>
            <TextField
              id="employeeId"
              label="Employee Id"
              variant="outlined"
              type="number"
              name="employeeId"
              value={editedData.employeeId}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={6}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={editedData.email}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={6}>
            <TextField
              id="phone"
              label="Phone"
              variant="outlined"
              type="number"
              name="phone"
              value={editedData.phone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <TextField
              id="gender"
              label="Gender"
              variant="outlined"
              type="text"
              name="gender"
              value={editedData.gender}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={6}>
            <TextField
              id="shareholding"
              label="Shareholding"
              variant="outlined"
              type="number"
              name="shareholding"
              value={editedData.shareholding}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Container sx={{display: "flex", justifyContent: "flex-end", gap: "5px", marginTop: "10px"}}>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Button type="button" onClick={handleCancel}>Cancel</Button>
            </Container>
        </Grid>
      </form>
    </div>
  );
}

export default EditModal;
