import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    // Check if cart data exists in local storage.
    useEffect(() => {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            setCartItems(JSON.parse(cartData));
        }
    }, []);

    // Save cart data to local storage when it changes.
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);









    const addToCart = (item) => {
        // (1)
        // setCartItems([...cartItems, item]);


        // (2)
        // // Calculate the total price based on the original product price and the selected quantity
        // const totalPrice = item.price * quantity;
        // // Add the product to the cart with the selected quantity and total price
        // const item = { ...product, quantity, totalPrice };
        // addToCart(item);


        // (3)
        // Check if the item is already in the cart
        const itemInCart = cartItems.find((cartItem) => cartItem._id === item._id);
        if (itemInCart) {
            // If the item is already in the cart, update the quantity.
            const updatedCart = cartItems.map((cartItem) =>
                cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
            setCartItems(updatedCart);
        } else {
            // If the item is not in the cart, add it with quantity 1.
            const newItem = { ...item, quantity: 1 };
            setCartItems([...cartItems, newItem]);
        }


        // (4)
        // const itemInCartIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);
        // if (itemInCartIndex !== -1) {
        //     // If the item is already in the cart, update the quantity and total price.
        //     const updatedCart = [...cartItems];
        //     const updatedItem = {
        //         ...updatedCart[itemInCartIndex],
        //         quantity: updatedCart[itemInCartIndex].quantity + 1,
        //         totalPrice: (updatedCart[itemInCartIndex].quantity + 1) * item.price,
        //     };
        //     updatedCart[itemInCartIndex] = updatedItem;
        //     setCartItems(updatedCart);
        // } else {
        //     // If the item is not in the cart, add it with quantity 1 and calculate the total price.
        //     const newItem = {
        //         ...item,
        //         quantity: 1,
        //         totalPrice: item.price,
        //     };
        //     setCartItems([...cartItems, newItem]);
        // }
    };











    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter((item) => item._id !== itemId);
        setCartItems(updatedCart);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const incrementQuantity = (itemId) => {
        const updatedCart = cartItems.map((item) => {
            if (item._id === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
    };

    const decrementQuantity = (itemId) => {
        const updatedCart = cartItems.map((item) => {
            if (item._id === itemId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity }}>
            {children}
        </CartContext.Provider>
    );
};