import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./styles/App.css";

const NotFound = lazy(() => import("./pages/NotFound"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="app-loading">
            <div className="app-loading__card">
              <span className="app-loading__spinner" aria-hidden="true" />
              <div>
                <p className="app-loading__title">Loading</p>
                <p className="app-loading__text">
                  Please wait while we prepare the dashboard.
                </p>
              </div>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
