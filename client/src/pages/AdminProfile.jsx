


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ username: '', password: '', role: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const storedProfile = localStorage.getItem('adminProfile');
    const theme = localStorage.getItem('theme');

    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      setProfile(parsed);
    } else {
      navigate('/login');
    }

    if (theme === 'light') {
      setDarkMode(false);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
        const authToken = localStorage.getItem("token"); // Or wherever you store it

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  console.log("config",config);

      const userid = localStorage.getItem('userid')
      const response = await axios.put(`http://localhost:4000/api/updateuser/${userid}`, profile, config);
      localStorage.setItem('adminProfile', JSON.stringify(response.data));
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminProfile');
    navigate('/login');
  };

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen flex items-center justify-center px-4`}>
      <div className={`${darkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'} backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 w-full max-w-md relative`}>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="absolute top-4 left-4 text-sm hover:underline">
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        {/* Logout */}
        <button onClick={handleLogout} className="absolute top-4 right-4 text-sm text-red-500 hover:underline">
          Logout
        </button>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={profile.image || 'https://i.pravatar.cc/100?img=1'}
            alt="Admin"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>

        <h2 className="text-xl font-semibold text-center mb-4">
          Welcome, {profile.username}
        </h2>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-1 text-sm">Username</label>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-md ${darkMode ? 'bg-white/10 text-white' : 'bg-white text-black'} border border-gray-300 ${!isEditing ? 'cursor-not-allowed opacity-70' : ''}`}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={profile.password}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 pr-10 rounded-md ${darkMode ? 'bg-white/10 text-white' : 'bg-white text-black'} border border-gray-300 ${!isEditing ? 'cursor-not-allowed opacity-70' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-sm text-cyan-300"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 text-sm">Role</label>
            <input
              type="text"
              name="role"
              value={profile.role}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-md ${darkMode ? 'bg-white/10 text-white' : 'bg-white text-black'} border border-gray-300 ${!isEditing ? 'cursor-not-allowed opacity-70' : ''}`}
            />
          </div>

          {/* Save */}
          {isEditing && (
            <button
              type="submit"
              className="w-full py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition"
            >
              Save Profile
            </button>
          )}
        </form>

        {/* Toggle Edit Button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-full mt-4 text-sm text-cyan-500 hover:underline"
        >
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
