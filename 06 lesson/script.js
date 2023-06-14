//Creating parent and child component

function Page() {
  return (
    <div>
      <Header />
      <Description />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <nav>
        <img src="../logo.png" width="200px" height="200px" />
      </nav>
    </header>
  );
}
function Description() {
  return (
    <div>
      <h1>List of facts about React.Js</h1>
      <ol>
        <li>Was first relased in 2013</li>
        <li>Was orginaly created by Jordan Walke</li>
        <li>Has well over 100K stars on Github</li>
        <li>Is maintained by Facebook</li>
        <li>Powers thousands of enterprise apps, including mobile ones</li>
      </ol>
    </div>
  );
}
function Footer() {
  return (
    <footer>
      <small>@2023 Raw development. All rights reserved.</small>
    </footer>
  );
}

ReactDOM.render(
  <div>
    <Page />
  </div>,
  document.getElementById("main")
);
