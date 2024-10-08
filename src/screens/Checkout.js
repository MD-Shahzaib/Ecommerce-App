import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useContext(CartContext);
    const token = localStorage.getItem('authToken');

    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    // Grab OrderTotal: (cartTotal + deliveryTax - discount) same as cart subTotal method.
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryTax = Math.ceil(cartTotal * 0.1);
    const discount = Math.ceil((cartTotal + deliveryTax) * 0.1);
    const orderTotal = cartTotal + deliveryTax - discount;

    // handle Order Placed.
    const handleOrderPlaced = async (e) => {
        try {
            e.preventDefault();
            const orderData = {
                products: cartItems.map(item => ({
                    productId: item._id,
                    productName: item.name,
                    productQuantity: item.quantity,
                    productPrice: item.price
                })),
                address: shippingInfo.address,
                amount: orderTotal,
            };
            // Send the data to the server using the fetch function.
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });

            if (response.status === 201) {
                clearCart(); // Clear the cart after successful checkout
                navigate('/confirmation'); // Navigate to confirmation screen
            } else {
                // Handle error cases.
                const errorData = await response.json();
                console.log('Error during checkout:', errorData);
            }
        } catch (error) {
            // Handle errors from the fetch request.
            console.log('Error during checkout:', error);
            alert('Error during checkout');
        }
    };

    return (
        <div className="bg-slate-200 py-10">
            <div className="container mx-auto px-5">
                <form onSubmit={handleOrderPlaced} className="bg-white p-6 shadow-md rounded-md max-w-2xl mx-auto">
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
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={shippingInfo.lastName}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                                className="rounded-md border border-gray-300 p-2"
                                required
                            />
                            <input
                                type="text"
                                name="address"
                                value={shippingInfo.address}
                                onChange={handleInputChange}
                                placeholder="Address"
                                className="col-span-2 rounded-md border border-gray-300 p-2"
                                required
                            />
                            <input
                                type="text"
                                name="city"
                                value={shippingInfo.city}
                                onChange={handleInputChange}
                                placeholder="City"
                                className="col-span-2 rounded-md border border-gray-300 p-2"
                                required
                            />
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
                                        <td className="p-2"><span className='text-sm mr-0.5'>&#8360;</span>{item.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-wrap justify-between max-[365px]:justify-center items-center mt-4 gap-2">
                        <div className="font-medium text-xl">
                            <span>Order Total:</span>
                            <span className="ml-2 text-blue-600"><span className='text-sm mr-0.5'>&#8360;</span>{orderTotal}</span>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium">Place Order</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Checkout;