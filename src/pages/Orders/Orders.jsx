import { useState, useEffect, useCallback } from "react";
import "./Orders.scss";
import { db } from "../../firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import OrderCard from "../../components/OrderCard/OrderCard";

function Orders() {
  const [orders, setOrders] = useState([]);
  const ordersCollectionRef = collection(db, "orders");

  const getOrders = useCallback(async () => {
    const data = await getDocs(ordersCollectionRef);
    setOrders(
      data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((order) => !order.orderDelivered)
    );
  }, [ordersCollectionRef]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handleDelivered = async (id) => {
    const orderDoc = doc(db, "orders", id);
    const updateField = { orderDelivered: true };
    await updateDoc(orderDoc, updateField);
  };

  return (
    <>
      <section className="orders">
        <h1 className="orders__header">Ordenes</h1>
        {orders.map((order, i) => {
          return (
            <OrderCard
              order={order}
              key={i}
              index={i}
              handleDelivered={handleDelivered}
            />
          );
        })}
      </section>
    </>
  );
}

export default Orders;
