import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";
import "./SpendingChart.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function SpendingChart({ transactions }) {

  const categoryTotals = {};

  transactions
    .filter(tx => tx.type === "expense")
    .forEach(tx => {
      if (!categoryTotals[tx.category]) {
        categoryTotals[tx.category] = 0;
      }

      categoryTotals[tx.category] += tx.amount;
    });

  const data = {
    labels: Object.keys(categoryTotals),

    datasets: [
      {
        label: "Spending",
        data: Object.values(categoryTotals),

        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#007eb0",
          "#d940ff",
          "#000000",
        ]
      }
    ]
  };

  const hasData = Object.keys(categoryTotals).length > 0;
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <section className="chart-card">
      <div className="chart-head">
        <div>
          <p className="chart-kicker">Spending mix</p>
          <h3>Expense Breakdown</h3>
        </div>
        <span className={`chart-tag ${hasData ? "live" : "empty"}`}>
          {hasData ? "Live" : "Awaiting data"}
        </span>
      </div>
      <div className="chart-body">
        {hasData ? (
          <div className="chart-pie-wrap">
            <Pie data={data} options={options} />
          </div>
        ) : (
          <div className="chart-empty">
            Add an expense to see the category split visualized here.
          </div>
        )}
      </div>
    </section>
  );
}
