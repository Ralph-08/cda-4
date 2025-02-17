import "./ActiveOrders.scss";
import { useState, useEffect, useCallback } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import OrderCard from "../../components/OrderCard/OrderCard";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const ServerPage = () => {
  const [orders, setOrders] = useState([]);
  const ordersCollectionRef = collection(db, "orders");
  const [finalizePopUp, setFinalizePopUp] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleFinalizeOrder = async () => {
    setIsLoading(true);
    const orderDoc = doc(db, "orders", currentOrder.orderId);
    const updateField = { activeOrder: false, orderCreated: Date.now() };
    await updateDoc(orderDoc, updateField);
    setFinalizePopUp(false);
    setCurrentOrder(false);
  };

  const handleFinalizePopUp = () => {
    setCurrentOrder(false);
    setFinalizePopUp(false);
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
              setFinalizePopUp={setFinalizePopUp}
              setCurrentOrder={setCurrentOrder}
              handleFinalizePopUp={handleFinalizePopUp}
            />
          );
        })}
      </section>

      {finalizePopUp && (
        <section className="popUp">
          <section className="popUp__card">
            <h1 className="popUp__header">{`Finalizar orden de: ${currentOrder?.name}?`}</h1>

            {!isLoading && (
              <section className="popUp__bottom-section">
                <button
                  className="popUp__button popUp__button--no"
                  onClick={handleFinalizePopUp}
                >
                  No
                </button>
                <button
                  className="popUp__button popUp__button--yes"
                  onClick={handleFinalizeOrder}
                >
                  Si
                </button>
              </section>
            )}
            {isLoading && <LoadingSpinner />}
          </section>
        </section>
      )}
    </>
  );
};

export default ServerPage;
