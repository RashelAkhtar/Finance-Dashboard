import { useState } from "react";
import "./TransactionTable.css";

export default function TransactionTable({ transactions, onEdit, onDelete }) {
  const [sortBy, setSortBy] = useState("date"); // Default sorting by Date
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [downloadWindow, setDownloadWindow] = useState(false);
  const [downloadClosing, setDownloadClosing] = useState(false);

  const sortOptions = [
    { key: "date", label: "Date", icon: "📅" },
    { key: "amount", label: "Amount", icon: "💰" },
    { key: "type", label: "Type", icon: "🏷️" },
  ];

  // Function to handle sorting
  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const normalizeValue = (tx, key) => {
    const raw = tx[key];
    if (key === "date") {
      const time = Date.parse(raw);
      return Number.isNaN(time) ? 0 : time;
    }
    if (key === "amount") {
      const num = Number(raw);
      return Number.isNaN(num) ? 0 : num;
    }
    if (key === "type") {
      if (raw === "income") return 0;
      if (raw === "expense") return 1;
      return 2;
    }
    if (raw == null) {
      return "";
    }
    return String(raw).toLowerCase();
  };

  const getSortLabel = () => {
    if (sortBy === "type") {
      return sortOrder === "asc" ? "Income first" : "Expense first";
    }
    return sortOrder === "asc" ? "Ascending" : "Descending";
  };

  const formatDate = (value) => {
    if (!value) return "";
    const time = Date.parse(value);
    if (Number.isNaN(time)) return value;
    return new Date(time).toLocaleDateString("en-GB");
  };

  const categories = Array.from(
    new Set(transactions.map((tx) => tx.category).filter(Boolean)),
  ).sort((a, b) => a.localeCompare(b));

  const filteredData =
    categoryFilter === "all"
      ? transactions
      : transactions.filter((tx) => tx.category === categoryFilter);

  // Sorting logic based on sortBy and sortOrder
  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = normalizeValue(a, sortBy);
    const bValue = normalizeValue(b, sortBy);
    if (aValue < bValue) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Reset all sorting
  const resetSorting = () => {
    setSortBy("date");
    setSortOrder("asc");
    setCategoryFilter("all");
  };

  const openDownload = () => {
    setDownloadClosing(false);
    setDownloadWindow(true);
  };

  const closeDownload = () => {
    setDownloadClosing(true);
    window.setTimeout(() => {
      setDownloadWindow(false);
      setDownloadClosing(false);
    }, 200);
  };

  // Download data
  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const payload = sortedData.map((tx) => ({
      id: tx.id,
      date: tx.date,
      amount: tx.amount,
      category: tx.category,
      type: tx.type,
      description: tx.description,
    }));
    downloadFile(
      JSON.stringify(payload, null, 2),
      "transactions.json",
      "application/json",
    );
  };

  const toCsvValue = (value) => {
    const str = value == null ? "" : String(value);
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const handleExportCSV = () => {
    const headers = [
      "id",
      "date",
      "amount",
      "category",
      "type",
      "description",
    ];
    const rows = sortedData.map((tx) =>
      [
        tx.id,
        tx.date,
        tx.amount,
        tx.category,
        tx.type,
        tx.description,
      ]
        .map(toCsvValue)
        .join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    downloadFile(csv, "transactions.csv", "text/csv");
  };

  if (!transactions.length) {
    return (
      <section className="tx-table-card empty">
        <div>
          <p className="tx-kicker">Transactions</p>
          <h3>No activity yet</h3>
          <p>Add your first income or expense to activate the ledger.</p>
        </div>
      </section>
    );
  }
  const showActions = Boolean(onEdit || onDelete);

  return (
    <section className="tx-table-card">
      <div className="tx-table-head">
        <div>
          <p className="tx-kicker">Ledger</p>
          <h3>Recent transactions</h3>
        </div>
        <span className="tx-count">{transactions.length} records</span>
      </div>

      <div className="sorting-controls">
        <div className="sorting-group">
          <span className="sort-label">Sort by:</span>
          <div className="sort-buttons">
            {sortOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleSort(option.key)}
                className={`sort-btn ${sortBy === option.key ? "active" : ""}`}
              >
                <span className="sort-icon">{option.icon}</span>
                {option.label}
                {sortBy === option.key && (
                  <span className="sort-direction">
                    {option.key === "type"
                      ? sortOrder === "asc"
                        ? "(Income)"
                        : "(Expense)"
                      : sortOrder === "asc"
                        ? "↑"
                        : "↓"}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="sorting-actions">
          {/* Filter Category */}
          <div className="filter-group">
            <label className="filter-label" htmlFor="categoryFilter">
              📋 Category:
            </label>
            <select
              id="categoryFilter"
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Resert sorting and filtering */}
          <button
            onClick={resetSorting}
            className="reset-btn"
            title="Reset to default"
          >
            🔄 Reset
          </button>

          <button
            onClick={openDownload}
            className="export-btn"
            title="Download"
          >
            ⤓ Download
          </button>
        </div>
      </div>

      {/* Active sort indicator */}
      <div className="active-sort-info">
        <span className="info-badge">
          Currently sorted by: <strong>{sortBy}</strong> ({getSortLabel()}) |
          Category:{" "}
          <strong>{categoryFilter === "all" ? "All" : categoryFilter}</strong>
        </span>
      </div>

      <div className="tx-table-wrap">
        <table className="tx-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th>Description</th>
              {showActions && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {sortedData.map((tx) => (
              <tr key={tx.id}>
                <td>{formatDate(tx.date)}</td>
                <td>₹{tx.amount}</td>
                <td>{tx.category}</td>
                <td>
                  <span className={`tx-type ${tx.type}`}>{tx.type}</span>
                </td>
                <td>{tx.description}</td>
                {showActions && (
                  <td>
                    <div className="table-actions">
                      {onEdit && (
                        <button
                          type="button"
                          className="action-btn"
                          onClick={() => onEdit(tx)}
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          type="button"
                          className="action-btn danger"
                          onClick={() => onDelete(tx.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {downloadWindow && (
        <div
          className={`download-overlay ${downloadClosing ? "closing" : ""}`}
          role="dialog"
          aria-modal="true"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDownload();
            }
          }}
        >
          <div className={`download-modal ${downloadClosing ? "closing" : ""}`}>
            <div className="download-head">
              <div>
                <p className="download-kicker">Export</p>
                <h4>Download transactions</h4>
              </div>
              <button
                type="button"
                className="download-close"
                onClick={closeDownload}
                aria-label="Close download window"
              >
                ×
              </button>
            </div>
            <div className="download-actions">
              <button
                onClick={() => {
                  handleExportCSV();
                  closeDownload();
                }}
                className="export-btn"
                title="Export CSV"
              >
                ⤓ CSV
              </button>
              <button
                onClick={() => {
                  handleExportJSON();
                  closeDownload();
                }}
                className="export-btn"
                title="Export JSON"
              >
                ⤓ JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
