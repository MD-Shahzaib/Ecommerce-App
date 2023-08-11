import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Check if cart data exists in local storage and load it
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

    // Add an item to the cart or update its quantity and price
    const addToCart = (item) => {
        const itemInCartIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);
        if (itemInCartIndex !== -1) {
            // If the item is already in the cart, update the quantity and total price.
            const updatedCart = [...cartItems];
            const updatedItem = {
                ...updatedCart[itemInCartIndex],
                quantity: updatedCart[itemInCartIndex].quantity + 1,
                price: (updatedCart[itemInCartIndex].quantity + 1) * item.price,
            };
            updatedCart[itemInCartIndex] = updatedItem;
            setCartItems(updatedCart);
        } else {
            // If the item is not in the cart, add it with quantity 1 and calculate the total price.
            const newItem = {
                ...item,
                quantity: 1,
                price: item.price,
            };
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