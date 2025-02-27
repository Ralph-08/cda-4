import "./partials/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ActiveOrders from "./pages/ActiveOrders/ActiveOrders";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import Orders from "./pages/Orders/Orders";
import EditOrder from "./pages/EditOrder/EditOrder";
import CustomerList from "./pages/CustomerList/CustomerList";
import Products from "./pages/Products/Products";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ordenes" element={<Orders />} />
          <Route path="/ordenes-activas" element={<ActiveOrders />} />
          <Route path="/ordenes-activas:orderId" element={<EditOrder />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/lista" element={<CustomerList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
