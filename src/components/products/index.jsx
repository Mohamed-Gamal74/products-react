import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./products.css";
import { FaShoppingCart } from "react-icons/fa";
import { AddToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const Products = () => {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const addingHandler = (product) => {
    dispatch(AddToCart(product));
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      });
  }, []);

  return (
    <div className=" container-fluid d-flex justify-content-center flex-wrap">
      {products.length ? (
        products.map((product) => {
          return (
            <div
              key={product.id}
              className="card m-2 p-2 text-center shadow rounded-2"
            >
              <img
                className="card-img-top"
                src={product.image}
                alt="Card image cap"
              />

              <div className="card-body">
                <div className="info">
                  <h3 className="card-title">{product.title}</h3>
                  <p className="card-text text-light">{product.category}</p>
                  <div className=" d-flex justify-content-between mt-5">
                    <p className="card-text fs-4">
                      price is : {product.price} $
                    </p>
                    <p className="card-text fs-4">
                      Rating: {product.rating.rate} / 5
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <Link
                    to={`/products/${product.id}`}
                    className="btn  text-uppercase "
                  >
                    show Details
                  </Link>

                  <button
                    className="btn cart"
                    onClick={() => addingHandler(product)}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Products;
