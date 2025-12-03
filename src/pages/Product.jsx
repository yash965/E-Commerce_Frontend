import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast"; // 1. Import toast for notifications

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({}); // Initialize as an object for consistency
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const dispatch = useDispatch();

  // 2. Updated addProduct function with API logic
  const addProduct = async (product) => {
    const token = localStorage.getItem("jwtToken");

    // 1. Check if the user is logged in
    if (!token) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    // 2. Send the request to the backend
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart`, {
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
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/books/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);

      if (data.category) {
        const response2 = await fetch(
          `${process.env.REACT_APP_API_URL}/api/books/category/${data.category}`
        );
        const data2 = await response2.json();
        setSimilarProducts(data2.filter(p => p.id !== data.id)); // Filter out the current product
      }
      setLoading2(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    // ... No changes here
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={product.image}
                // Use bookName for consistency
                alt={product.bookName}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{product.category}</h4>
              <h1 className="display-5">{product.bookName}</h1>
              <h3 className="display-6 my-4">${product.price}</h3>
              <p className="lead">{product.description}</p>
              <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product)}
              >
                Add to Cart
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    // ... No changes here
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => {
              return (
                <div key={item.id} className="card mx-4 text-center">
                  <img
                    className="card-img-top p-3"
                    src={item.image}
                    alt={item.bookName}
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.bookName.substring(0, 15)}...
                    </h5>
                  </div>
                  <div className="card-body">
                    <Link
                      // 3. Corrected this link to point to the product page
                      to={`/product/${item.id}`}
                      className="btn btn-dark m-1"
                    >
                      Buy Now
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => addProduct(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">You may also Like</h2>
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;