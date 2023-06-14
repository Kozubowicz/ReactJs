//Base comparison of vanilla Js and React.JS

//creating and adding component through vanilla JS

const h1 = document.createElement("h1");
h1.textContent = "Delta one - Solid snake";
h1.className = "header";

document.getElementById("main").append(h1);

//equivalent code in React.Js
ReactDOM.render(
  <h1 className="header">Delta one - Solid snake</h1>,
  document.getElementById("main")
);
