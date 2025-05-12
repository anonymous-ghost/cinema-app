import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Auth.css';

const Profile = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is just a mock implementation
    // In a real app, you would call an API to update the user profile
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // This is just a mock implementation
    // In a real app, you would call an API to update the password
    setMessage('Password updated successfully!');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setTimeout(() => setMessage(''), 3000);
  };

  if (!currentUser) {
    return null; // Will redirect to login via useEffect
  }

  return (
    <main className="profile-page">
      <div className="profile-container">
        <h1>My Profile</h1>
        
        {message && <div className="success-message">{message}</div>}
        
        <div className="profile-section">
          <h2>Account Information</h2>
          <div className="profile-info">
            <p><strong>Name:</strong> {currentUser.name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Account Type:</strong> {currentUser.role === 'admin' ? 'Administrator' : 'User'}</p>
          </div>
        </div>
        
        <div className="profile-section">
          <h2>Update Profile</h2>
          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled
              />
              <small>Email cannot be changed</small>
            </div>
            
            <button type="submit" className="profile-button">
              Update Profile
            </button>
          </form>
        </div>
        
        <div className="profile-section">
          <h2>Change Password</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleUpdatePassword}>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            
            <button type="submit" className="profile-button">
              Change Password
            </button>
          </form>
        </div>
        
        <div className="profile-actions">
          <button onClick={() => navigate('/bookings')} className="secondary-button">
            My Bookings
          </button>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile; 