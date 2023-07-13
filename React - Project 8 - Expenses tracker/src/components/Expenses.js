import React, { useState } from "react";

export default function Expenses({ data, selectedPeriod, onDataChange }) {
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const handleAddExpense = () => {
    if (selectedPeriod) {
      const expense = Number(expenseAmount);
      if (expense) {
        const updatedData = data.map((item) => {
          if (item.title === selectedPeriod) {
            const updatedExpenses = [
              {
                title: expenseTitle,
                amount: expense,
                date: new Date().toLocaleDateString(),
                id: new Date(),
              },
              ...item.expenses,
            ];
            return { ...item, expenses: updatedExpenses };
          }
          return item;
        });
        onDataChange(updatedData);
      }
      setExpenseTitle("");
      setExpenseAmount("");
    }
  };

  return (
    <div className="expense">
      <div>
        <h2>Add Expense:</h2>
      </div>
      <div>
        <input
          type="text"
          placeholder="Expense Title"
          value={expenseTitle}
          onChange={(e) => setExpenseTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="PLN"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
    </div>
  );
}
