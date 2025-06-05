import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const MedicalForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    ageGroup: 'adult',
    diagnosis: '',
    treatmentPlan: '',
    followUpDate: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: value ? '' : 'This field is required' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/medicine/receipt/medical', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Medical form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form');
    }
  };

  return (
    <Box className="p-6">
      <Typography variant="h4" className="mb-6 text-teal-400">
        Medical Form
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
        <TextField
          label="Patient Name"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          fullWidth
          error={!!errors.patientName}
          helperText={errors.patientName}
          required
          className="bg-gray-700"
          InputProps={{ className: 'text-white' }}
        />
        <Box sx={{ marginY: 2 }}>
          <Typography variant="body1" className="text-gray-300">Age Group</Typography>
          <Select
            name="ageGroup"
            value={formData.ageGroup}
            onChange={handleChange}
            fullWidth
            className="bg-gray-700 text-white"
          >
            <MenuItem value="adult">Adult</MenuItem>
            <MenuItem value="child">Child</MenuItem>
            <MenuItem value="senior">Senior</MenuItem>
          </Select>
        </Box>
        <TextField
          label="Diagnosis"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          fullWidth
          error={!!errors.diagnosis}
          helperText={errors.diagnosis}
          required
          className="bg-gray-700"
          InputProps={{ className: 'text-white' }}
          multiline
          rows={4}
        />
        <TextField
          label="Treatment Plan"
          name="treatmentPlan"
          value={formData.treatmentPlan}
          onChange={handleChange}
          fullWidth
          error={!!errors.treatmentPlan}
          helperText={errors.treatmentPlan}
          required
          className="bg-gray-700"
          InputProps={{ className: 'text-white' }}
          multiline
          rows={4}
        />
        <TextField
          label="Follow-Up Date"
          name="followUpDate"
          type="date"
          value={formData.followUpDate}
          onChange={handleChange}
          fullWidth
          error={!!errors.followUpDate}
          helperText={errors.followUpDate}
          required
          className="bg-gray-700"
          InputProps={{ className: 'text-white' }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth className="bg-teal-600 hover:bg-teal-500">
          Submit Form
        </Button>
      </form>
    </Box>
  );
};

export default MedicalForm;