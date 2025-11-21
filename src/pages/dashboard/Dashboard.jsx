import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import DoughnutChart from '../../components/Charts/DoughnutChart';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Main Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2 className="dashboard-card-title">Sales</h2>
          <p className="dashboard-card-metric">1,234 Leads</p>
          <Link to="/sales" className="dashboard-card-link">Go to Sales</Link>
        </div>
        <div className="dashboard-card">
          <h2 className="dashboard-card-title">Credit</h2>
          <p className="dashboard-card-metric">567 Approvals</p>
          <Link to="/credit" className="dashboard-card-link">Go to Credit</Link>
        </div>
        <div className="dashboard-card">
          <h2 className="dashboard-card-title">Legal</h2>
          <p className="dashboard-card-metric">89 Agreements</p>
          <Link to="/legal" className="dashboard-card-link">Go to Legal</Link>
        </div>
        <div className="dashboard-card">
          <h2 className="dashboard-card-title">Valuation</h2>
          <p className="dashboard-card-metric">45 Verifications</p>
          <Link to="/valuation" className="dashboard-card-link">Go to Valuation</Link>
        </div>
        <div className="dashboard-card">
          <h2 className="dashboard-card-title">Finance</h2>
          <p className="dashboard-card-metric">$1.2M Disbursed</p>
          <Link to="/finance" className="dashboard-card-link">Go to Finance</Link>
        </div>
        <div className="dashboard-card">
          <h2 className="dashboard-card-title">Overall Metrics</h2>
          <DoughnutChart data={{ labels: ['Red', 'Blue', 'Yellow'], datasets: [{ data: [300, 50, 100] }] }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
