import { useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>📊 Excel Analytics Dashboard</h1>
        <p>Welcome to AnalyzrX — Effortlessly transform Excel data into interactive charts and AI Powered insights..</p>
      </div>

      <div className="features-section">
        <div className="feature-card" onClick={() => navigate('/upload')}>
          <h3>📂 Upload Excel Files</h3>
          <p>Supports `.xlsx` files to process and visualize your data instantly.</p>
        </div>
        <div className="feature-card" onClick={() => navigate('/analytics')}>
          <h3>📈 Interactive Charts</h3>
          <p>Select custom X/Y axes and generate Bar, Line, Pie or 3D charts dynamically.</p>
        </div>
        <div className="feature-card" onClick={() => navigate('/history')}>
          <h3>💾 Save History</h3>
          <p>Track your uploaded files, previously generated charts and download them.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
