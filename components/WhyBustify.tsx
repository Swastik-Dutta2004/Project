import React from 'react'

const why = () => {
    return (
        <div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-md hover:shadow-xl transition">
                <img src="/images/tickets.svg" alt="" className="w-16 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easy & Fast Booking</h3>
                <p className="text-gray-600 text-sm">
                    Passengers can quickly search buses, compare options, and book tickets within seconds using a simple interface.
                </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-md hover:shadow-xl transition">
                <img src="/images/prices.svg" alt="" className="w-16 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
                <p className="text-gray-600 text-sm">
                    Bustify offers competitive ticket prices and special discounts so passengers always get the best deals.
                </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-md hover:shadow-xl transition">
                <img src="/images/health.svg" alt="" className="w-16 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Safe & Reliable Travel</h3>
                <p className="text-gray-600 text-sm">
                    All buses and operators are verified to ensure passenger safety, comfort, and reliable travel.
                </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-md hover:shadow-xl transition">
                <img src="/images/everyTime.svg" alt="" className="w-16 mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7 Customer Support</h3>
                <p className="text-gray-600 text-sm">
                    Our support team is always available to help with booking issues, cancellations, or travel assistance.
                </p>
            </div>

        </div></div>
    )
}

export default why