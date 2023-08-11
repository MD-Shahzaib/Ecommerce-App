import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    // Fetch orders data from the server or mock data
    useEffect(() => {
        // Fetch orders data here and set it to the state
        // Example mock data:
        const mockOrders = [
            { id: 1, date: '2023-08-10', total: 100.0 },
            { id: 2, date: '2023-08-11', total: 150.0 },
            // ... more orders
        ];
        setOrders(mockOrders);
    }, []);

    return (
        <div className={`bg-gray-100 py-10 ${orders.length === 0 && 'h-[calc(100vh-10rem)]'}`}>
            <div className="container mx-auto p-5 bg-slate-200 rounded max-w-2xl">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">My Orders</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {orders.length === 0 ? (
                        <p className="text-lg text-gray-600">You don't have any orders yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {orders.map((order) => (
                                <li key={order.id} className="border-b pb-4 last:border-b-0">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-lg text-gray-800">Order ID: {order.id}</p>
                                        <Link to={`/order/${order.id}`} className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md font-medium">View Details</Link>
                                    </div>
                                    <p className="text-gray-500 mt-1">Date: <span className='text-black'>{order.date}</span></p>
                                    <p className="text-gray-500 mt-1">Total: <span className='text-black'>${order.total}</span></p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;