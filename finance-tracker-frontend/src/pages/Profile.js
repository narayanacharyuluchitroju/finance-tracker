import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;

    try {
      await axios.delete('http://localhost:5000/api/auth/delete', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.clear();
      navigate('/');
    } catch (err) {
      alert('Failed to delete account');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const goToDashboard = () => navigate('/dashboard');

  const handleSave = async () => {
    try {
      await axios.put(
        'http://localhost:5000/api/auth/update',
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditName(false);
      setEditEmail(false);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>

        <div className="mb-4">
          <label className="font-semibold">Name:</label>
          {editName ? (
            <div className="flex gap-2 mt-1">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-2 rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>{name}</p>
              <Pencil
                size={16}
                className="cursor-pointer text-gray-600 hover:text-black"
                onClick={() => setEditName(true)}
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="font-semibold">Email:</label>
          {editEmail ? (
            <div className="flex gap-2 mt-1">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-2 rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>{email}</p>
              <Pencil
                size={16}
                className="cursor-pointer text-gray-600 hover:text-black"
                onClick={() => setEditEmail(true)}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={goToDashboard}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
