import "./TransactionTable.css";

export default function TransactionTable({ transactions, onEdit, onDelete }) {
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
            {transactions.map((tx) => (
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
