import {BrowserRouter, Route, Routes} from "react-router-dom";

import HomePage from "./pages/HomePage"
import Dashboard from "./pages/Dashboard";

import "./styles/HomePage.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
