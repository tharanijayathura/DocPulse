import { useState } from 'react';
import axios from 'axios';

const PharmacyReceiptForm = () => {
  const [medicines, setMedicines] = useState([{ name: '', quantity: 1, price: 0 }]);

  const handleMedicineChange = (index, e) => {
    const newMedicines = [...medicines];
    newMedicines[index][e.target.name] = e.target.value;
    setMedicines(newMedicines);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', quantity: 1, price: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/medicine/receipt/pharmacy', { medicines }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Pharmacy receipt created successfully');
    } catch (error) {
      console.error('Error creating pharmacy receipt:', error);
      alert('Failed to create pharmacy receipt');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Pharmacy Receipt Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {medicines.map((med, index) => (
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
              <label className="block mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={med.quantity}
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
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
          Submit Receipt
        </button>
      </form>
    </div>
  );
};

export default PharmacyReceiptForm;