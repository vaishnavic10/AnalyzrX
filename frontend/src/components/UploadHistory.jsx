
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UploadHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/history') 
      .then(res => setHistory(res.data))
      .catch(err => console.error('Error fetching history:', err));
  }, []);

  return (
    <div>
      <h2>Upload History</h2>
      <ul>
        {history.map((file, index) => (
          <li key={index}>{file.fileName} - {new Date(file.uploadDate).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default UploadHistory;
