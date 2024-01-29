import { useState, useEffect } from "react";
import axios from "axios";
import DonutSpinner from "../components/DonutSpinner";

const API_URL = process.env.REACT_APP_API_URL;

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get(`${API_URL}/inventories`);
        setInventory(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInventories();
  }, []);

  return (
    <div className="App">
      <h1>Inventory</h1>
      {!inventory.length ? (
        <DonutSpinner />
      ) : (
        <ul>
          {inventory.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inventory;
