import { useState } from "react";
import "./Home.scss";
import TacoQuestion from "../TacoQuestion/TacoQuestion";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";
import DrinksPage from "../DrinksPage/DrinksPage";
import CustomerInfo from "../CustomerInfo/CustomerInfo";

const Home = () => {
  const [welcomeScreen, setWelcomeScreen] = useState(true);
  const [screenOne, setScreenOne] = useState(false);
  const [screenTwo, setScreenTwo] = useState(false);
  const [screenThree, setScreenThree] = useState(false);

  const handleNextPageToTwo = (notesList, quantity) => {
    console.log({ tacoQuantity: quantity, notes: notesList });

    setScreenOne(false);
    setScreenTwo(true);
  };

  const handleNextPageToThree = () => {
    setScreenTwo(false);
    setScreenThree(true);
  };

  const handleBackFromPageTwo = () => {
    setScreenTwo(false);
    setScreenOne(true);
  };

  const handleBackFromPageThree = () => {
    setScreenThree(false);
    setScreenTwo(true);
  };

  return (
    <section className="home">
      {welcomeScreen && (
        <WelcomeScreen
          setWelcomeScreen={setWelcomeScreen}
          setScreenOne={setScreenOne}
        />
      )}
      {screenOne && <TacoQuestion handleNextPage={handleNextPageToTwo} />}
      {screenTwo && (
        <DrinksPage
          handleNextPage={handleNextPageToThree}
          handleBackPage={handleBackFromPageTwo}
        />
      )}
      {screenThree && (
        <CustomerInfo
          handleNextPage={""}
          handleBackPage={handleBackFromPageThree}
        />
      )}
    </section>
  );
};

export default Home;
