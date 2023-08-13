import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart data from local storage after initial state is set
    useEffect(() => {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            setCartItems(JSON.parse(cartData));
        }
    }, []);

    // Save cart data to local storage when it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        const itemInCartIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);
        if (itemInCartIndex !== -1) {
            const updatedCart = [...cartItems];
            updatedCart[itemInCartIndex].quantity += item.quantity;
            updatedCart[itemInCartIndex].size = item.size;
            setCartItems(updatedCart);
        } else {
            const newItem = { ...item, quantity: item.quantity, size: item.size };
            setCartItems([...cartItems, newItem]);
        }
    };

    // Remove an item from the cart
    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter((item) => item._id !== itemId);
        setCartItems(updatedCart);
    };

    // Clear the entire cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Increment the quantity of an item in the cart
    const incrementQuantity = (itemId) => {
        const updatedCart = cartItems.map((item) =>
            item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCart);
    };

    // Decrement the quantity of an item in the cart
    const decrementQuantity = (itemId) => {
        const updatedCart = cartItems.map((item) =>
            item._id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCart);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

/*
(Bugs) 

1- when page reload cart empty fix this todo.
2- subtotal gone to checkout instead of total fix this todo.

*/