import { Link } from 'react-router-dom';

  const Sidebar = () => {
    return (
      <div className="w-64 h-screen bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">DocPulse</h2>
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          </li>
          <li className="mb-4">
            <Link to="/forms/doctor-receipt" className="hover:text-gray-300">Doctor Receipt</Link>
          </li>
          <li className="mb-4">
            <Link to="/forms/pharmacy-receipt" className="hover:text-gray-300">Pharmacy Receipt</Link>
          </li>
          <li className="mb-4">
            <Link to="/forms/medical-form" className="hover:text-gray-300">Medical Form</Link>
          </li>
          <li className="mb-4">
            <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          </li>
        </ul>
      </div>
    );
  };

  export default Sidebar;