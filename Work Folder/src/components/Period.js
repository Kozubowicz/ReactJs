import React from "react";

export default function Period({
  data,
  selectedPeriod,
  onPeriodChange,
  onAddPeriod,
  onDeletePeriod,
}) {
  const handlePeriodSelection = (event) => {
    const selectedPeriod = event.target.value;
    onPeriodChange(selectedPeriod);
  };

  const handleAddPeriod = () => {
    const title = prompt("Enter period title:");
    const budget = parseFloat(prompt("Enter period budget:"));
    const period = { title, budget, expenses: [] };
    onAddPeriod(period);
  };

  const handleDeletePeriod = () => {
    onDeletePeriod(selectedPeriod);
  };

  return (
    <div className="period">
      <h2>Period</h2>

      <div>
        <select value={selectedPeriod} onChange={handlePeriodSelection}>
          {data.map((period) => (
            <option key={period.title} value={period.title}>
              {period.title}
            </option>
          ))}
        </select>
        <button onClick={handleAddPeriod}>Add Period</button>
        <button onClick={handleDeletePeriod}>Delete Period</button>
      </div>
    </div>
  );
}
