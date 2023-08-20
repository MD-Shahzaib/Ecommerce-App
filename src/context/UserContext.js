import React, { createContext, useState, useEffect } from 'react';

// Create a context to hold user-related data and functions.
export const UserContext = createContext();

// Define a component that will serve as the provider for the UserContext.
export const UserContextProvider = ({ children }) => {

    // State to hold the user data.
    const [user, setUser] = useState(null);
    const [userOrders, setUserOrders] = useState([]);

    // useEffect hook to fetch the user profile when the component mounts.
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Get the authentication token from local storage.
                const token = localStorage.getItem('authToken');
                if (token) {
                    // Send a request to fetch the user profile using the token.
                    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/profile`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    // Parse the response and update the user state.
                    const userData = await response.json();
                    setUser(userData.userProfile);
                } else {
                    // If no token is found, set the user state to null.
                    setUser(null);
                }
            } catch (error) {
                // Handle errors by setting the user state to null.
                setUser(null);
            }
        }
        // Call the fetchUser function when the component mounts.
        fetchUser();
    }, []);

    // Function to handle user logout.
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        window.location.reload();
    };

    // useEffect hook to fetch the user orders when the component mounts.
    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                // Get the authentication token from local storage.
                const token = localStorage.getItem('authToken');
                if (token) {
                    // Send a request to fetch the user orders using the token.
                    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/orders/userorders`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch user orders');
                    }
                    // Parse the response and update the userOrders state.
                    const userOrdersData = await response.json();
                    setUserOrders(userOrdersData.orders);
                } else {
                    // If no token is found, set the userOrders state to empty array.
                    setUserOrders([]);
                }
            } catch (error) {
                // Handle errors by setting the userOrders state to empty array.
                setUserOrders([]);
            }
        }
        fetchUserOrders();
    }, []);

    return (
        <UserContext.Provider value={{ user, handleLogout, userOrders }}>
            {children}
        </UserContext.Provider>
    );
};