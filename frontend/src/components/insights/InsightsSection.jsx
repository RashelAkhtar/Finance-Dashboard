import "./InsightsSection.css";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatPercent = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(value);

const isSameMonth = (date, ref) =>
  date.getFullYear() === ref.getFullYear() && date.getMonth() === ref.getMonth();

export default function InsightsSection({ transactions }) {
  const expenseByCategory = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => {
      const category = tx.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + tx.amount;
      return acc;
    }, {});

  const highestCategory = Object.entries(expenseByCategory).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const now = new Date();
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const monthly = transactions.reduce(
    (acc, tx) => {
      const parsed = new Date(tx.date);
      if (Number.isNaN(parsed.getTime())) return acc;

      if (isSameMonth(parsed, now)) {
        acc.current.total += tx.amount;
        if (tx.type === "income") acc.current.income += tx.amount;
        if (tx.type === "expense") acc.current.expense += tx.amount;
      }

      if (isSameMonth(parsed, prevMonth)) {
        acc.previous.total += tx.amount;
        if (tx.type === "income") acc.previous.income += tx.amount;
        if (tx.type === "expense") acc.previous.expense += tx.amount;
      }

      return acc;
    },
    {
      current: { total: 0, income: 0, expense: 0 },
      previous: { total: 0, income: 0, expense: 0 },
    },
  );

  const diff = monthly.current.expense - monthly.previous.expense;
  const diffAbs = Math.abs(diff);
  const diffDir = diff > 0 ? "higher" : diff < 0 ? "lower" : "flat";
  const diffPct =
    monthly.previous.expense > 0 ? diffAbs / monthly.previous.expense : null;

  const expenseTotal = Object.values(expenseByCategory).reduce(
    (sum, val) => sum + val,
    0,
  );

  const topCategoryShare =
    highestCategory && expenseTotal > 0 ? highestCategory[1] / expenseTotal : null;

  const hasData = transactions.length > 0;

  let observation = "Add a few transactions to unlock insights.";
  let comparisonNote = "Expenses match last month.";
  if (diffDir !== "flat") {
    comparisonNote = `Expenses are ${diffDir} than last month`;
  }

  if (hasData) {
    if (monthly.current.income >= monthly.current.expense) {
      observation = `Income covers expenses by ${formatCurrency(
        monthly.current.income - monthly.current.expense,
      )} this month.`;
    } else {
      observation = `Spending exceeds income by ${formatCurrency(
        monthly.current.expense - monthly.current.income,
      )} this month.`;
    }
  }

  return (
    <section className="insights-card">
      <div className="insights-head">
        <div>
          <p className="insights-kicker">Insights</p>
          <h3>Quick observations</h3>
        </div>
        <span className="insights-tag">Auto-generated</span>
      </div>

      {!hasData ? (
        <div className="insights-empty">
          Add transactions to surface the most useful insights here.
        </div>
      ) : (
        <div className="insights-grid">
          <div className="insight-tile">
            <span className="insight-label">Highest Spending Category</span>
            <span className="insight-value">
              {highestCategory ? highestCategory[0] : "No expenses yet"}
            </span>
            <span className="insight-sub">
              {highestCategory
                ? `${formatCurrency(highestCategory[1])} total`
                : "Log an expense to see category leaders."}
              {highestCategory && topCategoryShare != null
                ? ` · ${formatPercent(topCategoryShare)} of expenses`
                : ""}
            </span>
          </div>

          <div className="insight-tile">
            <span className="insight-label">Monthly Comparison</span>
            <span className="insight-value">
              {diffDir === "flat"
                ? "Flat vs last month"
                : `${formatCurrency(diffAbs)} ${diffDir}`}
            </span>
            <span className="insight-sub">
              {monthly.previous.expense === 0
                ? "Last month has no expense data yet."
                : comparisonNote}
              {diffPct != null ? ` · ${formatPercent(diffPct)} change` : ""}
            </span>
          </div>

          <div className="insight-tile">
            <span className="insight-label">Useful Observation</span>
            <span className="insight-value">This month</span>
            <span className="insight-sub">{observation}</span>
          </div>
        </div>
      )}
    </section>
  );
}
