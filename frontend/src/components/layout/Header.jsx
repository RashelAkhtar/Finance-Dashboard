import {useNavigate} from "react-router-dom"

import "./Header.css";

export default function Header({
  theme,
  onToggleTheme,
  primaryActionLabel,
  onPrimaryAction,
  rightSlot,
}) {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="app-header-logo-wrap">
        <span className="app-header-logo" onClick={() => navigate("/")}>Zorvyn</span>
      </div>

      <div className="app-header-actions">
        {rightSlot}

        <button type="button" className="app-header-toggle" onClick={onToggleTheme}>
          {theme === "light" ? "Dark mode" : "Light mode"}
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