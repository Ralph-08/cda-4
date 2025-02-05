import { useState } from "react";
import "./CustomerInfo.scss";
import backIcon from "../../assets/icons/back-arrow.svg";
import walkingTaco from "../../assets/images/walking-taco.gif";

import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

const CustomerInfo = ({
  handleBackPage,
  gatherAllInfo,
  orderInfo,
}) => {
  const [inputError, setInputError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add a state to track submission status

  const ordersCollectionRef = collection(db, "orders");

  const handleNameChange = (e) => {
    gatherAllInfo(e.target.value);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true); // Set the flag to true to indicate submission in progress

    console.log(orderInfo);
    await addDoc(ordersCollectionRef, orderInfo);

    setTimeout(() => {
      setSubmitSuccess(true);
    }, 100);

    setTimeout(() => {
      window.location.reload();
    }, 4500);
  };

  const verifyForm = (e) => {
    e.preventDefault();

    if (!e.target.name.value) {
      setInputError(true);
      return;
    }

    gatherAllInfo(e.target.name.value);

    setInputError(false);

    // console.log(name);

    handleSubmit(e.target.name.value);
  };

  return (
    <section className="info">
      <section
        className={
          !submitSuccess ? "info__header" : "info__header info__header--success"
        }
      >
        {!submitSuccess && (
          <>
            <img
              className="drinks__backIcon"
              src={backIcon}
              alt="back"
              onClick={handleBackPage}
            />
            <h1 className="drinks__text">INFORMACION</h1>
          </>
        )}
      </section>

      {!submitSuccess && (
        <section className="questionare">
          <h1 className="questionare__header">Cual Es Su Nombre?</h1>
          <form className="questionare__form" onSubmit={verifyForm}>
            <input
              className={
                !inputError
                  ? "questionare__input"
                  : "questionare__input questionare__input--error"
              }
              type="text"
              name="name"
              onChange={handleNameChange}
            />
            <button className="questionare__button" onClick={handleSubmit}>
              ENTREGAR
            </button>
          </form>
        </section>
      )}

      {submitSuccess && (
        <section className="success">
          <img className="success__img" src={walkingTaco} alt="taco" />
          <h2 className="success__text">Listo! Su comida esta en camino!</h2>
        </section>
      )}
    </section>
  );
};

export default CustomerInfo;
