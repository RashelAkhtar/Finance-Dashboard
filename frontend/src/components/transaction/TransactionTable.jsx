import { useState } from "react";
import "./TransactionTable.css";

export default function TransactionTable({ transactions, onEdit, onDelete }) {
  const [sortBy, setSortBy] = useState("date"); // Default sorting by Date
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order

  const sortOptions = [
    { key: "date", label: "Date", icon: "📅" },
    { key: "amount", label: "Amount", icon: "💰" },
    { key: "type", label: "Type", icon: "🏷️" },
    { key: "category", label: "Category", icon: "📂" },
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
    if (raw == null) {
      return "";
    }
    return String(raw).toLowerCase();
  };

  // Sorting logic based on sortBy and sortOrder
  const sortedData = [...transactions].sort((a, b) => {
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
  }
  
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

            {/* Improved Sorting Controls */}
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
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="sorting-actions">
          <button onClick={resetSorting} className="reset-btn" title="Reset to default">
            🔄 Reset
          </button>
          
        </div>
      </div>

      {/* Active sort indicator */}
      <div className="active-sort-info">
        <span className="info-badge">
          Currently sorted by: <strong>{sortBy}</strong> 
          ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </span>
      </div>

      <div className="tx-table-wrap">
        <table className="tx-table">
          <thead>
            <tr>
              <th>
                Date
              </th>
              <th>
                Amount
              </th>
              <th>
                Category
              </th>
              <th>
                Type
              </th>
              <th>
                Description
              </th>
              {showActions && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {sortedData.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.date}</td>
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
                        <button type="button" className="action-btn" onClick={() => onEdit(tx)}>
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
    </section>
  );
}
