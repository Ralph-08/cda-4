import "./Counter.scss";

const Counter = ({ quantity, setQuantity }) => {
  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleSubtract = () => {
    if (quantity === 0) return;
    setQuantity(quantity - 1);
  };

  return (
    <section className="counter">
      <button className="counter__button" onClick={() => handleSubtract()}>
        -
      </button>
      <p className="counter__quantity">{quantity}</p>
      <button className="counter__button" onClick={() => handleAdd()}>
        +
      </button>
    </section>
  );
};

export default Counter;
