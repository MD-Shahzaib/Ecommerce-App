// CartContext
import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Check if cart data exists in local storage
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            setCartItems(JSON.parse(cartData));
        }
    }, []);

    useEffect(() => {
        // Save cart data to local storage when it changes
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        // setCartItems([...cartItems, item]);

        // Check if the item is already in the cart
        const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

        console.log(itemInCart);

        if (itemInCart) {
            // If the item is already in the cart, update the quantity.
            const updatedCart = cartItems.map((cartItem) =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
            setCartItems(updatedCart);
        } else {
            // If the item is not in the cart, add it with quantity 1.
            const newItem = { ...item, quantity: 1 };
            setCartItems([...cartItems, newItem]);
        }
    };

    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter((item) => item._id !== itemId);
        setCartItems(updatedCart);
        // alert("removeFromCart")
        console.log(cartItems)
        console.log(itemId)
        console.log(updatedCart)
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};