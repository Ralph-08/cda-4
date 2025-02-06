import "./ServerPage.scss";
import { useState, useEffect, useCallback } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import OrderCard from "../../components/OrderCard/OrderCard";

const ServerPage = () => {
  const [orders, setOrders] = useState([]);
  const ordersCollectionRef = collection(db, "orders");

  const getOrders = useCallback(async () => {
    const data = await getDocs(ordersCollectionRef);
    setOrders(
      data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((order) => order.orderDelivered)
    );
  }, [ordersCollectionRef]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handleFinalizeOrder = async (id) => {};

  return (
    <section className="server-page">
      <h1 className="orders__header">Ordenes Activas</h1>

      {orders.map((order, i) => {
        return (
          <OrderCard
            order={order}
            key={i}
            index={i}
            isDelivered={true}
            handleDelivered={handleFinalizeOrder}
          />
        );
      })}
    </section>
  );
};

export default ServerPage;
