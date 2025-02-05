import { useState } from "react";
import "./CustomerInfo.scss";
import backIcon from "../../assets/icons/back-arrow.svg";
import walkingTaco from "../../assets/images/walking-taco.gif";

const CustomerInfo = ({ handleBackPage, handleNextPage }) => {
  const [inputError, setInputError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (name) => {
    setSubmitSuccess(true);

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

    setInputError(false);

    handleSubmit(e.target.name.value);
  };

  return (
    <section className="info">
      <section className="info__header">
        <img
          className="drinks__backIcon"
          src={backIcon}
          alt="back"
          onClick={handleBackPage}
        />
        <h1 className="drinks__text">INFORMACION</h1>
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
            />
            <button className="questionare__button">ENTREGAR</button>
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
