import { useState } from "react";
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

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTx) {
      onUpdateTransaction?.({
        ...editingTx,
        ...formData,
        amount: Number(formData.amount),
      });
      return;
    }

    addTransaction({
      ...formData,
      id: Date.now(),
      amount: Number(formData.amount),
    });

    setFormData(INITIAL_FORM);
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
        <label>
          Date
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Amount
          <input
            type="number"
            name="amount"
            placeholder="Amount"
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
            <option value="">Select Category</option>
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
          />
        </label>

        <div className="tx-actions">
          <button type="submit" className="primary-btn">
            {editingTx ? "Update Transaction" : "Add Transaction"}
          </button>
          {editingTx && (
            <button type="button" className="ghost-btn" onClick={onCancelEdit}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
