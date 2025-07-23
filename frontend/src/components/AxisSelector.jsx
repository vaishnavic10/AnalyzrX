import React, { useState } from 'react';

const AxisSelector = ({ columns }) => {
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');

  return (
    <div className="axis-selector">
      <label>X-Axis:</label>
      <select onChange={(e) => setXAxis(e.target.value)} value={xAxis}>
        {columns.map(col => <option key={col}>{col}</option>)}
      </select>

      <label>Y-Axis:</label>
      <select onChange={(e) => setYAxis(e.target.value)} value={yAxis}>
        {columns.map(col => <option key={col}>{col}</option>)}
      </select>
    </div>
  );
};

export default AxisSelector;
