import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import { ThemeProvider, createTheme } from '@mui/material/styles';
  import CssBaseline from '@mui/material/CssBaseline';
  import Sidebar from './components/Sidebar';
  import Dashboard from './components/Dashboard';
  import DoctorReceiptForm from './components/Forms/DoctorReceiptForm';
  import PharmacyReceiptForm from './components/Forms/PharmacyReceiptForm';
  import MedicalForm from './components/Forms/MedicalForm';
  import Profile from './components/Profile';
  import Login from './components/Login';

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#124E66', // Teal shade for MUI components
      },
      secondary: {
        main: '#2E6B82', // Lighter teal
      },
      background: {
        default: '#121212',
        paper: '#1D2526',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  function App() {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <div className="flex">
                  <Sidebar />
                  <div className="flex-1 p-6">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/forms/doctor-receipt" element={<DoctorReceiptForm />} />
                      <Route path="/forms/pharmacy-receipt" element={<PharmacyReceiptForm />} />
                      <Route path="/forms/medical-form" element={<MedicalForm />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/" element={<Dashboard />} />
                    </Routes>
                  </div>
                </div>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }

  export default App;