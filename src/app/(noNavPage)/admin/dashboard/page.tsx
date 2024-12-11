'use client'
function AdminPage() {
    return (
        <div className="min-h-screen bg-gray-900"> {/* ใช้ min-h-screen เพื่อให้พื้นหลังเต็มหน้าจอ */}
            <div className="flex flex-col min-h-screen">
                <div className="grid grid-cols-4 gap-4 p-6 text-white w-full">
                    {/* Top row */}
                    <div className="bg-gray-800 p-4">Total Sales</div>
                    <div className="bg-gray-800 p-4">Total Profits</div>
                    <div className="bg-gray-800 p-4">Total Orders</div>
                    <div className="bg-gray-800 p-4">Total Sales Revenue</div>

                    {/* Overview of Revenue and Profit */}
                    <div className="col-span-4 bg-gray-800 p-4">
                        <div className="text-lg font-bold mb-4">Overview of Revenue and Profit</div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Sub-grid for the graph and summary */}
                            <div className="bg-gray-700 p-4 lg:col-span-2">
                                <p>This Year Sales: $35,789</p>
                                <p>This Year Profits: $9,265</p>
                                <p>This Year Sales Revenue: $4,678</p>
                                <div className="h-40 bg-gray-600 mt-4">Graph Placeholder</div>
                            </div>
                            <div className="bg-gray-700 p-4">
                                <div className="text-lg font-bold mb-4">Monthly Sales Growth</div>
                                <p>Sales Revenue: $5,89,268</p>
                                <div className="h-20 bg-gray-600 mt-4">25% Growth Placeholder</div>
                            </div>
                        </div>
                    </div>

                    {/* Sales Funnel */}
                    <div className="col-span-4 grid grid-cols-1 lg:grid-cols-4 gap-4 bg-gray-800 p-4">
                        <div className="bg-gray-700 p-4">
                            <p>Opportunities: 3,678</p>
                        </div>
                        <div className="bg-gray-700 p-4">
                            <p>Proposals: 6,398</p>
                        </div>
                        <div className="bg-gray-700 p-4">
                            <p>Negotiations: 5,289</p>
                        </div>
                        <div className="bg-gray-700 p-4">
                            <p>More Funnel Data...</p>
                        </div>
                    </div>

                    {/* Overview of Sales Summary */}
                    <div className="col-span-4 bg-gray-800 p-4">
                        <div className="text-lg font-bold mb-4">Overview of Sales Summary</div>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                            <div className="bg-gray-700 p-4">
                                <p>Total Revenue: $38,925</p>
                            </div>
                            <div className="bg-gray-700 p-4">
                                <p>Total Tax: $3,926</p>
                            </div>
                            <div className="bg-gray-700 p-4">
                                <p>Total Income: 73%</p>
                            </div>
                            <div className="bg-gray-700 p-4">
                                <p>Total Loss: 45%</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 bg-gray-800 p-4">
                        <div className='grid grid-cols-3 gap-2 h-48'>
                            <div className='bg-gray-700 p-4'>new user</div>
                            <div className='bg-gray-700 p-4'>new job assigner</div>
                            <div className='bg-gray-700 p-4'>new job assigner</div>
                        </div>
                    </div>
                    <div className='col-span-4 bg-gray-800 p-4 h-72'>Product Sales Details</div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
