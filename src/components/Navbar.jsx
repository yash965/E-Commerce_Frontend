import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const state = useSelector(state => state.handleCart);
    
    // State to track if the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation(); // Hook to detect route changes

    // This effect runs whenever the route changes
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [location]); // The dependency array ensures this check runs on every navigation

    const handleLogout = () => {
        // Clear the token from storage
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        // Navigate to the login page
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> BOOK STORE </NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        {isLoggedIn ? (
                            // If user IS logged in, show Logout and Cart
                            <>
                                <button onClick={handleLogout} className="btn btn-outline-dark m-2">
                                    <i className="fa fa-sign-out-alt mr-1"></i> Logout
                                </button>
                                <NavLink to="/cart" className="btn btn-outline-dark m-2">
                                    <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
                                </NavLink>
                            </>
                        ) : (
                            // If user IS NOT logged in, show Login and Register
                            <>
                                <NavLink to="/login" className="btn btn-outline-dark m-2">
                                    <i className="fa fa-sign-in-alt mr-1"></i> Login
                                </NavLink>
                                <NavLink to="/register" className="btn btn-outline-dark m-2">
                                    <i className="fa fa-user-plus mr-1"></i> Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;