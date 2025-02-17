import { useState, useCallback, useEffect } from "react";
import "./EditOrder.scss";
import { useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const EditOrder = () => {
  const [isLoadingOne, setIsLoadingOne] = useState(true);
  const [isLoadingTwo, setIsLoadingTwo] = useState(false);
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const getOrder = useCallback(async () => {
    const docRef = doc(db, "orders", orderId);
    const docSnap = await getDoc(docRef);
    setOrder(docSnap.data());
    setIsLoadingOne(false);
  }, [orderId]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  const handleCancel = () => {
    navigate("/ordenes-activas");
  };

  const handleTacoQuantityUpdate = async (obj) => {
    const orderDoc = doc(db, "orders", orderId);
    await updateDoc(orderDoc, obj);
  };

  const handleDrinksQuantityUpdate = async (updatedDrinksList) => {
    const orderDoc = doc(db, "orders", orderId);
    await updateDoc(orderDoc, { drinksList: updatedDrinksList });
  };

  const handleConfirmOrderEdit = async (changedValues) => {
    setIsLoadingTwo(true);

    let tacoObject = false;
    let updatedDrinksList = order.drinksList.map((drink) => {
      const drinkKey = Object.keys(drink)[0];
      if (changedValues[drinkKey]) {
        return {
          [drinkKey]: Number(changedValues[drinkKey]) + drink[drinkKey],
        };
      }
      return drink;
    });

    Object.entries(changedValues).forEach(([key, value]) => {
      if (key === "tacoQuantity") {
        tacoObject = {
          ...tacoObject,
          tacoQuantity: Number(value) + order.tacoQuantity,
        };
      }
    });

    if (tacoObject) {
      await handleTacoQuantityUpdate(tacoObject);
    }

    if (updatedDrinksList.length > 0) {
      await handleDrinksQuantityUpdate(updatedDrinksList);
    }

    navigate("/ordenes-activas");
  };

  const verifyFormInputs = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const changedValues = {};

    for (let [key, value] of formData.entries()) {
      if (value !== "0" && value !== "") {
        changedValues[key] = Number(value);
      }
    }
    handleConfirmOrderEdit(changedValues);
  };

  if (isLoadingOne || isLoadingTwo) {
    return <LoadingSpinner />;
  }

  return (
    <section className="edit">
      <h1 className="edit__name">
        {order.name.charAt(0).toUpperCase() + order.name.slice(1)}
      </h1>
      <h3 className="edit__tableNumber">
        <b>Mesa #: </b>
        <button className="edit__table-button">{order.tableNumber}</button>
      </h3>

      <form className="edit__form" onSubmit={verifyFormInputs}>
        <section className="edit__taco-container">
          <h3 className="edit__qty">
            <b>Tacos:</b>{" "}
            <span className="quantity__highlight">{order.tacoQuantity}</span>{" "}
          </h3>
          <section className="edit__taco-qty-container">
            <h1 className="edit__plus-icon">+</h1>
            <input
              className="edit__input"
              name="tacoQuantity"
              inputMode="decimal"
            />
          </section>
        </section>
        <section className="edit__drinks-container">
          {order.drinksList.map((drink, i) => {
            let drinkKey;
            let drinkValue;

            Object.entries(drink).forEach(([key, value]) => {
              drinkKey = key;
              drinkValue = value;
            });

            return (
              <section
                key={i}
                className={
                  i % 2
                    ? "edit__single-container"
                    : "edit__single-container edit__single-container--gray"
                }
              >
                <h3 key={i} className="edit__qty">
                  <b>{drinkKey.charAt(0).toUpperCase() + drinkKey.slice(1)}</b>
                  <span className="quantity__highlight">
                    {": " + drinkValue}
                  </span>{" "}
                </h3>
                <section className="edit__taco-qty-container">
                  <h1 className="edit__plus-icon">+</h1>
                  <input
                    className="edit__input"
                    name={drinkKey}
                    inputMode="decimal"
                  />
                </section>
              </section>
            );
          })}
        </section>

        <section className="edit__bottom-section">
          <button type="button" className="edit__cancel" onClick={handleCancel}>
            Cancelar
          </button>
          <button type="submit" className="edit__confirm">
            Confirmar
          </button>
        </section>
      </form>
    </section>
  );
};

export default EditOrder;
