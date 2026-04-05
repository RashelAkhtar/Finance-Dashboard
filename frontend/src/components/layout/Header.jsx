import { useNavigate, useLocation } from "react-router-dom";

import "./Header.css";

function Header({
  theme,
  onToggleTheme,
  primaryActionLabel,
  onPrimaryAction,
  rightSlot,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="app-header">
      <button
        type="button"
        className="app-header-logo"
        onClick={() => navigate("/")}
        aria-label="Zorvyn, go to home"
      >
        Zorvyn
      </button>

      <nav className="app-header-center" aria-label="Page shortcuts">
        {isHome ? (
          <button
            type="button"
            className="app-header-text-link"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        ) : (
          <button
            type="button"
            className="app-header-text-link"
            onClick={() => navigate("/")}
          >
            Home
          </button>
        )}
      </nav>

      <div className="app-header-actions">
        {rightSlot}

        <button type="button" className="app-header-toggle" onClick={onToggleTheme}>
          {theme === "light" ? "Dark" : "Light"}
        </button>

        {primaryActionLabel && onPrimaryAction && (
          <button type="button" className="app-header-primary" onClick={onPrimaryAction}>
            {primaryActionLabel}
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
