import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartBar } from 'react-icons/fa';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    alert('Registration successful!');
    navigate('/login');
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleRegister} style={formStyle}>
        <div style={brandStyle}>
          <FaChartBar size={30} style={{ marginRight: '10px', color: '#764ba2' }} />
          <span style={{ fontWeight: 'bold', fontSize: '24px', color: '#333' }}>AnalyzrX</span>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
    </div>
  );
}

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
};

const formStyle = {
  background: 'white',
  padding: '40px',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  width: '100%',
  maxWidth: '400px'
};

const brandStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '30px'
};

const inputStyle = {
  width: '100%',
  padding: '12px 15px',
  marginBottom: '20px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  fontSize: '16px'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  background: '#764ba2',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontSize: '16px',
  cursor: 'pointer'
};

<h2 style={{ 
  textAlign: 'center', 
  marginBottom: '30px', 
  color: '#333', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  gap: '10px'
}}>
  <FaChartBar style={{ color: '#764ba2' }} />
  AnalyzrX
</h2>


export default Register;
