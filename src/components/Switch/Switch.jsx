import { useState } from "react";
import "./Switch.scss";

function Switch({ isTrue, product, updateProductStatus }) {
  const [isClicked, setIsClicked] = useState(isTrue);

  const handleSwitchClick = () => {
    !isClicked ? setIsClicked(true) : setIsClicked(false);
    updateProductStatus({ [product]: isClicked ? false : true }, product);
  };

  return (
    <button
      className={!isClicked ? "switch switch--off" : " switch switch--on"}
      onClick={handleSwitchClick}
    >
      <section
        className={
          !isClicked ? "switch__button" : "switch__button switch__button--on"
        }
      ></section>
    </button>
  );
}

export default Switch;
