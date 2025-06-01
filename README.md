# Grid Manager 2.0 Dashboard

This is a full-stack dashboard application for energy grid management with peak shaving alerts.

## Features

- User authentication and protected routes
- Interactive dashboard with sidebar navigation
- Peak shaving view with power consumption graph
- Alert creation form with validation
- Alert management table with CRUD operations
- Responsive design for all screen sizes

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Formik, Yup, ApexCharts
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Start the backend server:
   ```
   npm run server
   ```
5. Or run both concurrently:
   ```
   npm run dev:all
   ```

## Demo Credentials

- Email: admin@example.com
- Password: password123

## Project Structure

- `/src` - Frontend React application
  - `/components` - Reusable UI components
  - `/context` - React context for state management
  - `/pages` - Page components
  - `/utils` - Utility functions
- `/server` - Backend Node.js application
  - `/models` - MongoDB schemas
  - `/routes` - API routes
  - `/middleware` - Express middleware
  - `/utils` - Utility functions