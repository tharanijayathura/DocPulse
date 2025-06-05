import { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Dashboard = () => {
  const [stats, setStats] = useState({
    todayReceipts: 0,
    yesterdayReceipts: 0,
    weeklyReceipts: [],
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axios.get('/api/doctor/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-6 text-teal-400">
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="bg-gray-700">
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Today’s Receipts
              </Typography>
              <Typography variant="h4" className="text-teal-300">{stats.todayReceipts}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="bg-gray-700">
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Yesterday’s Receipts
              </Typography>
              <Typography variant="h4" className="text-teal-300">{stats.yesterdayReceipts}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="bg-gray-700">
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Revenue
              </Typography>
              <Typography variant="h4" className="text-teal-300">${stats.totalRevenue.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;