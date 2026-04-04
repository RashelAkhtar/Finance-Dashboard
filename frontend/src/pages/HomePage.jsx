import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import "../styles/HomePage.css";

export default function HomePage() {
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") ?? "light");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSelectRole = (selectedRole) => {
    localStorage.setItem("userRole", selectedRole);
    setShowRoleSelector(false);
    navigate("/dashboard");
  };

  return (
    <div className="home">
      {/* ── Navbar ── */}
      <header className="home-hero">
        <Header
          theme={theme}
          onToggleTheme={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
          primaryActionLabel="Get Started"
          onPrimaryAction={() => setShowRoleSelector(true)}
        />

        {/* ── Hero grid ── */}
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Finance, simplified</span>
            <h1>
              Run your money<br />
              like a <em>product.</em>
            </h1>
            <p className="hero-sub">
              Track cashflow, forecast expenses, and spot trends instantly. FinForge is a
              modern finance workspace designed for clarity, speed, and confidence.
            </p>
            <div className="hero-actions">
              <button
                type="button"
                onClick={() => setShowRoleSelector(true)}
                className="home-primary-btn"
              >
                Start for Free →
              </button>
              <button
                type="button"
                className="home-secondary-btn"
                onClick={() => handleSelectRole("viewer")}
              >
                View Live Demo
              </button>
            </div>
            <div className="trust-row">
              <div>
                <strong>4.9/5</strong>
                <span>Finance teams love us</span>
              </div>
              <div>
                <strong>120k+</strong>
                <span>Monthly insights delivered</span>
              </div>
              <div>
                <strong>ISO-ready</strong>
                <span>Bank-grade security</span>
              </div>
            </div>
          </div>

          {/* ── Hero card ── */}
          <div className="hero-card">
            <div className="hero-card-header">
              <p>Live cashflow</p>
              <span>Updated now</span>
            </div>
            <div className="hero-balance">
              <h2>₹ 2,48,920</h2>
              <p>Projected balance · next 30 days</p>
            </div>
            <div className="hero-metrics">
              <div className="metric-tile">
                <span>Incoming</span>
                <strong>₹ 5.4L</strong>
              </div>
              <div className="metric-tile">
                <span>Outgoing</span>
                <strong>₹ 3.1L</strong>
              </div>
              <div className="metric-tile">
                <span>Runway</span>
                <strong>8.6 mo</strong>
              </div>
            </div>
            <div className="hero-sparkline">
              <span /><span /><span /><span /><span /><span />
            </div>
          </div>
        </div>
      </header>

      {/* ── Why FinForge ── */}
      <section className="home-section">
        <div className="section-heading">
          <span className="eyebrow">Why FinForge</span>
          <h2>Everything your finance team needs,<br />in one flow.</h2>
        </div>
        <div className="feature-grid">
          <article>
            <h3>Unified transactions</h3>
            <p>Collect income, expenses, and categories in one scrollable ledger with instant filters.</p>
          </article>
          <article>
            <h3>Instant snapshots</h3>
            <p>See the pulse of your balance with auto-calculated highlights and trend indicators.</p>
          </article>
          <article>
            <h3>Predictive charts</h3>
            <p>Visualize the spend mix and make fast, decisive adjustments with live chart feedback.</p>
          </article>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="home-section accent">
        <div className="steps-grid">
          <div>
            <span className="eyebrow">How it works</span>
            <h2>From setup to insights<br />in minutes.</h2>
          </div>
          <div className="step-cards">
            <div className="step-card">
              <span>01</span>
              <div>
                <h4>Choose a workspace</h4>
                <p>Pick Viewer or Admin mode to shape your dashboard experience and permissions.</p>
              </div>
            </div>
            <div className="step-card">
              <span>02</span>
              <div>
                <h4>Log transactions</h4>
                <p>Capture income and expense details instantly with clean, minimal forms.</p>
              </div>
            </div>
            <div className="step-card">
              <span>03</span>
              <div>
                <h4>Track momentum</h4>
                <p>Monitor balance health and category movement at a glance with real-time charts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="home-section">
        <div className="cta-banner">
          <div>
            <span className="eyebrow">Ready to launch?</span>
            <h2>Build a smarter finance<br />rhythm today.</h2>
            <p>Get the calm, control, and clarity you deserve.</p>
          </div>
          <button
            type="button"
            className="home-primary-btn"
            onClick={() => setShowRoleSelector(true)}
          >
            Create Workspace →
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="home-footer">
        <p>FinForge Finance Dashboard · Crafted for modern teams.</p>
      </footer>

      {/* ── Role modal ── */}
      {showRoleSelector && (
        <div className="role-overlay" role="dialog" aria-modal="true">
          <div className="role-card">
            <button
              type="button"
              onClick={() => setShowRoleSelector(false)}
              className="close-btn"
              aria-label="Close"
            >
              ×
            </button>
            <span className="eyebrow">Choose your mode</span>
            <h3>Select your role</h3>
            <p className="role-sub">
              Viewer mode explores insights. Admin mode unlocks transaction edits and full controls.
            </p>
            <div className="role-actions">
              <button onClick={() => handleSelectRole("viewer")} className="home-secondary-btn">
                Continue as Viewer
              </button>
              <button onClick={() => handleSelectRole("admin")} className="home-primary-btn">
                Continue as Admin →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}