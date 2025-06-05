import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';

const DoctorReceiptForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    ageGroup: 'adult',
    disease: '',
    medicines: [{ name: '', dosage: 1, price: 0 }],
    doctorCharges: 0,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value ? '' : 'This field is required' }));
  };

  const handleMedicineChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newMedicines = [...prev.medicines];
      newMedicines[index] = { ...newMedicines[index], [name]: value };
      return { ...prev, medicines: newMedicines };
    });
  };

  const addMedicine = () => {
    setFormData((prev) => ({
      ...prev,
      medicines: [...prev.medicines, { name: '', dosage: 1, price: 0 }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first');
      return;
    }
    try {
      await axios.post('/api/medicine/receipt/doctor', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Receipt created successfully');
      setFormData({
        patientName: '',
        ageGroup: 'adult',
        disease: '',
        medicines: [{ name: '', dosage: 1, price: 0 }],
        doctorCharges: 0,
      });
    } catch (error) {
      console.error('Error creating receipt:', error.response?.data || error.message);
      alert('Failed to create receipt: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <Box className="p-6">
      <Typography variant="h4" className="mb-6 text-teal-400">
        Doctor Receipt Form
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
          sx={{ backgroundColor: '#2D3748', '& .MuiInputBase-input': { color: 'white' } }}
        />
        <Box sx={{ marginY: 2 }}>
          <Typography variant="body1" className="text-gray-300">Age Group</Typography>
          <Select
            name="ageGroup"
            value={formData.ageGroup}
            onChange={handleChange}
            fullWidth
            sx={{ backgroundColor: '#2D3748', color: 'white' }}
          >
            <MenuItem value="adult">Adult</MenuItem>
            <MenuItem value="child">Child</MenuItem>
            <MenuItem value="senior">Senior</MenuItem>
          </Select>
        </Box>
        <TextField
          label="Disease"
          name="disease"
          value={formData.disease}
          onChange={handleChange}
          fullWidth
          error={!!errors.disease}
          helperText={errors.disease}
          required
          sx={{ backgroundColor: '#2D3748', '& .MuiInputBase-input': { color: 'white' } }}
        />
        {formData.medicines.map((med, index) => (
          <Paper key={index} className="p-4 bg-gray-700" elevation={3}>
            <TextField
              label="Medicine Name"
              name="name"
              value={med.name || ''}
              onChange={(e) => handleMedicineChange(index, e)}
              fullWidth
              margin="normal"
              required
              sx={{ backgroundColor: '#4A5568', '& .MuiInputBase-input': { color: 'white' } }}
            />
            <TextField
              label="Dosage"
              name="dosage"
              type="number"
              value={med.dosage || 1}
              onChange={(e) => handleMedicineChange(index, e)}
              fullWidth
              margin="normal"
              InputProps={{ inputProps: { min: 1 } }}
              required
              sx={{ backgroundColor: '#4A5568', '& .MuiInputBase-input': { color: 'white' } }}
            />
            <TextField
              label="Price per Unit"
              name="price"
              type="number"
              value={med.price || 0}
              onChange={(e) => handleMedicineChange(index, e)}
              fullWidth
              margin="normal"
              InputProps={{ inputProps: { min: 0, step: 0.01 } }}
              required
              sx={{ backgroundColor: '#4A5568', '& .MuiInputBase-input': { color: 'white' } }}
            />
          </Paper>
        ))}
        <IconButton onClick={addMedicine} color="primary" className="bg-teal-600 hover:bg-teal-500">
          <AddIcon />
        </IconButton>
        <TextField
          label="Doctor Charges"
          name="doctorCharges"
          type="number"
          value={formData.doctorCharges}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
          sx={{ backgroundColor: '#2D3748', '& .MuiInputBase-input': { color: 'white' } }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth className="bg-teal-600 hover:bg-teal-500">
          Submit Receipt
        </Button>
      </form>
    </Box>
  );
};

export default DoctorReceiptForm;