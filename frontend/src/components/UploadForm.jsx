import React, { useState } from 'react';
import axios from 'axios';
import ChartDisplay from './ChartDisplay';
import './UploadForm.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData);
      const { headers, rows } = res.data;

      setHeaders(headers);

      // Convert array rows to object rows using headers
      const transformedData = rows.map((row) => {
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = row[i];
        });
        return obj;
      });

      setData(transformedData);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleGenerateSummary = async () => {
  try {
    setLoadingSummary(true);
    const res = await axios.post('http://localhost:5000/generate-summary', {
      data: data,
    });
    setSummary(res.data.summary); 
    setLoadingSummary(false);
  } catch (error) {
    console.error('AI Summary generation failed:', error);
    setLoadingSummary(false);
  }
};
return (
  <div className="upload-form-container">
    <h2>📂 Upload Excel File</h2>
    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    <button onClick={handleUpload}>Upload</button>

    {headers.length > 0 && (
      <div className="select-section">
        <select onChange={(e) => setXAxis(e.target.value)} value={xAxis}>
          <option value="">Select X Axis</option>
          {headers.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
        <select onChange={(e) => setYAxis(e.target.value)} value={yAxis}>
          <option value="">Select Y Axis</option>
          {headers.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
        <select onChange={(e) => setChartType(e.target.value)} value={chartType}>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
        </select>
      </div>
    )}

    
    {data.length > 0 && (
      <div className="summary-section">
        <button onClick={handleGenerateSummary} disabled={loadingSummary}>
          {loadingSummary ? 'Generating Summary...' : '🧠 Generate AI Summary'}
        </button>
      </div>
    )}

    
    {summary && (
      <div className="summary-box">
        <h3>AI Summary 📝</h3>
        <p>{summary}</p>
      </div>
    )}

    
    {data.length > 0 && (
      <div className="chart-section">
        <ChartDisplay data={data} xAxis={xAxis} yAxis={yAxis} type={chartType} />
      </div>
    )}
  </div>
);

}
export default UploadForm;
