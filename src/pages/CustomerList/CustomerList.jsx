import "./CustomerList.scss";
import qrCode from "../../assets/images/qr-code.svg";
import { useState, useEffect, useCallback } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const CustomerList = () => {
  const [orders, setOrders] = useState([]);
  const ordersCollectionRef = collection(db, "orders");

  const getOrders = useCallback(async () => {
    const data = await getDocs(ordersCollectionRef);
    setOrders(
      data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((order) => !order.orderDelivered)
        .sort((a, b) => a.orderCreated - b.orderCreated)
    );
  }, [ordersCollectionRef]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <section className="list">
      <section className="list__left">
        <h1 className="list__header">Ahora Sirviendo:</h1>

        <ul className="list__customers">
          {orders.map((order, i) => {
            return (
              <li className="list__customer">
                {i + 1 + ". "}
                <span className={i === 0 ? "customer__pulse" : ""}>
                  {order.name}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="list__right">
        <h2 className="list__subheader">Escanee Para Ordernar!</h2>
        <img className="list__qr-code" src={qrCode} alt="QR Code" />
      </section>
    </section>
  );
};

export default CustomerList;
