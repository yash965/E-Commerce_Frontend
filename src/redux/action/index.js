// src/redux/action/index.js

// Keep your existing actions
export const addCart = (product) => {
    return {
        type: "ADDITEM",
        payload: product
    }
}

export const delCart = (product) => {
    return {
        type: "DELITEM",
        payload: product
    }
}

// Add this new action
export const setCart = (items) => {
    return {
        type: "SETCART",
        payload: items
    }
}