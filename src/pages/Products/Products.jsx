import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import Switch from "../../components/Switch/Switch";
import "./Products.scss";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [productsObject, setProductsObject] = useState(null);
  const productsCollectionRef = collection(db, "products");

  const navigate = useNavigate();

  const getProducts = useCallback(async () => {
    const data = await getDocs(productsCollectionRef);
    setProductsObject(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
    );
  }, [productsCollectionRef]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const updateProductStatus = async (updatedProduct, product) => {
    const productsDoc = doc(db, "products", productsObject.id);
    await updateDoc(productsDoc, {
      ...productsObject,
      [product]: updatedProduct[product],
    });
  };

  if (!productsObject) return <LoadingSpinner />;

  return (
    <section className="products">
      <h1 className="products__header">Productos:</h1>
      {productsObject && (
        <>
          <ul className="products__list">
            <li className="products__item products__item--no-border">
              <h3 className="products__subhead">Coca-Cola:</h3>
              <Switch
                isTrue={productsObject.coke}
                product={"coke"}
                updateProductStatus={updateProductStatus}
              />
            </li>

            <li className="products__item">
              <h3 className="products__subhead">Sprite:</h3>
              <Switch
                isTrue={productsObject.sprite}
                product={"sprite"}
                updateProductStatus={updateProductStatus}
              />
            </li>

            <li className="products__item">
              <h3 className="products__subhead">Agua de Jamaica:</h3>
              <Switch
                isTrue={productsObject.jamaica}
                product={"jamaica"}
                updateProductStatus={updateProductStatus}
              />
            </li>

            <li className="products__item">
              <h3 className="products__subhead">Agua de Horchata:</h3>
              <Switch
                isTrue={productsObject.horchata}
                product={"horchata"}
                updateProductStatus={updateProductStatus}
              />
            </li>

            <li className="products__item">
              <h3 className="products__subhead">Agua de Piña:</h3>
              <Switch
                isTrue={productsObject.pineapple}
                product={"pineapple"}
                updateProductStatus={updateProductStatus}
              />
            </li>

            <li className="products__item">
              <h3 className="products__subhead">Agua de Melon:</h3>
              <Switch
                isTrue={productsObject.melon}
                product={"melon"}
                updateProductStatus={updateProductStatus}
              />
            </li>

            <li className="products__item">
              <h3 className="products__subhead">Agua de Tamarindo:</h3>
              <Switch
                isTrue={productsObject.tamarindo}
                product={"tamarindo"}
                updateProductStatus={updateProductStatus}
              />
            </li>
          </ul>

          <button
            onClick={() => navigate("/ordenes-activas")}
            className=" products__button survey__next"
          >
            LISTO
          </button>
        </>
      )}
    </section>
  );
};

export default Products;
