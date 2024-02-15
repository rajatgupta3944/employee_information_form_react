//Display form created to display the form to feed data
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import TableData from './TableData';

function DisplayForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    email: '',
    phone: '',
    gender: 'female'
  });

  const [formDataList, setFormDataList] = useState([]);
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleFormSubmit = () => {
    // Validation for phone number
    if (!/^\d{10}$/.test(formData.phone)) {
      setPhoneError('Please enter a valid phone number');
      return;
    }

    // validation for email id
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setFormDataList(prevFormDataList => [...prevFormDataList, formData]);
    setFormData({
      firstName: '',
      lastName: '',
      employeeId: '',
      email: '',
      phone: '',
      gender: 'female',
      shareholding: ''
    });
    setPhoneError('');
    setEmailError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleGenderChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };


  const handleClearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      employeeId: '',
      email: '',
      phone: '',
      gender: 'female',
      shareholding: ''
    });
    // Clear any previous error messages
    setPhoneError('');
    setEmailError('');
  };

  return (
    <div>
      <div className='displayForm-cls'><Typography gutterBottom variant="h4" fontWeight="600" align="center">Employee Information</Typography></div>
      <Box justifyContent="center">
        <Box display="flex" justifyContent="center">
          <Card sx={{ width: "70%" }}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} lg={6} item>
                  <TextField name="firstName" label="First Name" placeholder='Enter Your First Name' variant='outlined' fullWidth required value={formData.firstName} onChange={handleInputChange} />
                </Grid>
                <Grid xs={12} sm={6} lg={6} item>
                  <TextField name="lastName" label="Last Name" placeholder='Enter Your Last Name' variant='outlined' fullWidth required value={formData.lastName} onChange={handleInputChange} />
                </Grid>
                <Grid xs={12} sm={6} lg={12} item>
                  <TextField name="employeeId" type="number" label="Employee Id" placeholder='Enter Your Employee Id' variant='outlined' fullWidth required value={formData.employeeId} onChange={handleInputChange} />
                </Grid>
                <Grid xs={12} sm={6} lg={12} item>
                  <TextField name="email" type="email" label="Email" placeholder='Enter Your Email' variant='outlined' fullWidth required value={formData.email} onChange={handleInputChange} error={!!emailError} helperText={emailError} />
                </Grid>
                <Grid xs={12} sm={6} lg={12} item>
                  <TextField name="phone" type="number" label="Phone" placeholder='Enter Phone Number' variant='outlined' fullWidth required value={formData.phone} onChange={handleInputChange} error={!!phoneError} helperText={phoneError} />
                </Grid>
                <Grid xs={12} sm={6} lg={12} item>
                  <TextField
                    name="shareholding"
                    type="number"
                    label="Shareholding"
                    placeholder="Enter Your shareholding"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.shareholding}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                <FormControl sx={{ margin: "22px" }}>
                  <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={formData.gender}
                    name="gender"
                    onChange={handleGenderChange}
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Container sx={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}>
                <Button variant="outlined" onClick={handleClearForm}>Clear</Button>
                <Button variant="contained" onClick={handleFormSubmit}>Submit</Button>
              </Container>
            </CardContent>
          </Card>
        </Box>
        <TableData formDataList={formDataList} />
      </Box>

    </div>
  );
}

export default DisplayForm;
