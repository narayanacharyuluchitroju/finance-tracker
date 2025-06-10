import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    paymentType: ''
  });

  const token = localStorage.getItem('token');

  // ✅ Autofill on "fillExpenseForm" event
  useEffect(() => {
    const handler = (e) => {
      const { amount, category, description, paymentType, date } = e.detail || {};
      setForm((prev) => ({
        ...prev,
        amount: amount || '',
        category: category || '',
        description: description || '',
        paymentType: paymentType || '',
        date: date || new Date().toISOString().split('T')[0]
      }));
    };

    document.addEventListener('fillExpenseForm', handler);
    return () => document.removeEventListener('fillExpenseForm', handler);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/expenses', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        paymentType: ''
      });
      onAdd();
    } catch (err) {
      alert('Error adding expense');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Add New Expense</h3>

      <input
        type="number"
        placeholder="Amount (₹)"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) })}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={form.paymentType}
        onChange={(e) => setForm({ ...form, paymentType: e.target.value })}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Payment Type</option>
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
        <option value="UPI">UPI</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
