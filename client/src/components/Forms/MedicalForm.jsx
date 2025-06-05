import { useState } from 'react';
import axios from 'axios';

const MedicalForm = () => {
  const [details, setDetails] = useState('');

  const handleChange = (e) => {
    setDetails(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/medicine/receipt/medical', { details }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Medical form created successfully');
    } catch (error) {
      console.error('Error creating medical form:', error);
      alert('Failed to create medical form');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Medical Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Details</label>
          <textarea
            name="details"
            value={details}
            onChange={handleChange}
            className="border p-2 w-full h-32"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default MedicalForm;