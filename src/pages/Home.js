import { useEffect, useState, useCallback } from "react";
import DonutSpinner from "../components/DonutSpinner";
import axios from "axios";

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  const getHomeData = useCallback(async () => {
    try {
      const data = await axios.get(API_URL + "/");
      setHomeData(data.data);
    } catch (err) {
      console.log(err);
    }
  }, [API_URL]);

  useEffect(() => {
    getHomeData();
  }, [getHomeData]);

  return (
    <div className="App">
      <h1>Home</h1>
      <p>Feel free to explore other pages!</p>
      {homeData && <p>{homeData}</p>}
      <DonutSpinner />
    </div>
  );
};

export default Home;
