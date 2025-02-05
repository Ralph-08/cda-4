import { useState, useEffect, useCallback } from "react";
import "./Orders.scss";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import OrderCard from "../../components/OrderCard/OrderCard";

function Orders() {
  const [orders, setOrders] = useState([]);
  const ordersCollectionRef = collection(db, "orders");

  const getOrders = useCallback(async () => {
    const data = await getDocs(ordersCollectionRef);
    setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }, [ordersCollectionRef]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
      <section className="orders">
        <h1 className="orders__header">Ordenes</h1>
        {orders.map((order, i) => {
          return <OrderCard order={order} key={i} index={i} />;
        })}
      </section>
    </>
  );
}

export default Orders;
