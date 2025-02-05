import "./OrderCard.scss";

const OrderCard = ({ order, index }) => {

    if (index % 2 === 1) {

    }

    return (
    <section className={index % 2 === 1?"order order--gray":"order"}>
      <h2 className="order__name">{order.name}</h2>
      <p className="order__qty">
        <b>Cantidad: </b>
        {order.tacoQuantity} taco(s)
      </p>
      <h4 className="order__subhead">Serisos:</h4>
      <ul className="order__list">
        {order.notes.map((note, i) => (
          <li key={i} className="order__item">
            {note}
          </li>
        ))}
      </ul>

      <h4 >Total: {order.tacoQuantity * 3}$</h4>
    </section>
  );
};

export default OrderCard;
