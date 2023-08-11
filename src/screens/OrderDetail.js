import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    // Fetch order data based on orderId from the server or mock data
    useEffect(() => {
        // Fetch order data here and set it to the state
        // Example mock data:
        const mockOrder = {
            id: 1,
            date: '2023-08-10',
            total: 100.0,
            // ... more order details
        };

        // setOrder(null);
        // setTimeout(() => {
        setOrder(mockOrder);
        // }, 2000)

    }, [orderId]);

    return (
        <div className="bg-white py-10">
            <div className="container mx-auto px-5">

                <section className="text-gray-600 body-font overflow-hidden">
                    <div className="container px-5 py-10 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                                {!order ?
                                    <p>Loading order details...</p>
                                    :
                                    <>
                                        <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Animated Night Hill Illustrations</h1>
                                        <div className="flex mb-4">
                                            <a className="flex-grow text-blue-500 border-b-2 border-blue-500 py-2 text-lg px-1">Description</a>
                                        </div>
                                        <p className="leading-relaxed mb-4">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean.</p>
                                        <div className="flex border-t border-gray-200 py-2">
                                            <span className="text-gray-500">Color</span>
                                            <span className="ml-auto text-gray-900">Blue</span>
                                        </div>
                                        <div className="flex border-t border-gray-200 py-2">
                                            <span className="text-gray-500">Size</span>
                                            <span className="ml-auto text-gray-900">Medium</span>
                                        </div>
                                        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                            <span className="text-gray-500">Quantity</span>
                                            <span className="ml-auto text-gray-900">4</span>
                                        </div>
                                        <div className="flex">
                                            <h3 className='text-gray-900 mr-auto text-2xl font-medium'>Price</h3>
                                            <span className="title-font font-medium text-2xl text-gray-900">$58.00</span>
                                        </div>
                                    </>
                                }
                            </div>
                            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default OrderDetail;
