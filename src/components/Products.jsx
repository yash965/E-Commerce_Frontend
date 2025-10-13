import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  // --- MODIFIED FUNCTION ---
  // This function now calls the backend API
  const addProduct = async (product) => {
    const token = localStorage.getItem("jwtToken");

    // 1. Check if the user is logged in
    if (!token) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    // 2. Send the request to the backend
    try {
      const response = await fetch("https://book-store-uajv.onrender.com/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: product.id,
          quantity: 1,
        }),
      });

      // 3. Handle the response
      if (response.ok) {
        toast.success("Added to cart!");
        // We still dispatch to Redux to keep the navbar count updated instantly
        dispatch(addCart(product));
      } else {
        toast.error("Failed to add item. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred while adding to the cart.");
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://book-store-uajv.onrender.com/api/books");
      if (componentMounted) {
        const productData = await response.json();
        setData(productData);
        setFilter(productData);
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  // Your Loading, filterProduct, and ShowProducts components remain mostly the same.
  // The only change is inside ShowProducts, on the button's onClick.

  const Loading = () => {
    // ... (no changes here)
  };

  const filterProduct = (cat) => {
    // ... (no changes here)
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
           {/* ... (Filter buttons remain the same) ... */}
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.bookName.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                </ul>
                <div className="card-body">
                  <Link
                    to={"/product/" + product.id}
                    className="btn btn-dark m-1"
                  >
                    Buy Now
                  </Link>
                  {/* --- MODIFIED BUTTON onClick --- */}
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;