import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCart } from "../redux/action";

const Cart = () => {
  // Use local state for cart items and loading status
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Function to fetch cart data from the backend
  // In Cart.js
const loadCart = async () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    setLoading(false);
    return;
  }

  try {
    const response = await fetch("https://book-store-uajv.onrender.com/api/cart", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      // --- FIX IS HERE ---
      // Access the nested "items" array from the response object
      setCartItems(data.items); 
      
      // Also update the dispatch to pass the correct array
      dispatch(setCart(data.items)); 
    } else {
      console.error("Failed to fetch cart");
      setCartItems([]);
    }
  } catch (error) {
    console.error("Error loading cart:", error);
  } finally {
    setLoading(false);
  }
};

  // Fetch the cart data when the component mounts
  useEffect(() => {
    loadCart();
  }, []);

  // Function to handle adding an item (increasing quantity)
  const addItem = async (product) => {
    const token = localStorage.getItem("jwtToken");
    try {
      await fetch("https://book-store-uajv.onrender.com/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: product.book.id,
          quantity: 1,
        }),
      });
      loadCart(); // Reload the cart from the server to show changes
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Function to handle removing an item (decreasing quantity or removing)
  const removeItem = async (product) => {
    const token = localStorage.getItem("jwtToken");
    try {
      await fetch(`https://book-store-uajv.onrender.com/api/cart/${product.book.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      loadCart(); // Reload the cart to show changes
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const EmptyCart = () => (
    // ... (This component is perfect, no changes needed)
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">Your Cart is Empty</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  // --- THIS IS THE FULLY IMPLEMENTED COMPONENT ---
  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    // Calculate totals from the local 'cartItems' state
    cartItems.forEach((item) => {
      subtotal += item.book.price * item.quantity;
      totalItems += item.qty;
    });

    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                  </div>
                  <div className="card-body">
                    {cartItems.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div className="bg-image rounded" data-mdb-ripple-color="light">
                                <img
                                  src={item.book.image}
                                  alt={item.book.bookName}
                                  className="w-100"
                                />
                              </div>
                            </div>
                            <div className="col-lg-5 col-md-6">
                              <p><strong>{item.book.bookName}</strong></p>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                                <button className="btn px-3" onClick={() => removeItem(item)}>
                                  <i className="fas fa-minus"></i>
                                </button>
                                <p className="mx-5">{item.quantity}</p>
                                <button className="btn px-3" onClick={() => addItem(item)}>
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                              <p className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted">{item.qty}</span> x ${item.book.price}
                                </strong>
                              </p>
                            </div>
                          </div>
                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({totalItems})<span>${Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>${shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>${Math.round(subtotal + shipping)}</strong>
                        </span>
                      </li>
                    </ul>
                    <Link to="/checkout" className="btn btn-dark btn-lg btn-block">
                      Go to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  if (loading) {
     // ... (This part is perfect, no changes needed)
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {loading ? (
          <h4 className="text-center">Loading Cart...</h4>
        ) : cartItems.length > 0 ? (
          <ShowCart />
        ) : (
          <EmptyCart />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;