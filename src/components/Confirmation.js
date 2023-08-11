import React from 'react';
import { Link } from 'react-router-dom';

const Confirmation = () => {
    return (
        <div className="bg-slate-200 py-10 h-[calc(100vh-10rem)]">
            <div className="container mx-auto px-5 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-semibold">Order Placed Successfully</h1>
                <p className='my-4'>Your order has been successfully placed. Thank you for shopping with us!</p>
                <Link to="/orders" className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium">View My Orders</Link>
            </div>
        </div>
    );
};

export default Confirmation;
