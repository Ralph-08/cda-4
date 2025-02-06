import { BrowserRouter, Routes, Route } from "react-router-dom";
import Warehouse from "./pages/Warehouse";
import Inventory from "./pages/Inventory";
import Home from "./pages/Home/Home";
import ServerPage from "./pages/ServerPage/ServerPage";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import "./App.scss";
import Orders from "./pages/Orders/Orders";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/ordenes"} element={<Orders />} />
          <Route path={"/server-page"} element={<ServerPage />} />
          <Route path={"/order-history"} element={<OrderHistory />} />
          <Route path={"warehouses"} element={<Warehouse />} />
          <Route path={"inventory"} element={<Inventory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
