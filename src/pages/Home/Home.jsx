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

  const [orderInfo, setOrderInfo] = useState({
    activeOrder: true,
    orderDelivered: false,
  });

  const gatherAllInfo = (name) => {
    setOrderInfo({
      ...orderInfo,
      name: name,
      orderCreated: Date.now(),
      tableNumber: 0,
    });
  };

  const handleNextPageToTwo = (notesList, quantity) => {
    setOrderInfo({ ...orderInfo, tacoQuantity: quantity, notes: notesList });
    setScreenOne(false);
    setScreenTwo(true);
  };

  const handleNextPageToThree = (drinksList) => {
    setOrderInfo({ ...orderInfo, drinksList });
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
          gatherAllInfo={gatherAllInfo}
          orderInfo={orderInfo}
        />
      )}
    </section>
  );
};

export default Home;
