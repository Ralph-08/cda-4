import "./TacoQuestion.scss";
import { useState } from "react";
import tacosImage from "../../assets/images/tacos.avif";
import Counter from "../../components/Counter/Counter";

const TacoQuestion = ({ handleNextPage }) => {
  const [quantity, setQuantity] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [pineapple, setPineapple] = useState(false);
  const [cebolla, setCebolla] = useState(false);
  const [cilantro, setCilantro] = useState(false);
  const [alado, setAlado] = useState(false);

  const addNote = (note) => {
    if (note === "piña") {
      pineapple ? setPineapple(false) : setPineapple(true);
    } else if (note === "cebolla") {
      cebolla ? setCebolla(false) : setCebolla(true);
    } else if (note === "cilantro") {
      cilantro ? setCilantro(false) : setCilantro(true);
    } else if (note === "alado") {
      alado ? setAlado(false) : setAlado(true);
    }
  };

  const verifyNotes = () => {
    const noteList = [
      pineapple ? "pineaple" : null,
      cebolla ? "cebolla" : null,
      cilantro ? "cilantro" : null,
      alado ? "alado" : null,
    ];

    const addedItems = noteList.filter((i) => i);

    setFadeOut(true);
    setTimeout(() => {
      handleNextPage(addedItems, quantity);
    }, 500);
  };

  return (
    <section className={!fadeOut ? "survey" : "survey survey--fadeOut"}>
      <h1 className="survey__question">CUANTOS TACOS?</h1>
      <img src={tacosImage} className="survey__image" />
      <Counter quantity={quantity} setQuantity={setQuantity} />

      <section className="survey__options">
        <button
          className={`options__button ${
            pineapple ? "options__button--active" : ""
          }`}
          onClick={() => addNote("piña")}
        >
          Piña
        </button>

        <button
          className={`options__button ${
            cebolla ? "options__button--active" : ""
          }`}
          onClick={() => addNote("cebolla")}
        >
          Cebolla
        </button>
        <button
          className={`options__button ${
            cilantro ? "options__button--active" : ""
          }`}
          onClick={() => addNote("cilantro")}
        >
          Cilantro
        </button>
        <button
          className={`options__button ${
            alado ? "options__button--active" : ""
          }`}
          onClick={() => addNote("alado")}
        >
          Verduras a lado
        </button>
      </section>

      {quantity >= 1 ? (
        <button className="survey__next" onClick={verifyNotes}>
          SIGUIENTE
        </button>
      ) : (
        <section className="survey__placeholder"></section>
      )}
    </section>
  );
};

export default TacoQuestion;
