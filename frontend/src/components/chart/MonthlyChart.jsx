import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import "./MonthlyChart.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthlyChart({ transactions }) {
  const rootStyles = typeof window !== "undefined"
    ? getComputedStyle(document.documentElement)
    : null;
  const textColor = rootStyles?.getPropertyValue("--ink-2")?.trim() || "#1e2230";
  const gridColor = rootStyles?.getPropertyValue("--mist-3")?.trim() || "#c8cede";

  const income = Array(12).fill(0);
  const expense = Array(12).fill(0);

  transactions.forEach((tx) => {
    const parsed = new Date(tx.date);
    if (Number.isNaN(parsed.getTime())) return;
    const month = parsed.getMonth();
    if (tx.type === "income") {
      income[month] += tx.amount;
    } else {
      expense[month] += tx.amount;
    }
  });

  const hasData = income.some((val) => val > 0) || expense.some((val) => val > 0);

  const data = {
    labels: MONTH_LABELS,
    datasets: [
      {
        label: "Income",
        data: income,
        backgroundColor: "rgba(34, 197, 94, 0.65)",
        borderRadius: 10,
      },
      {
        label: "Expense",
        data: expense,
        backgroundColor: "rgba(249, 115, 22, 0.65)",
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom", labels: { color: textColor } },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: textColor } },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor, callback: (value) => `₹${value}` },
      },
    },
  };

  return (
    <section className="monthly-card">
      <div className="monthly-head">
        <div>
          <p className="chart-kicker">Monthly trends</p>
          <h3>Income vs Expense</h3>
        </div>
        <span className={`chart-tag ${hasData ? "live" : "empty"}`}>
          {hasData ? "Live" : "Awaiting data"}
        </span>
      </div>
      <div className="monthly-body">
        {hasData ? (
          <Bar data={data} options={options} />
        ) : (
          <div className="chart-empty">Add transactions to see monthly movement.</div>
        )}
      </div>
    </section>
  );
}
