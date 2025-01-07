import { useState } from "react";
import "./WelcomeScreen.scss";

function WelcomeScreen({ setWelcomeScreen, setScreenOne }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleNextPage = () => {
    setFadeOut(true);

    setTimeout(() => {
      setWelcomeScreen(false);
      setScreenOne(true);
    }, 1000);
  };
  return (
    <section className={fadeOut?"welcome--fade-out":"welcome"}>
      <h1 className="welcome__header">Bienvendo a los tacos sabrosos!</h1>
      <button className="welcome__button" onClick={handleNextPage}>
        EMPEZAR
      </button>
    </section>
  );
}

export default WelcomeScreen;
