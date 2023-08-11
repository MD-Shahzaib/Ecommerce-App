import React, { createContext, useState, useEffect } from 'react';

// Create a context to hold user-related data and functions.
export const UserContext = createContext();

// Define a component that will serve as the provider for the UserContext.
export const UserContextProvider = ({ children }) => {

    // State to hold the user data.
    const [user, setUser] = useState(null);

    // useEffect hook to fetch the user profile when the component mounts.
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Get the authentication token from local storage.
                const token = localStorage.getItem('authToken');
                if (token) {
                    // Send a request to fetch the user profile using the token.
                    const response = await fetch("http://localhost:5000/api/users/profile", {
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

    return (
        <UserContext.Provider value={{ user, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};