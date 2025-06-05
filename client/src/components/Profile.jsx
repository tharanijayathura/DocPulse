import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Profile = () => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axios.get('/api/doctor/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctor(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!doctor) return <Typography className="p-6 text-gray-300">Loading...</Typography>;

  return (
    <Box className="p-6">
      <Typography variant="h4" className="mb-6 text-teal-400">
        Profile
      </Typography>
      <Card className="bg-gray-700">
        <CardContent>
          <Typography variant="body1"><strong className="text-gray-300">Name:</strong> {doctor.name}</Typography>
          <Typography variant="body1"><strong className="text-gray-300">Username:</strong> {doctor.username}</Typography>
          <Typography variant="body1"><strong className="text-gray-300">Email:</strong> {doctor.email}</Typography>
          <Typography variant="body1"><strong className="text-gray-300">Phone:</strong> {doctor.phone}</Typography>
          <Typography variant="body1"><strong className="text-gray-300">NIC:</strong> {doctor.nic}</Typography>
          <Typography variant="body1"><strong className="text-gray-300">Specialty:</strong> {doctor.specialty}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;