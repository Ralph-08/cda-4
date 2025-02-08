import "./ActiveOrders.scss";
import { useState, useEffect, useCallback } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import OrderCard from "../../components/OrderCard/OrderCard";
import { NavLink } from "react-router-dom";

const ServerPage = () => {
  const [orders, setOrders] = useState([]);
  const ordersCollectionRef = collection(db, "orders");

  const getOrders = useCallback(async () => {
    const data = await getDocs(ordersCollectionRef);
    setOrders(
      data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((order) => order.orderDelivered && order.activeOrder)
        .sort((a, b) => a.orderCreated - b.orderCreated)
    );
  }, [ordersCollectionRef]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handleEditOrder = (id) => {};

  const handleFinalizeOrder = async (id) => {
    const orderDoc = doc(db, "orders", id);
    const updateField = { activeOrder: false, orderCreated: Date.now() };
    await updateDoc(orderDoc, updateField);
  };

  return (
    <>
      <section className="server-page">
        <section className="server-page__header">
          <h1>Por Cobrar</h1>
          <NavLink to="/order-history" className="server-page__link">
            Historial
          </NavLink>
        </section>

        {orders.map((order, i) => {
          return (
            <OrderCard
              order={order}
              key={i}
              index={i}
              isDelivered={true}
              handleFinalizeOrder={handleFinalizeOrder}
            />
          );
        })}
      </section>

      {<section className="edit"></section>}
    </>
  );
};

export default ServerPage;
