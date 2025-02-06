import { useState } from "react";
import "./OrderCard.scss";

const OrderCard = ({
  order,
  index,
  handleDelivered,
  isDelivered,
  handleFinalizeOrder,
}) => {
  const [cardCollapse, setCardCollapse] = useState(false);

  const handleDeliveredButtonClick = () => {
    setCardCollapse(true);

    setTimeout(() => {
      handleDelivered(order.id);
    }, 350);
  };

  return (
    <section
      className={
        index % 2 === 1
          ? `order order--gray  ${cardCollapse ? "order--collapse" : ""}`
          : `order ${cardCollapse ? "order--collapse" : ""}`
      }
    >
      <section className="order__left">
        <h2 className="order__name">{order.name}</h2>
        <p className="order__qty">
          <b>Cantidad: </b>
          {order.tacoQuantity} taco(s)
        </p>
        {order.notes.length !== 0 ? (
          <>
            <h4 className="order__subhead">Verduras:</h4>
            <ul className="order__list">
              {order.notes.map((note, i) => (
                <>
                  {note === "pineaple" ? (
                    <li key={i} className="order__item">
                      Piña
                    </li>
                  ) : null}

                  {note === "cebolla" ? (
                    <li key={i} className="order__item">
                      Cebolla
                    </li>
                  ) : null}

                  {note === "cilantro" ? (
                    <li key={i} className="order__item">
                      Cilantro
                    </li>
                  ) : null}
                  {note === "alado" ? (
                    <li key={i} className="order__item">
                      (Verduras alado)
                    </li>
                  ) : null}
                </>
              ))}
            </ul>
          </>
        ) : (
          <p className="order__subhead">(No verduras)</p>
        )}
        {order.drinksList.length !== 0 ? (
          <>
            <h4 className="order__subhead">Bebidas:</h4>
            <ul className="order__list">
              {order.drinksList.map((drink, i) => (
                <>
                  {drink["horchata"] ? (
                    <li key={i} className="order__item">
                      {"Horchata: " + drink.horchata}
                    </li>
                  ) : null}
                  {drink["jamaica"] ? (
                    <li key={i} className="order__item">
                      {"Jamaica: " + drink.jamaica}
                    </li>
                  ) : null}
                  {drink["coke"] ? (
                    <li key={i} className="order__item">
                      {"Coca-Cola: " + drink.coke}
                    </li>
                  ) : null}
                  {drink["sprite"] ? (
                    <li key={i} className="order__item">
                      {"Sprite: " + drink.sprite}
                    </li>
                  ) : null}
                </>
              ))}
            </ul>
          </>
        ) : (
          <p className="order__subhead">(No bebidas)</p>
        )}
        <h4>Total: {order.tacoQuantity * 3}$</h4>
      </section>

      <section className="order__right">
        {!isDelivered ? (
          <button
            className="order__button"
            onClick={handleDeliveredButtonClick}
          >
            Entregar
          </button>
        ) : (
          <button
            className="order__button order__button--blue"
            onClick={handleFinalizeOrder}
          >
            Finalizar
          </button>
        )}
      </section>
    </section>
  );
};

export default OrderCard;
