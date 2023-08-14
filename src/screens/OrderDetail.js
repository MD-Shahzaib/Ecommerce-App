import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// ICONS.
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const token = localStorage.getItem('authToken');

    // Fetch order data based on orderId from the server.
    const fetchSingleOrder = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const { specificOrder } = await response.json();
                setOrder(specificOrder);
            } else {
                console.log('Error during Get Order:', response.statusText);
            }
        } catch (error) {
            console.log("Error during Get Order:", error);
        }
    };

    useEffect(() => {
        fetchSingleOrder();
    }, [id]);

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        {!order ?
                            <p>Loading order details...</p>
                            :
                            <>
                                <div className='flex items-center gap-2 mb-2'>
                                    <BsFillArrowLeftCircleFill
                                        onClick={() => navigate('/orders')}
                                        className='text-3xl hover:text-slate-700 text-slate-600 cursor-pointer'
                                    />
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest">MS-COMMERCIAL</h2>
                                </div>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 truncate">Order Id: {order._id}</h1>

                                <p className="mb-2">Date: <span className='font-medium'>{new Date(order?.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span></p>

                                <p className="mb-2">Status: <span className='text-emerald-700 font-medium'>{order.status}</span></p>

                                <p className="leading-relaxed mb-4 text-center rounded-md bg-emerald-100 text-emerald-800 font-medium">Your order has been successfully placed.</p>

                                <div className="overflow-auto">
                                    {/* Order products and total */}
                                    <table className="w-full mb-4">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="p-2 text-left">Product</th>
                                                <th className="p-2 text-left">Price</th>
                                                <th className="p-2 text-left">Quantity</th>
                                                <th className="p-2 text-left">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.products.map((item) => (
                                                <tr key={item.productId} className="border-b">
                                                    <td className="p-2 truncate">{item.productName}</td>
                                                    <td className="p-2"><span className='text-sm mr-0.5'>&#8360;</span>{item.productPrice}</td>
                                                    <td className="p-2">{item.productQuantity}</td>
                                                    <td className="p-2"><span className='text-sm mr-0.5'>&#8360;</span>{item.productPrice * item.productQuantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <span className="title-font font-medium text-2xl text-gray-900">Order Total</span>
                                    <span className="title-font font-medium text-2xl text-blue-500"><span className='text-base mr-0.5'>&#8360;</span>{order.amount}</span>
                                </div>
                            </>
                        }
                    </div>
                    <img src="https://dummyimage.com/400x400" alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" />
                </div>
            </div>
        </section>
    );
};

export default OrderDetail;