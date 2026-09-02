import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import "./App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function App() {
  const [ghiData, setGhiData] = useState([]);

  const [days, setDays] = useState(7);

  const [darkMode, setDarkMode] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  //fetching data from backend
  useEffect(() => {

    // fetching api url from local api, the backend requires node server.js in backend then npm run dev in frontend to work properly
    fetch("https://chartapp-4nyu.onrender.com/api/ghi")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch GHI data");
        }

        return response.json();
      })
      .then((data) => {
        setGhiData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);

        setError("Unable to load GHI data");
        setLoading(false);
      });
  }, []);

  //sorting data by date
  const sortedData = [...ghiData].sort((a, b) => {
    new Date(a.Date) - new Date(b.Date);
  });

  //get selected number of days
  const filteredData = sortedData.slice(-days);

  //for calculating statics
  const values = filteredData.map((item) => item.GHI);

  const max = values.length ? Math.max(...values) : 0;

  const min = values.length ? Math.min(...values) : 0;

  const average = values.length
    ? values.reduce((sum, value) => sum + value, 0) / values.length
    : 0;

  //chart data
  const chartData = {
    labels: filteredData.map((item) => item.Date),
    datasets: [
      {
        label: "GHI",
        data: filteredData.map((item) => item.GHI),
        borderColor: "#ef4444",
        backgroundColor: "#ef4444",
        pointBackgroundColor: "#ef4444",
        pointBorderColor: "#ef4444",
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  };

  //chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,

        callbacks: {
          label: (context) => {
            return `GHI: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,

        title: {
          display: true,
          text: "GHI",
        },
      },
    },
  };

  if (loading) {
    return <div className="loading">Loading GHI data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="dashboard">
        {/* header */}
        <header className="header">
          <div>
            <h1>GHI Monitoring Dashboard</h1>

            <p>Global Horizontal Irradiance</p>
          </div>

          {/* My custom feature {dark mode} */}
          <button
            className="theme-button"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </header>

        {/* time range button */}
        <div className="controls">
          <button
            className={days === 1 ? "active" : ""}
            onClick={() => setDays(1)}
          >
            1 Day
          </button>

          <button
            className={days === 7 ? "active" : ""}
            onClick={() => setDays(7)}
          >
            7 Days
          </button>

          <button
            className={days === 30 ? "active" : ""}
            onClick={() => setDays(30)}
          >
            30 Days
          </button>
        </div>

        {/* statics */}
        <div className="stats">
          <div className="stat-card maximum">
            <span>Maximum</span>

            <strong>{max.toFixed(2)}</strong>
          </div>

          <div className="stat-card minimum">
            <span>Minimum</span>

            <strong>{min.toFixed(2)}</strong>
          </div>

          <div className="stat-card average">
            <span>Average</span>

            <strong>{average.toFixed(2)}</strong>
          </div>
        </div>

        {/* chart */}
        <div className="chart-card">
          <h2>GHI Time Series</h2>

          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
