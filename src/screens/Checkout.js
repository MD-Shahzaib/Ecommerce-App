import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useContext(CartContext);
    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        // ... add more fields as needed
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement your actual checkout logic here, e.g., sending data to the server
        console.log('Shipping Info:', shippingInfo);
        console.log('Cart Items:', cartItems);
        // Clear the cart after successful checkout and navigate to confirmation screen.
        clearCart();
        navigate('/confirmation');
    };

    const orderTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="bg-slate-200 py-10">
            <div className="container mx-auto px-5">
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md max-w-2xl mx-auto">
                    <h1 className="text-3xl font-semibold pb-2 mb-4 border-b-2 border-blue-500">Checkout</h1>
                    {/* Shipping Information */}
                    <div className="mb-4">
                        <h2 className="text-lg font-medium mb-2">Shipping Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="firstName"
                                value={shippingInfo.firstName}
                                onChange={handleInputChange}
                                placeholder="First Name"
                                className="rounded-md border border-gray-300 p-2"
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={shippingInfo.lastName}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                                className="rounded-md border border-gray-300 p-2"
                            />
                            <input
                                type="text"
                                name="address"
                                value={shippingInfo.address}
                                onChange={handleInputChange}
                                placeholder="Address"
                                className="col-span-2 rounded-md border border-gray-300 p-2"
                            />
                            <input
                                type="text"
                                name="city"
                                value={shippingInfo.city}
                                onChange={handleInputChange}
                                placeholder="City"
                                className="col-span-2 rounded-md border border-gray-300 p-2"
                            />
                            {/* Add more fields as needed */}
                        </div>
                    </div>
                    {/* Order Summary */}
                    <div className="overflow-auto">
                        <h2 className="text-lg font-medium mb-2">Order Summary</h2>
                        {/* Cart items and total */}
                        <table className="w-full mb-4">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2 text-left">Product</th>
                                    <th className="p-2 text-left">Quantity</th>
                                    <th className="p-2 text-left">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item._id} className="border-b">
                                        <td className="p-2 truncate">{item.name}</td>
                                        <td className="p-2">{item.quantity}</td>
                                        <td className="p-2">${item.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-wrap justify-between max-[365px]:justify-center items-center mt-4 gap-2">
                        <div className="font-medium text-xl">
                            <span>Order Total:</span>
                            <span className="ml-2 text-blue-600">${orderTotal}</span>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium">Place Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;