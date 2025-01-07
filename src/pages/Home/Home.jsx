import { useState } from "react";
import "./Home.scss";
import TacoQuestion from "../TacoQuestion/TacoQuestion";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";

const Home = () => {
  const [welcomeScreen, setWelcomeScreen] = useState(true);
  const [screenOne, setScreenOne] = useState(false);

  const handleNextPage = (notesList, quantity) => {
    console.log({ tacosQuantity: quantity, items: notesList });
    setScreenOne(false);
  };

  return (
    <section className="home">
      {welcomeScreen && <WelcomeScreen setWelcomeScreen={setWelcomeScreen} setScreenOne={setScreenOne} />}
      {screenOne && <TacoQuestion handleNextPage={handleNextPage} />}
    </section>
  );
};

export default Home;
