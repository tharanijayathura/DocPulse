import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center">
      <Paper className="p-6 max-w-md w-full bg-gray-800">
        <Typography variant="h5" align="center" className="mb-4 text-teal-400">
          Login
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            className="bg-gray-700"
            InputProps={{ className: 'text-white' }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            className="bg-gray-700"
            InputProps={{ className: 'text-white' }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth className="bg-teal-600 hover:bg-teal-500">
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;