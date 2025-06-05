import { useState } from 'react';
import axios from 'axios';

const DoctorReceiptForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    ageGroup: 'adult',
    disease: '',
    medicines: [{ name: '', dosage: 1, price: 0 }],
    doctorCharges: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMedicineChange = (index, e) => {
    const newMedicines = [...formData.medicines];
    newMedicines[index][e.target.name] = e.target.value;
    setFormData({ ...formData, medicines: newMedicines });
  };

  const addMedicine = () => {
    setFormData({
      ...formData,
      medicines: [...formData.medicines, { name: '', dosage: 1, price: 0 }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/medicine/receipt/doctor', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Receipt created successfully');
    } catch (error) {
      console.error('Error creating receipt:', error);
      alert('Failed to create receipt');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Doctor Receipt Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Age Group</label>
          <select
            name="ageGroup"
            value={formData.ageGroup}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Disease</label>
          <input
            type="text"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        {formData.medicines.map((med, index) => (
          <div key={index} className="border p-4 rounded">
            <div>
              <label className="block mb-1">Medicine Name</label>
              <input
                type="text"
                name="name"
                value={med.name}
                onChange={(e) => handleMedicineChange(index, e)}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Dosage</label>
              <input
                type="number"
                name="dosage"
                value={med.dosage}
                onChange={(e) => handleMedicineChange(index, e)}
                className="border p-2 w-full"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Price per Unit</label>
              <input
                type="number"
                name="price"
                value={med.price}
                onChange={(e) => handleMedicineChange(index, e)}
                className="border p-2 w-full"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addMedicine} className="bg-blue-500 text-white p-2 rounded">
          Add Medicine
        </button>
        <div>
          <label className="block mb-1">Doctor Charges</label>
          <input
            type="number"
            name="doctorCharges"
            value={formData.doctorCharges}
            onChange={handleChange}
            className="border p-2 w-full"
            step="0.01"
            min="0"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
          Submit Receipt
        </button>
      </form>
    </div>
  );
};

export default DoctorReceiptForm;