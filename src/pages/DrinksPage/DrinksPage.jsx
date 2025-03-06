import Counter from "../../components/Counter/Counter";
import "./DrinksPage.scss";
import horchataImg from "../../assets/images/horchata.png";
import jamaicaImg from "../../assets/images/jamaica.webp";
import cokeImg from "../../assets/images/coke.webp";
import spriteImg from "../../assets/images/sprite.png";
import pineappleJuiceImg from "../../assets/images/pineappleJuice.jpg";
import melonImg from "../../assets/images/melon.png";
import tamarindoImg from "../../assets/images/tamarindo.jpg";
import backIcon from "../../assets/icons/back-arrow.svg";
import { useState, useCallback, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const DrinksPage = ({ handleNextPage, handleBackPage }) => {
  const [horchataQunatity, setHorchataQuantity] = useState(0);
  const [jamaicaQuantity, setJamaicaQuantity] = useState(0);
  const [cokeQuantity, setCokeQuantity] = useState(0);
  const [spriteQuantity, setSpriteQuantity] = useState(0);
  const [pineappleJuiceQuantity, setPineappleJuiceQuantity] = useState(0);
  const [melonQuantity, setMelonQuantity] = useState(0);
  const [tamarindQuantity, setTamarindQuantity] = useState(0);

  const [activeProducts, setActiveProducts] = useState(false);
  const productsCollectionRef = collection(db, "products");

  const verifyDrinks = () => {
    const drinks = [
      horchataQunatity ? { horchata: horchataQunatity } : null,
      jamaicaQuantity ? { jamaica: jamaicaQuantity } : null,
      cokeQuantity ? { coke: cokeQuantity } : null,
      spriteQuantity ? { sprite: spriteQuantity } : null,
      pineappleJuiceQuantity ? { pineapple: pineappleJuiceQuantity } : null,
      melonQuantity ? { melon: melonQuantity } : null,
      tamarindQuantity ? { tamarindo: tamarindQuantity } : null,
    ];

    handleNextPage(drinks.filter((drink) => drink));
  };

  const getActiveProducts = useCallback(async () => {
    const data = await getDocs(productsCollectionRef);
    setActiveProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
    );
  }, [productsCollectionRef]);

  useEffect(() => {
    getActiveProducts();
  }, [getActiveProducts]);

  if (!activeProducts) return <LoadingSpinner />;

  return (
    <section className="drinks">
      <section className="drinks__header">
        <img
          className="drinks__backIcon"
          src={backIcon}
          alt="back"
          onClick={handleBackPage}
        />
        <h1 className="drinks__text">BEBIDAS</h1>
      </section>

      <ul className="drinks__list">
        {activeProducts.coke && (
          <li className="drinks__item">
            <section className="item__left">
              <h4 className="item__title">Coca-Cola</h4>
              <img className="item__picture" src={cokeImg} alt="" />
            </section>
            <section className="item__right">
              <p className="item__price"></p>
              <Counter quantity={cokeQuantity} setQuantity={setCokeQuantity} />
            </section>
          </li>
        )}

        {activeProducts.sprite && (
          <li className="drinks__item">
            <section className="item__left">
              <h4 className="item__title">Sprite</h4>
              <img
                className="item__picture item__picture--sprite"
                src={spriteImg}
                alt=""
              />
            </section>
            <section className="item__right">
              <p className="item__price"></p>
              <Counter
                quantity={spriteQuantity}
                setQuantity={setSpriteQuantity}
              />
            </section>
          </li>
        )}

        {activeProducts.horchata && (
          <li className="drinks__item">
            <section className="item__left">
              <h4 className="item__title">Agua de Horchata</h4>
              <img
                className="item__picture item__picture--horchata"
                src={horchataImg}
                alt=""
              />
            </section>
            <section className="item__right">
              <p className="item__price"></p>
              <Counter
                quantity={horchataQunatity}
                setQuantity={setHorchataQuantity}
              />
            </section>
          </li>
        )}

        {activeProducts.jamaica && (
          <li className="drinks__item">
            <section className="item__left">
              <h4 className="item__title">Agua de Jamaica</h4>
              <img
                className="item__picture item__picture--jamaica"
                src={jamaicaImg}
                alt=""
              />
            </section>
            <section className="item__right">
              <p className="item__price"></p>
              <Counter
                quantity={jamaicaQuantity}
                setQuantity={setJamaicaQuantity}
              />
            </section>
          </li>
        )}

        {activeProducts.pineapple && (
          <li className="drinks__item">
            <section className="item__left">
              <h4 className="item__title">Agua de Piña</h4>
              <img className="item__picture" src={pineappleJuiceImg} alt="" />
            </section>
            <section className="item__right">
              <p className="item__price"></p>
              <Counter
                quantity={pineappleJuiceQuantity}
                setQuantity={setPineappleJuiceQuantity}
              />
            </section>
          </li>
        )}

        {activeProducts.melon && (
          <li className="drinks__item">
            <section className="item__left">
              <h4 className="item__title">Agua de Melon</h4>
              <img
                className="item__picture item__picture--melon"
                src={melonImg}
                alt=""
              />
            </section>
            <section className="item__right">
              <p className="item__price"></p>
              <Counter
                quantity={melonQuantity}
                setQuantity={setMelonQuantity}
              />
            </section>
          </li>
        )}

        {activeProducts.tamarindo && (
          <li className="drinks__item">
            <section className="item__left">
              <h4 className="item__title">Agua de Tamarindo</h4>
              <img
                className="item__picture item__picture--tamarindo"
                src={tamarindoImg}
                alt=""
              />
            </section>
            <section className="item__right">
              <p className="item__price"></p>
              <Counter
                quantity={tamarindQuantity}
                setQuantity={setTamarindQuantity}
              />
            </section>
          </li>
        )}
      </ul>
      <section className="bottom-container"></section>

      <section className="survey__next-container">
        <button
          className="survey__next survey__next--float"
          onClick={verifyDrinks}
        >
          SIGUIENTE
        </button>
      </section>
    </section>
  );
};

export default DrinksPage;
