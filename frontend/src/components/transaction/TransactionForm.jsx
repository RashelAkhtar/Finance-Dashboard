import { useEffect, useState } from "react";
import "./TransactionForm.css";

const INITIAL_FORM = {
  date: "",
  amount: "",
  category: "",
  type: "expense",
  description: "",
};

export default function TransactionForm({
  addTransaction,
  editingTx,
  onUpdateTransaction,
  onCancelEdit,
}) {
  const buildFormData = (tx) =>
    tx
      ? {
          date: tx.date || "",
          amount: tx.amount?.toString?.() ?? "",
          category: tx.category || "",
          type: tx.type || "expense",
          description: tx.description || "",
        }
      : INITIAL_FORM;

  const [formData, setFormData] = useState(() => buildFormData(editingTx));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // in amount section, remove everything except numbers and a single decimal point
    if (name === "amount") {
      value = value.replace(/,/g, "").replace(/\s/g, "");
    }

    // handle emojis in description
    if (name === "description") {
      const emojiRegex =
        /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
      value = value.replace(emojiRegex, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData(INITIAL_FORM);
    setError("");
    onCancelEdit?.();
  };

  // Sync form when entering/existing edit mode
  useEffect(() => {
    if (editingTx) {
      setFormData({
        ...editingTx,
        amount: editingTx.amount?.toString() || "",
      });
    } else {
      setFormData(INITIAL_FORM);
    }
  }, [editingTx]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Numeric Validation
    const cleanDescription = formData.description.trim();
    const numericAmount = parseFloat(formData.amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount greater than 0.");
      setIsLoading(false);
      return;
    }

    if (new Date(formData.date) > new Date()) {
      setError("Transaction date cannot be in future.");
      setIsLoading(false);
      return;
    }

    try {
      const payload = { ...formData, description: cleanDescription, amount: numericAmount };

      if (editingTx) {
        await onUpdateTransaction?.({
          ...editingTx,
          ...payload,
        });
      } else {
        addTransaction({
          ...payload,
          id: Date.now(),
        });
        setFormData(INITIAL_FORM);
      }
    } catch {
      setError("Failed to save transaction.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="tx-form-card">
      <div className="tx-form-head">
        <div>
          <p className="tx-kicker">Admin actions</p>
          <h3>{editingTx ? "Update transaction" : "Log a new transaction"}</h3>
        </div>
        <span className="tx-chip">{editingTx ? "Editing" : "New entry"}</span>
      </div>

      <form onSubmit={handleSubmit} className="tx-form">
        {error && (
          <p className="error-message" style={{ color: "#ff4d4f" }}>
            {error}
          </p>
        )}
        <label>
          Date
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            max={new Date().toISOString().split("T")[0]}
          />
        </label>

        <label>
          Amount
          <input
            type="text"
            inputMode="decimal"
            name="amount"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Salary">Salary</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Freelance">Freelance</option>
            <option value="Investment">Investment</option>
          </select>
        </label>

        <label>
          Type
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        <label className="span-two">
          Description
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            maxLength={100}
          />
        </label>

        <div className="tx-actions">
          <button type="submit" className="primary-btn" disabled={isLoading}>
            {isLoading ? "Saving..." : editingTx ? "Update" : "Add"}
          </button>
          {editingTx && (
            <button
              type="button"
              className="ghost-btn"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
