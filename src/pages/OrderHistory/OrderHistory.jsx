import "./OrderHistory.scss";
import { useState, useEffect, useCallback } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import OrderCard from "../../components/OrderCard/OrderCard";
import { NavLink } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const ordersCollectionRef = collection(db, "orders");

  const getOrders = useCallback(async () => {
    const data = await getDocs(ordersCollectionRef);
    setOrders(
      data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((order) => !order.activeOrder)
        .sort((a, b) => b.orderCreated - a.orderCreated)
    );
  }, [ordersCollectionRef]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <section className="history">
      <NavLink to="/server-page" className="history__link">
        {"< Regresar"}
      </NavLink>
      <h1 className="history__header">Historial</h1>

      {orders.map((order, i) => {
        return <OrderCard order={order} key={i} index={i} isHistory={true} />;
      })}
    </section>
  );
};

export default OrderHistory;
