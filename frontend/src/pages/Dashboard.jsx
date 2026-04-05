import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TransactionForm from "../components/transaction/TransactionForm";
import TransactionTable from "../components/transaction/TransactionTable";
import SummarySection from "../components/summary/SummarySection";
import SpendingChart from "../components/chart/SpendingChart";
import MonthlyChart from "../components/chart/MonthlyChart";
import InsightsSection from "../components/insights/InsightsSection";
import Header from "../components/layout/Header";

import "../styles/Dashboard.css";

function loadTransactions() {
  try {
    const data = localStorage.getItem("transaction-data");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(loadTransactions);
  const [editingTx, setEditingTx] = useState(null);
  const [role, setRole] = useState(() => localStorage.getItem("userRole"));
  const [toast, setToast] = useState(null);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") ?? "light",
  );

  useEffect(() => {
    if (!role) navigate("/", { replace: true });
  }, [role, navigate]);

  useEffect(() => {
    localStorage.setItem("transaction-data", JSON.stringify(transaction));
  }, [transaction]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const dismissToast = () => {
    setToast((prev) => (prev ? { ...prev, closing: true } : prev));
    window.setTimeout(() => setToast(null), 200);
  };

  useEffect(() => {
    if (!toast || toast.closing) return undefined;
    const timeout = window.setTimeout(() => {
      dismissToast();
    }, 2500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const showToast = (message, tone = "success") => {
    setToast({ message, tone, closing: false, id: Date.now() });
  };

  const addTransaction = (tx) => {
    setTransaction((prev) => [...prev, tx]);
    showToast("Transaction added.");
  };

  const deleteTransaction = (id) => {
    setTransaction((prev) => prev.filter((tx) => tx.id !== id));
    if (editingTx?.id === id) setEditingTx(null);
    showToast("Transaction deleted.", "danger");
  };

  const startEdit = (tx) => setEditingTx(tx);

  const updateTransaction = (updatedTx) => {
    setTransaction((prev) =>
      prev.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx)),
    );
    setEditingTx(null);
    showToast("Transaction updated.");
  };

  if (!role) return null;

  return (
    <div className="dashboard-page">
      {/* ── Header ── */}
      <Header
        theme={theme}
        onToggleTheme={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
        rightSlot={
          <div className="role-switch">
            <label htmlFor="roleSelect">Role</label>
            <select
              id="roleSelect"
              value={role}
              onChange={(e) => {
                const nextRole = e.target.value;
                localStorage.setItem("userRole", nextRole);
                setRole(nextRole);
                if (!nextRole) navigate("/", { replace: true });
              }}
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        }
      />

      <main className="dash-main">
        <header className="dash-header">
          <div>
            <p className="dash-kicker">Finance command center</p>
            <h1>Welcome back.</h1>
            <p className="dash-sub">
              Keep cashflow clean, organized, and future-ready with quick
              insights.
            </p>
          </div>
        </header>

        <div className="dash-grid">
          <SummarySection transactions={transaction} />
          <SpendingChart transactions={transaction} />
        </div>

        <div className="dash-grid">
          <MonthlyChart transactions={transaction} />
          <InsightsSection transactions={transaction} />
        </div>

        {role === "admin" && (
          <TransactionForm
            key={editingTx?.id ?? "new"}
            addTransaction={addTransaction}
            editingTx={editingTx}
            onUpdateTransaction={updateTransaction}
            onCancelEdit={() => setEditingTx(null)}
          />
        )}

        <TransactionTable
          transactions={transaction}
          onEdit={role === "admin" ? startEdit : undefined}
          onDelete={role === "admin" ? deleteTransaction : undefined}
        />

        {toast && (
          <div className="toast-stack">
            <div
              className={`toast ${toast.tone} ${toast.closing ? "closing" : ""}`}
            >
              <span>{toast.message}</span>
              <button
                type="button"
                className="toast-close"
                onClick={dismissToast}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
