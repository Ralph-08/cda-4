import Counter from "../../components/Counter/Counter";
import "./DrinksPage.scss";

import horchataImg from "../../assets/images/horchata.png";
import jamaicaImg from "../../assets/images/jamaica.webp";
import cokeImg from "../../assets/images/coke.webp";
import spriteImg from "../../assets/images/sprite.png";
import { useState } from "react";



const DrinksPage = () => {

    const [horchataQunatity, setHorchataQuantity] = useState(0);
    const [jamaicaQuantity, setJamaicaQuantity] = useState(0);
    const [cokeQuantity, setCokeQuantity] = useState(0);
    const [spriteQuantity, setSpriteQuantity] = useState(0);

  return (
    <section className="drinks">
      <h1 className="drinks__header">BEBIDAS</h1>

      <ul className="drinks__list">
        <li className="drinks__item">
          <section className="item__left">
            <h4 className="item__title">Horchata</h4>
            <img className="item__picture" src={horchataImg} alt="" />
          </section>
          <section className="item__right">
            <p className="item__price"></p>
            <Counter quantity={horchataQunatity} setQuantity={setHorchataQuantity} />
          </section>
        </li>

        <li className="drinks__item">
          <section className="item__left">
            <h4 className="item__title">Jamaica</h4>
            <img className="item__picture" src={jamaicaImg} alt="" />
          </section>
          <section className="item__right">
            <p className="item__price"></p>
            <Counter quantity={jamaicaQuantity} setQuantity={setJamaicaQuantity} />
          </section>
        </li>

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

        <li className="drinks__item">
          <section className="item__left">
            <h4 className="item__title">Sprite</h4>
            <img className="item__picture" src={spriteImg} alt="" />
          </section>
          <section className="item__right">
            <p className="item__price"></p>
            <Counter quantity={spriteQuantity} setQuantity={setSpriteQuantity} />
          </section>
        </li>
      </ul>
    </section>
  );
};

export default DrinksPage;
