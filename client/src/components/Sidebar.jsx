import { useState } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? '240px' : '60px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? '240px' : '60px',
          boxSizing: 'border-box',
          backgroundColor: '#1D2526',
          transition: 'width 0.3s',
        },
      }}
    >
      <div className="flex items-center p-4">
        <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
          <MenuIcon />
        </IconButton>
        {open && (
          <Typography variant="h6" className="ml-2 text-white">
            DocPulse
          </Typography>
        )}
      </div>
      <List>
        <ListItem button component={Link} to="/dashboard" className="hover:bg-teal-500">
          <ListItemIcon sx={{ color: 'white' }}>
            <DashboardIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Dashboard" sx={{ color: 'white' }} />}
        </ListItem>
        <ListItem button component={Link} to="/forms/doctor-receipt" className="hover:bg-teal-500">
          <ListItemIcon sx={{ color: 'white' }}>
            <ReceiptIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Doctor Receipt" sx={{ color: 'white' }} />}
        </ListItem>
        <ListItem button component={Link} to="/forms/pharmacy-receipt" className="hover:bg-teal-500">
          <ListItemIcon sx={{ color: 'white' }}>
            <ReceiptIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Pharmacy Receipt" sx={{ color: 'white' }} />}
        </ListItem>
        <ListItem button component={Link} to="/forms/medical-form" className="hover:bg-teal-500">
          <ListItemIcon sx={{ color: 'white' }}>
            <MedicalServicesIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Medical Form" sx={{ color: 'white' }} />}
        </ListItem>
        <ListItem button component={Link} to="/profile" className="hover:bg-teal-500">
          <ListItemIcon sx={{ color: 'white' }}>
            <PersonIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Profile" sx={{ color: 'white' }} />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;