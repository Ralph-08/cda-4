import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Warehouse from "./pages/Warehouse";
import Inventory from "./pages/Inventory";
import Home from "./pages/Home";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"warehouses"} element={<Warehouse />} />
          <Route path={"inventory"} element={<Inventory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
