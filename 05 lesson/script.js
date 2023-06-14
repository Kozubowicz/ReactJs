//Creating custom compnent

function Page() {
  return (
    <div>
      <header>
        <nav>
          <img src="../logo.png" width="200px" height="200px" />
        </nav>
      </header>

      <h1>List of facts about React.Js</h1>
      <ol>
        <li>Was first relased in 2013</li>
        <li>Was orginaly created by Jordan Walke</li>
        <li>Has well over 100K stars on Github</li>
        <li>Is maintained by Facebook</li>
        <li>Powers thousands of enterprise apps, including mobile ones</li>
      </ol>
      <footer>
        <small>@2023 Raw development. All rights reserved.</small>
      </footer>
    </div>
  );
}

ReactDOM.render(<Page />, document.getElementById("main"));
