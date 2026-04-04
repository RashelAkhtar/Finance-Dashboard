import SummaryCard from "./SummaryCard";
import "./SummarySection.css";

export default function SummarySection({transactions}) {
    const totalIncome = transactions.filter(tx => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0);

    const totalExpense = transactions.filter(tx => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0);

    const balance = totalIncome - totalExpense;

  return (
    <section className="summary-section">
      <div className="summary-header">
        <div>
          <p className="summary-kicker">Snapshot</p>
          <h2>Balance pulse</h2>
        </div>
        <span className="summary-pill">{transactions.length} transactions</span>
      </div>
      <div className="summary-grid">
        <SummaryCard title="Total Income" value={totalIncome} tone="income" />
        <SummaryCard title="Total Expense" value={totalExpense} tone="expense" />
        <SummaryCard title="Balance" value={balance} tone="balance" />
      </div>
    </section>
  )
}
