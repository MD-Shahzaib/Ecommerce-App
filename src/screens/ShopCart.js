import React from 'react';

const ShopCart = () => {
    const cartItems = [
        {
            id: 1,
            image: 'https://dummyimage.com/200x150',
            title: 'Product 1',
            category: 'Category 1',
            price: 10,
            quantity: 2,
        },
        {
            id: 2,
            image: 'https://dummyimage.com/200x150',
            title: 'Product 2',
            category: 'Category 2',
            price: 15,
            quantity: 1,
        },
        {
            id: 3,
            image: 'https://dummyimage.com/200x150',
            title: 'Product 3',
            category: 'Category 1',
            price: 20,
            quantity: 3,
        },
    ];
    const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);
    const deliveryTax = 5;
    const discount = 10;
    const subtotal = cartTotal + deliveryTax - discount;

    return (
        <div className="min-h-screen bg-slate-200 text-slate-800">
            <div className="container mx-auto px-5 py-10">
                <h1 className="text-3xl font-bold mb-4">Shopping Cart ({cartItems.length} items)</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {cartItems.map(item => (
                        <div key={item.id} className="bg-white p-4 shadow-md rounded-md">
                            <div className="flex items-center">
                                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
                                <div>
                                    <p className="font-bold">{item.title}</p>
                                    <p>{item.category}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center">
                                    <button className="bg-blue-500 text-white rounded-l px-3 py-2 focus:outline-none">
                                        -
                                    </button>
                                    <span className="px-3">{item.quantity}</span>
                                    <button className="bg-blue-500 text-white rounded-r px-3 py-2 focus:outline-none">
                                        +
                                    </button>
                                </div>
                                <button className="text-red-500 focus:outline-none">Remove</button>
                            </div>
                            <div className="mt-4">
                                <p className="text-lg">Price: ${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white p-4 shadow-md rounded-md flex items-center justify-between flex-wrap mt-8 sm:flex-no-wrap">
                    <div>
                        <p className="text-lg">Subtotal: ${cartTotal}</p>
                        <p className="text-lg">Delivery Tax: ${deliveryTax}</p>
                        <p className="text-lg">Discount: -${discount}</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <p className="text-3xl font-bold">Total: ${subtotal}</p>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default ShopCart;