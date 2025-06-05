import { useState, useEffect } from 'react';
import axios from 'axios';

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

  if (!doctor) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Name:</strong> {doctor.name}</p>
        <p><strong>Username:</strong> {doctor.username}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Phone:</strong> {doctor.phone}</p>
        <p><strong>NIC:</strong> {doctor.nic}</p>
        <p><strong>Specialty:</strong> {doctor.specialty}</p>
      </div>
    </div>
  );
};

export default Profile;