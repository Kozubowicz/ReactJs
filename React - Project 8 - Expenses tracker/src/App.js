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
    setData((prevData) => [...prevData, period]);
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
    setData((prevData) => {
      const newData = prevData.map((period) => {
        if (period.title === selectedPeriod) {
          return {
            ...period,
            expenses: period.expenses.filter(
              (item) => item.title !== expense.title
            ),
          };
        }
        return period;
      });
      return newData;
    });
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
      <Expenses
        data={data}
        selectedPeriod={selectedPeriod}
        onDataChange={handleDataChange}
      />
      <History
        data={data}
        selectedPeriod={selectedPeriod}
        onDataChange={handleDataChange}
        onDeleteExpense={handleDeleteExpense}
      />
      <Footer />
    </div>
  );
}
