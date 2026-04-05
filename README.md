# Finance Dashboard

A responsive personal finance dashboard built with **React and Vite**.
The application allows users to manage transactions, visualize spending patterns, and export financial data. It simulates **viewer/admin roles**, provides **interactive charts**, and generates **basic insights** from transaction history.

The project is designed as a **frontend-focused demo application** showcasing UI design, state management, chart visualization, and data handling using modern React practices.

---

# Live Demo

[https://finance-dashboard-seven-wine.vercel.app

---

# Features

### Dashboard Overview

* Summary cards showing **Total Income, Total Expense, and Balance**
* Clean UI with responsive layout
* Automatic updates when transactions change

### Transaction Management

* Add new transactions (Admin mode)
* Edit existing transactions
* Delete transactions
* Categorize income and expenses

### Transaction Table

* Sort by **date, amount, or transaction type**
* Filter transactions by **category**
* Responsive table layout
* Empty-state handling for better UX

### Charts & Visualization

* **Monthly income vs expense** comparison chart
* **Expense distribution by category**
* Built with Chart.js for interactive visualization

### Insights System

Automatically generates useful insights including:

* Highest spending category
* Monthly income vs expense comparison
* Observational insight based on spending patterns

### Data Export

Export the currently filtered/sorted transactions as:

* **CSV**
* **JSON**

### Role Simulation

The application simulates two user roles:

**Viewer**

* Read-only access
* Can view dashboard, charts, and insights

**Admin**

* Can add, edit, and delete transactions
* Full access to transaction management

### UI Features

* Responsive layout
* Light/Dark mode toggle
* Smooth modal interactions
* Clean dashboard-style layout

---

# Tech Stack

Frontend

* **React**
* **Vite**

Visualization

* **Chart.js**
* **react-chartjs-2**

State & Storage

* React Hooks
* localStorage (for demo persistence)

Styling

* Custom CSS

---

# Project Structure

```
frontend/
  src/
    components/
      SummaryCards.jsx
      TransactionTable.jsx
      TransactionForm.jsx
      Charts.jsx
      Insights.jsx

    hooks/
      useTransactions.js

    utils/
      storage.js

    pages/
      Dashboard.jsx

    styles/
      globals.css

    App.jsx
    main.jsx
```

---

# Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/finance-dashboard.git
cd finance-dashboard
```

## 2. Install Dependencies

```bash
cd frontend
npm install
```

## 3. Start the Development Server

```bash
npm run dev
```

Open the URL shown in the terminal (usually):

```
http://localhost:5173
```

---

# Available Scripts

From the `frontend` directory:

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

Production files will be generated inside:

```
dist/
```

### Preview Production Build

```bash
npm run preview
```

---

# Usage Guide

### Selecting a Role

When the application starts you can choose between:

* **Viewer Mode**
* **Admin Mode**

Admin mode unlocks transaction management features.

---

### Adding Transactions

Admin users can add transactions by providing:

* Date
* Amount
* Category
* Type (Income / Expense)
* Description

---

### Sorting and Filtering

Transactions can be:

* Sorted by **date, amount, or type**
* Filtered by **category**

The table updates instantly based on selected options.

---

### Exporting Data

Click the **Download button** in the transaction table to export the current view as:

* CSV file
* JSON file

The export respects the **current sorting and filtering**.

---

# Data Storage

For demonstration purposes, transaction data is stored in:

```
localStorage
```

---

# Screenshots

![App Screenshots](./frontend/screenshots/homepage.png)
![App Screenshots](./frontend/screenshots/charts.png)
![App Screenshots](./frontend/screenshots/transactions.png)

---

