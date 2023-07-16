// import React, { createContext, useEffect, useState } from 'react';

// // UserContext
// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         // Check if user data exists in local storage
//         const userData = localStorage.getItem('user');
//         if (userData) {
//             setUser(JSON.parse(userData));
//         }
//     }, []);

//     useEffect(() => {
//         // Save user data to local storage when it changes
//         localStorage.setItem('user', JSON.stringify(user));
//     }, [user]);

//     const login = (userData) => {
//         setUser(userData);
//     };

//     const logout = () => {
//         setUser(null);
//     };

//     return (
//         <UserContext.Provider value={{ user, login, logout }}>
//             {children}
//         </UserContext.Provider>
//     );
// };






import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('UserInfo');
            if (token) {
                const authToken = JSON.parse(token).token;
                try {
                    const response = await fetch("http://localhost:5000/users/profile", {
                        headers: { Authorization: `Bearer ${authToken}` },
                    });
                    const userData = await response.json();
                    setUser(userData.data);
                } catch (error) {
                    console.log(error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        }
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('UserInfo');
        setUser(null);
        window.location.reload();
    };

    return (
        <UserContext.Provider value={{ user, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};
