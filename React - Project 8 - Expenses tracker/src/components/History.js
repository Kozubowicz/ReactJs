import React from "react";

export default function History({ data, selectedPeriod, onDeleteExpense }) {
  const renderExpenses = () => {
    const period = data.find((period) => period.title === selectedPeriod);
    if (period && period.expenses) {
      return period.expenses.map((expense) => (
        <tr key={expense.title}>
          <td>{expense.title}</td>
          <td>{expense.amount}</td>
          <td>{expense.date}</td>
          <td>
            <button id="delete" onClick={() => onDeleteExpense(expense)}>
              X
            </button>
          </td>
        </tr>
      ));
    } else {
      return <p>No expenses available</p>;
    }
  };

  const budget = () => {
    const period = data.find((period) => period.title === selectedPeriod);
    if (period && period.expenses) {
      const totalAmount = period.expenses.reduce(
        (accumulator, expense) => accumulator + expense.amount,
        0
      );

      return (
        <div className="periodSummary">
          <b>{selectedPeriod}</b>
          <table id="summaryTable">
            <tbody>
              <tr>
                <td id="bug">{period.budget.toFixed(2)}</td>{" "}
                <td id="spen">{totalAmount.toFixed(2)}</td>
              </tr>
              <tr className="bottom">
                <td>budget</td>
                <td>spend</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="history">
      {budget()}
      <h4>Expense History</h4>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>PLN</th>
            <th>Date</th>
            <th> - </th>
          </tr>
        </thead>
        <tbody>{renderExpenses()}</tbody>
      </table>
    </div>
  );
}
