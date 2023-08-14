import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Orders = () => {
    const { userOrders } = useContext(UserContext);
    return (
        <div className={`bg-gray-100 py-10 ${userOrders.length === 0 && 'h-[calc(100vh-10rem)]'}`}>
            <div className="container mx-auto p-4 max-w-2xl">
                <h1 className="text-3xl font-semibold mb-6 pb-2 text-gray-800 border-b-2 border-blue-500 flex items-center"><span>My Orders</span><button className='ml-2 mt-2 text-base w-7 bg-slate-700 text-white rounded-full py-0.5'>{userOrders.length}</button></h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {userOrders.length === 0 ? (
                        <p className="text-lg text-gray-600">You don't have any orders yet.</p>
                    ) : (
                        <ul className="space-y-4 overflow-auto">
                            {userOrders.map((order) => {
                                const { _id, createdAt, amount, status } = order;
                                const date = new Date(createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                                return (
                                    <li key={_id} className="border-b pb-4 last:border-b-0 last:pb-0">
                                        <div className="flex flex-wrap-reverse items-center justify-between gap-1">
                                            <p className="text-gray-600 truncate text-base font-medium">Order-ID: <span className='text-slate-900'>{order._id}</span></p>
                                            <Link to={`/order/${_id}`} className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md font-medium">View Details</Link>
                                        </div>
                                        <p className="text-gray-600 text-sm font-medium">Date: <span className='text-slate-900'>{date}</span></p>
                                        <p className="text-gray-600 text-sm font-medium">Total: <span className='text-slate-900'><span className='text-xs mr-0.5'>&#8360;</span>{amount}</span></p>
                                        <p className="text-gray-600 text-sm font-medium mb-1">Status: <span className='text-emerald-700'>{status}</span></p>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;