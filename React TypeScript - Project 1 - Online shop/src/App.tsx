import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { NavBar } from "./components/NavBar";
import { ShoppingCartProvider } from "./context/shoppingCartContext";

function App() {
  const base = "/Projects/Project 25 - React TypeScript - Project 1 - Online shop/";

  return (
    <ShoppingCartProvider>
      <NavBar />
      <Routes>
        <Route path={base} element={<Home />} />
        <Route path={`${base}Store`} element={<Store />} />
        <Route path={`${base}About`} element={<About />} />
      </Routes>
    </ShoppingCartProvider>
  );
}

export default App;
