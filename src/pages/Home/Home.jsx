import { useState } from "react";
import "./Home.scss";
import TacoQuestion from "../TacoQuestion/TacoQuestion";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";
import DrinksPage from "../DrinksPage/DrinksPage";

const Home = () => {
  const [welcomeScreen, setWelcomeScreen] = useState(true);
  const [screenOne, setScreenOne] = useState(false);
  const [screenTwo, setScreenTwo] = useState(false);

  const handleNextPage = (notesList, quantity) => {
    console.log({ tacoQuantity: quantity, notes: notesList });

    

    setScreenOne(false);
    setScreenTwo(true)
  };

  return (
    <section className="home">
      {welcomeScreen && <WelcomeScreen setWelcomeScreen={setWelcomeScreen} setScreenOne={setScreenOne} />}
      {screenOne && <TacoQuestion handleNextPage={handleNextPage} />}
      {screenTwo && <DrinksPage />}
    </section>
  );
};

export default Home;
