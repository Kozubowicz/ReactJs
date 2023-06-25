import React from "react";

export default function ListDB({ bases, dataBaseName }) {
  const setDataBase = (value) => {
    dataBaseName(value);
  };

  return (
    <div className="dataBasesContainer">
      {bases.map((e) => (
        <button key={e} value={e} onClick={(event) => setDataBase(event.target.value)}>
          {e}
        </button>
      ))}
    </div>
  );
}
