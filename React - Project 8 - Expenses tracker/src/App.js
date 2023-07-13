import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Period from "./components/Period";
import Expenses from "./components/Expenses";
import History from "./components/History";
import Footer from "./components/Footer";

export default function App() {
  const [data, setData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("expenseData"));
    if (storedData) {
      setData(storedData);
      setSelectedPeriod(storedData[0]?.title || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenseData", JSON.stringify(data));
  }, [data]);

  const handleDataChange = (updatedData) => {
    setData(updatedData);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleAddPeriod = (period) => {
    setData((prevData) => [period, ...prevData]);
    setSelectedPeriod(period.title);
  };

  const handleDeletePeriod = (periodTitle) => {
    setData((prevData) => {
      const newData = prevData.filter((period) => period.title !== periodTitle);
      return newData;
    });
    setSelectedPeriod("");
  };

  const handleDeleteExpense = (expense) => {
    const updatedData = [...data];
    const periodIndex = updatedData.findIndex((period) => period.title === selectedPeriod);

    if (periodIndex !== -1) {
      const period = updatedData[periodIndex];
      const expenseIndex = period.expenses.findIndex((item) => item.id === expense.id);

      if (expenseIndex !== -1) {
        period.expenses = period.expenses.filter((item, index) => index !== expenseIndex);
        handleDataChange(updatedData);
      }
    }
  };

  return (
    <div className="App">
      <NavBar />
      <Period
        data={data}
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
        onAddPeriod={handleAddPeriod}
        onDeletePeriod={handleDeletePeriod}
      />
      <Expenses data={data} selectedPeriod={selectedPeriod} onDataChange={handleDataChange} />
      <History data={data} selectedPeriod={selectedPeriod} onDeleteExpense={handleDeleteExpense} />
      <Footer />
    </div>
  );
}
