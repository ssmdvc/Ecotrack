import React from 'react';
import "./Dashboard.scss";
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Map from "../../Components/Map/Map";
import { Link } from "react-router-dom";
import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  // Sample data for the bar chart (garbage collected over a week)
  const weeklyGarbageData = [
    { day: "Monday", garbage: 1200 },
    { day: "Tuesday", garbage: 1500 },
    { day: "Wednesday", garbage: 800 },
    { day: "Thursday", garbage: 2000 },
    { day: "Friday", garbage: 2200 },
    { day: "Saturday", garbage: 2500 },
    { day: "Sunday", garbage: 3000 },
  ];

  // Calculate the total garbage collected over the week
  const totalGarbageCollected = weeklyGarbageData.reduce((total, day) => total + day.garbage, 0);

  const truckData = [
    { id: "CY0987", driver: "Ronaldo Cruz", phone: "09274580033", status: "Active" },
    { id: "TH1233", driver: "Juan Santolan", phone: "09274580033", status: "Inactive" },
    { id: "BL5678", driver: "Danilo Dellave", phone: "09274580033", status: "Active" },
  ];

  // Sample donut chart data
  const donutData = [
    { name: "Collected", value: 75 },
    { name: "Remaining", value: 25 },
  ];

  // Colors for the pie chart
  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='dashboardContainer'>
        <Navbar />

        <div className='section1'>
          <div className="left-div"> 
            <Map/>
          </div>

          <div className="right-div">
            <div className="dis-div">
              <div className="disposal-icon">
                <Link to="/request" className="custom-link">
                  <AccountBoxIcon className="dis-icon" />
                </Link>
                <div className="reqNum">
                  2
                </div>
                <div className="Dis-line"></div>
                <div className="disposalText">
                  Disposal Request
                </div>
              </div>
            </div>

            <div className="feed-div">
              <div className="disposal-icon">
                <Link to="/feedback" className="custom-link">
                  <AccountBoxIcon className="dis-icon" />
                </Link>
                <div className="reqNum">
                  2
                </div>
                <div className="Dis-line"></div>
                <div className="feedText">
                  User Feedback
                </div>
              </div>
            </div>
          </div>
        </div>
 
        <div className='section2'>
          <div className="right1-div"> 
            <div className="right1-divContent">
              <h2>Garbage Collected this Week </h2>
              <BarChart
                width={800}
                height={200}
                data={weeklyGarbageData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 20, // Increased bottom margin to ensure X-axis labels are visible
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis 
                  label={{ value: "", angle: -90, position: "insideLeft", dy: 50 }}
                  tickFormatter={(value) => `${value} kg`} 
                />
                <Tooltip />
                <Bar dataKey="garbage" fill="#8884d8" />
              </BarChart>
              <div className="totalGarbage">
                <p>Total Garbage Collected This Week: {totalGarbageCollected} kg</p>
              </div>
            </div>
          </div>

          <div className="left1-div">
            <div className="Track-div">
              <div className="card">
                <h3>View Garbage Analytics</h3>

                {/* Donut chart */}
                <PieChart width={300} height={150}>
                  <Pie
                    data={[
                      { name: "Collected", value: 98}, // dynamic data when connected to the backend
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    innerRadius={50}
                    fill="#2e4374"
                    label
                  >
                    <Cell fill="#2e4374" />
                  </Pie>
                  <Tooltip />
                </PieChart>
                
                <p className="totalCollected">Total Collected Today</p>

                <div className="trackingStats">
                  <div>
                    <p className="Stats">Last Week</p>
                    <span className="percentage">+12%</span>
                  </div>
                  <div>
                    <p className="Stats">Last Month</p>
                    <span className="percentage">+32%</span>
                  </div>
                  <div>
                    <p className="Stats">Last Year</p>
                    <span className="percentage">-50%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;