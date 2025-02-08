import { useState, useCallback, useEffect } from "react";
import "./EditOrder.scss";
import { useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const EditOrder = () => {
  const [order, setOrder] = useState(null);
  const ordersCollectionRef = collection(db, "orders");
  const { orderId } = useParams();
  const navigate = useNavigate();

  const getOrder = useCallback(async () => {
    const docRef = doc(db, "orders", orderId);
    const docSnap = await getDoc(docRef);
    setOrder(docSnap._document.data.value.mapValue.fields);
  }, [ordersCollectionRef]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  if (!order) return;

  const arrayValues = order.drinksList.arrayValue.values;

  const handleCancel = () => {
    navigate("/ordenes-activas");
  };

  const handleConfirmOrderEdit = async (changedValues) => {
    const orderDoc = doc(db, "orders", orderId);
    // const updateField = { activeOrder: false, orderCreated: Date.now() };
    await updateDoc(orderDoc, changedValues);
  };

  //   console.log(order.tacoQuantity.integerValue)
  // console.log(order.drinksList.arrayValue.values[0].mapValue.fields.horchata.integerValue)

  //   make if statement where if key === tacoqty then... else order[...].value

  const verifyFormInputs = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const changedValues = {};

    for (let [key, value] of formData.entries()) {
      if (value !== "0" && value !== "") {
        changedValues[key] = Number(value);
        console.log(key);
      }
    }

    // handleConfirmOrderEdit(changedValues);
  };

  return (
    <section className="edit">
      <h1 className="edit__name">{order.name.stringValue}</h1>
      <h3 className="edit__tableNumber">
        <b>Mesa #: </b>
        <button className="edit__table-button">
          {order.tableNumber.integerValue}
        </button>
      </h3>

      <form className="edit__form" onSubmit={verifyFormInputs}>
        <section className="edit__taco-container">
          <h3 className="edit__qty">
            <b>Tacos:</b>{" "}
            <span className="quantity__highlight">
              {order.tacoQuantity.integerValue}
            </span>{" "}
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
          {arrayValues.map((drink, i) => {
            const fields = arrayValues[i].mapValue.fields;
            const drinkTypes = ["horchata", "jamaica", "coke", "sprite"];

            for (const drink of drinkTypes) {
              if (fields[drink]) {
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
                      <b>{drink.charAt(0).toUpperCase() + drink.slice(1)}</b>
                      <span className="quantity__highlight">
                        {": " + fields[drink].integerValue}
                      </span>{" "}
                    </h3>
                    <section className="edit__taco-qty-container">
                      <h1 className="edit__plus-icon">+</h1>
                      <input
                        className="edit__input"
                        name={drink}
                        inputMode="decimal"
                      />
                    </section>
                  </section>
                );
              }
            }
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
