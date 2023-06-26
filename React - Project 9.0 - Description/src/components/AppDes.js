import React from "react";
import one from "./../images/1.jpg";
import two from "./../images/2.jpg";
import tree from "./../images/3.jpg";
import four from "./../images/4.jpg";
import five from "./../images/5.jpg";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function AppDes() {
  const code1 = `
  const [dataBasesList, setSataBasesList] = useState({});
  useEffect(() => {
    fetchData("databases")
      .then((data) => {
        setSataBasesList(data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);
  
  export default async function fetchData(name) {
    try {
      console.log(name);
      const response = await fetch("http://192.168.1.3:8080/api/$name");
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error("Error during downloading data", error);
      throw error;
    }
  }
  `;
  const code2 = `
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
  `;
  const code3 = `  
  const [dataBase, setDataBase] = useState();
  useEffect(() => {
    if (dataBase) {
      fetchData("dataBase/$dataBase")
        .then((data) => {
          setCollection(data);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  }, [dataBase, refreshData]);

  `;

  const code4 = `
  <div className="addRekord">
  <div className="addRekordButton">
    <button onClick={() => toggleHiddenClass(table[0])}>Add new rekord</button>
  </div>
  <div className={hiddenClasses[table[0]] ? "visibleRekordInputs" : "hidden"}>
    {table[1].slice(1).map((e, index) => {
      let typ = "text";
      if (e === "grade") {
        typ = "number";
      }

      if (e === "__v" || e === "created") {
        return null; //Skipping adding input for __v wich is validator for mongoose
      } else if (index !== table[1].length - 2) {
        return (
          <div key={e}>
            <b htmlFor={e}>{e}: </b>
            <input
              type={typ}
              placeholder={e}
              key={e}
              value={(inputValues[table[0]] && inputValues[table[0]][e]) || ""}
              onChange={(ff) => handleInputChange(e, ff.target.value, table[0])}
            />
          </div>
        );
      }

      return null; // Printing null if user shouldn't adding that type of dat
    })}

    <div className="addButtonContainer">
      {/**/}
      <div id="failure" className={serwerAnswer ? "hidden" : "visibleRekordInputs"}>
        Something isn't right
      </div>

      <button onClick={() => handleAddObject(table[0])}> + </button>
    </div>
  </div>
</div>
  `;
  const code5 = `
  // Featching add/remove rekord to server
  const sendDataToServer = async (dataToSend) => {
    return fetch("http://192.168.1.3:8080/api/sendData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server answer:", data);
        handleRefreshData();
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Refreshing the tables after adding/removing record
  const handleRefreshData = () => {
    setRefreshData((prevState) => !prevState);
  };  
  `;
  return (
    <div className="primaryContainer">
      <div className="secondaryContainer">
        On start the app is using useEffect to download a list of available dataBases.
        <SyntaxHighlighter language="javascript" style={dracula}>
          {code1}
        </SyntaxHighlighter>
        List is sent to another component in which the name of each database is attached to a
        button.
        <div className="photoContainer">
          <img className="photo" src={one} alt="start-up page" />
        </div>
        <SyntaxHighlighter language="javascript" style={dracula}>
          {code2}
        </SyntaxHighlighter>
      </div>
      <div className="secondaryContainer">
        Clicking button with name of database sending request to download collections from it.
        <SyntaxHighlighter language="javascript" style={dracula}>
          {code3}
        </SyntaxHighlighter>
        <div className="photoContainer">
          <img className="photo" src={two} alt="start-up page" />
        </div>
      </div>
      <div className="secondaryContainer">
        Clicking button Add new record causes the appearance of input fields with names of existing
        in collection attributes with few excludes like created(date of creation object added
        automatically in api) or __v (validator mark).
        <SyntaxHighlighter language="javascript" style={dracula}>
          {code4}
        </SyntaxHighlighter>
        <div className="photoContainer">
          <img className="photo" src={tree} alt="start-up page" />
        </div>
      </div>
      <div className="secondaryContainer">
        Clicking button + sending data to api, if api response success:false then is appearing
        message something isn’t right which should mean mongoose validation failed.
        <SyntaxHighlighter language="javascript" style={dracula}>
          {code5}
        </SyntaxHighlighter>
        <div className="photoContainer">
          <img className="photo" src={four} alt="start-up page" />
        </div>
      </div>
      <div className="secondaryContainer">
        When everything is fine this mean message from api success:true component should be
        refreshed to present collection with new record and input field should be cleaned.
        <div className="photoContainer">
          <img className="photo" src={five} alt="start-up page" />
        </div>
      </div>
    </div>
  );
}
