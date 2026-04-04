import "./SummaryCard.css";

export default function SummaryCard({title, value, tone}) {
  return (
    <div className={`summary-card ${tone}`}>
      <div className="summary-card-top">
        <span className="summary-badge">{tone === "income" ? "IN" : tone === "expense" ? "OUT" : "NET"}</span>
        <p className="summary-title">{title}</p>
      </div>
      <p className="summary-value">₹{value}</p>
    </div>
  )
}
