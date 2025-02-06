import "./partials/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ActiveOrders from "./pages/ActiveOrders/ActiveOrders";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import Orders from "./pages/Orders/Orders";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/ordenes"} element={<Orders />} />
          <Route path={"/ordenes-activas"} element={<ActiveOrders />} />
          <Route path={"/order-history"} element={<OrderHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
