# Global Horizontal Irradiance (GHI) Visualization

A React-based web application that visualizes Global Horizontal Irradiance (GHI) data using an interactive time-series chart.

The application uses the combined GHI dataset generated in **Question 1**, exposes the data through a Node.js/Express REST API, and displays it through a responsive React frontend.

---

## 🔗 Live Demo

**Frontend:** https://chartdev-umber.vercel.app/

**Backend API:** https://chartapp-4nyu.onrender.com/api/ghi

**Backend:** https://chartapp-4nyu.onrender.com

## Project Overview

The application follows a simple client-server architecture:

```text
Combined GHI CSV
       │
       ▼
Node.js + Express Backend
       │
       │ GET /api/ghi
       ▼
React Frontend
       │
       ▼
Chart.js Visualization
```
