import { useState } from "react";
import "./OrderCard.scss";
import React from "react";
import { Link } from "react-router-dom";

const OrderCard = ({
  order,
  index,
  handleDelivered,
  isDelivered,
  handleFinalizeOrder,
  isHistory,
}) => {
  const [cardCollapse, setCardCollapse] = useState(false);

  const handleDeliveredButtonClick = () => {
    setCardCollapse(true);

    setTimeout(() => {
      handleDelivered(order.id);
    }, 350);
  };

  const handleFinalizeOrderButtonClick = () => {
    setCardCollapse(true);

    setTimeout(() => {
      handleFinalizeOrder(order.id);
    }, 350);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
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
        {!isDelivered && (
          <section className="order__container">
            {order.notes.length !== 0 ? (
              <>
                <h4 className="order__subhead">Verduras:</h4>
                <ul className="order__list">
                  {order.notes.map((note, i) => (
                    <li key={i} className="order__item">
                      {note === "pineaple" && "Piña"}
                      {note === "cebolla" && "Cebolla"}
                      {note === "cilantro" && "Cilantro"}
                      {note === "alado" && "(Verduras alado)"}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="order__subhead">(No verduras)</p>
            )}
          </section>
        )}
        {order.drinksList.length !== 0 ? (
          <>
            <h4 className="order__subhead">Bebidas:</h4>
            <ul className="order__list">
              {order.drinksList.map((drink, i) => (
                <li key={i} className="order__item">
                  {drink["horchata"] && "Horchata: " + drink["horchata"]}
                  {drink["jamaica"] && "Jamaica: " + drink["jamaica"]}
                  {drink["coke"] && "Coca-Cola: " + drink["coke"]}
                  {drink["sprite"] && "Sprite: " + drink["sprite"]}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="order__subhead">(No bebidas)</p>
        )}
      </section>

      {!isHistory && (
        <section className="order__right">
          {!isDelivered ? (
            <button
              className="order__button"
              onClick={handleDeliveredButtonClick}
            >
              Entregar
            </button>
          ) : (
            <>
              <section className="order__right-container">
                <button
                  className="order__button order__button--coral"
                  onClick={handleFinalizeOrderButtonClick}
                >
                  Finalizar
                </button>
                <Link className="order__add" to={"/ordenes-activas" + order.id}>
                  +
                </Link>
              </section>
              <h4 className="order__total">
                Total:{" "}
                <span className="order__total--highlight">
                  {"$" + order.tacoQuantity * 3}
                </span>
              </h4>
            </>
          )}
        </section>
      )}
      {isHistory && (
        <section className="order__right">
          <p className="order__date">{formatDate(order.orderCreated)}</p>
          {isHistory && (
            <h4 className="order__total">Total: ${order.tacoQuantity * 3}</h4>
          )}
        </section>
      )}
    </section>
  );
};

export default OrderCard;
