  import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";

const Checkout = () => {
  // Use local state to hold cart items fetched from the API
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart data from the backend when the component loads
  useEffect(() => {
    const loadCart = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/cart", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items);
        } else {
          console.error("Failed to load cart for checkout.");
          setCartItems([]);
        }
      } catch (error) {
        console.error("An error occurred while fetching the cart:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const EmptyCart = () => {
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 bg-light text-center">
              <h4 className="p-3 display-5">No item in Cart</h4>
              <Link to="/" className="btn btn-outline-dark mx-4">
                <i className="fa fa-arrow-left"></i> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      );
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    // NOTE: The property names might be different based on your API response.
    // I am assuming a structure like { book: { price: ... }, quantity: ... }
    cartItems.map((item) => {
      // Make sure 'item.book' and 'item.book.price' exist. If not, adjust to your data structure.
      if (item.book && typeof item.book.price === 'number') {
        subtotal += item.book.price * item.quantity;
        totalItems += item.quantity;
      }
      return null;
    });

    return (
      <>
  <div className="container py-5">
    <div className="row my-4">
      <div className="col-md-5 col-lg-4 order-md-last">
        {/* Order Summary card */}
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
          </div>
        </div>
      </div>
      <div className="col-md-7 col-lg-8">
        {/* --- START OF BILLING ADDRESS FORM --- */}
        <div className="card mb-4">
          <div className="card-header py-3">
            <h4 className="mb-0">Billing address</h4>
          </div>
          <div className="card-body">
            <form className="needs-validation" noValidate>
              <div className="row g-3">
                <div className="col-sm-6 my-1">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input type="text" className="form-control" id="firstName" required />
                </div>

                <div className="col-sm-6 my-1">
                  <label htmlFor="lastName" className="form-label">Last name</label>
                  <input type="text" className="form-control" id="lastName" required />
                </div>

                <div className="col-12 my-1">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="you@example.com" required />
                </div>

                <div className="col-12 my-1">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" className="form-control" id="address" placeholder="Full Address" required />
                </div>

                {/* --- UPDATED SECTION --- */}
                <div className="col-md-5 my-1">
                  <label htmlFor="country" className="form-label">Country</label>
                  <select className="form-select" id="country" required>
                    <option value="">Choose...</option>
                    <option>India</option>
                  </select>
                </div>

                <div className="col-md-4 my-1">
                  <label htmlFor="state" className="form-label">State</label>
                  <select className="form-select" id="state" required>
                    <option value="">Choose...</option>
                    <option>Haryana</option>
                    <option>Punjab</option>
                    <option>Maharashtra</option>
                    <option>Delhi</option>
                  </select>
                </div>

                <div className="col-md-3 my-1">
                  <label htmlFor="zip" className="form-label">Zip</label>
                  <input type="text" className="form-control" id="zip" required />
                </div>
                {/* --- END OF UPDATED SECTION --- */}

              </div>

              <hr className="my-4" />

              <h4 className="mb-3">Payment</h4>

              <div className="row gy-3">
                <div className="col-md-6">
                  <label htmlFor="cc-name" className="form-label">Name on card</label>
                  <input type="text" className="form-control" id="cc-name" required />
                  <small className="text-muted">Full name as displayed on card</small>
                </div>

                <div className="col-md-6">
                  <label htmlFor="cc-number" className="form-label">Credit card number</label>
                  <input type="text" className="form-control" id="cc-number" required />
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                  <input type="text" className="form-control" id="cc-expiration" required />
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-cvv" className="form-label">CVV</label>
                  <input type="text" className="form-control" id="cc-cvv" required />
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary" type="submit">
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
        {/* --- END OF BILLING ADDRESS FORM --- */}
      </div>
    </div>
  </div>
</>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {loading ? (
          <p className="text-center">Loading your cart...</p>
        ) : cartItems.length > 0 ? (
          <ShowCheckout />
        ) : (
          <EmptyCart />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;