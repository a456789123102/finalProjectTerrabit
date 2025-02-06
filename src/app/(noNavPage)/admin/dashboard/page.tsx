'use client'
import { useTheme } from "@/app/context/themeContext";
import TopDashboard from "./components/topDashboard";

function AdminPage() {
    const { theme, themeColors } = useTheme();
    return (
        <div className="min-h-screen">
            <div className="flex flex-col min-h-screen">
                <div className="grid grid-cols-4 gap-4 p-6 w-full"
                    style={{ backgroundColor: themeColors.bg }}
                >
                    {/* Top row */}
                    {/* <div className="col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 border flex flex-col border-gray-300" style={{ backgroundColor: themeColors.primary }}>
                            <div>Total Sales</div>
                            <div className="flex flex-row flex-wrap items-baseline gap-1">
                                <div className="text-[1.4rem]">4,786</div>
                                <div className="text-[0.75rem] text-green-400">12%</div>
                                <div className="text-[0.75rem] text-gray-400">since last week</div>
                            </div>
                        </div>
                        <div className="p-4 border flex flex-col border-gray-300" style={{ backgroundColor: themeColors.primary }}>
                            <div>Total Incomes</div>
                            <div className="flex flex-row flex-wrap items-baseline gap-1">
                                <div className="text-[1.4rem]">159,787,745</div>
                                <div className="text-red-400 text-[0.75rem]">-0.34%</div>
                                <div className="text-gray-400 text-[0.75rem]">since last week</div>
                            </div>
                        </div>
                        <div className="p-4 border border-gray-300" style={{ backgroundColor: themeColors.primary }}>
                            <div>Total Orders</div>
                        </div>
                        <div className="p-4 border border-gray-300" style={{ backgroundColor: themeColors.primary }}>
                            <div>Total Sales Revenue</div>
                        </div>
                    </div> */}
                    <TopDashboard />
                    {/* Overview of Revenue and Profit */}
                    <div className="col-span-4 p-4 border border-gray-300" style={{ backgroundColor: themeColors.primary }}>
                        <div className=" mb-4">Overview of Revenue and Profit</div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Sub-grid for the graph and summary */}
                            <div className="p-4 lg:col-span-2 border border-gray-300" style={{ backgroundColor: themeColors.secondary }}>
                                <p>This Year Sales: $35,789</p>
                                <p>This Year Profits: $9,265</p>
                                <p>This Year Sales Revenue: $4,678</p>
                                <div className="h-40 mt-4" style={{ backgroundColor: themeColors.tertiary }}>Graph Placeholder</div>
                            </div>

                            {/* Monthly Sales Growth */}
                            <div className=" border rounded-[4px] shadow-lg  border-gray-300 " style={{ backgroundColor: themeColors.secondary }}>
                                <div className=" p-4 border-b border-gray-300">MONTHLY SALES GROWTH</div>
                                <div className="flex flex-row justify-between items-center p-4">
                                    <div className="flex flex-col">
                                        <div className="text-[1rem]">Sales Revenue</div>
                                        <div className="flex flex-row gap-1 items-baseline">
                                            <div className="text-[1.4rem] ">$5,89,268</div>
                                            <div className="text-[0.75rem] text-red-500">This months</div>
                                        </div>

                                    </div>
                                    <div className="h-36 mt-4 items-center p-2" style={{ backgroundColor: themeColors.tertiary }}>25% Growth Pie charts</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sales Funnel */}
                    <div className="col-span-4 grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 border border-gray-300" style={{ backgroundColor: themeColors.primary }}>
                        <div className="border border-gray-300" style={{ backgroundColor: themeColors.secondary }}>
                            <p>Opportunities: 3,678</p>
                        </div>
                        <div className="p-4 border border-gray-300" style={{ backgroundColor: themeColors.secondary }}>
                            <p>Proposals: 6,398</p>
                        </div>
                        <div className="p-4 border border-gray-300" style={{ backgroundColor: themeColors.secondary }}>
                            <p>Negotiations: 5,289</p>
                        </div>
                        <div className="p-4 border border-gray-300" style={{ backgroundColor: themeColors.secondary }}>
                            <p>More Funnel Data...</p>
                        </div>
                    </div>

                    {/* Overview of Sales Summary */}
                    <div className="col-span-4 p-4 border border-gray-300" style={{ backgroundColor: themeColors.primary }}>
                        <div className="text-lg font-bold mb-4">Overview of Sales Summary</div>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                            <div className="p-4 border border-gray-300" style={{ backgroundColor: themeColors.secondary }}>
                                <p>Total Revenue: $38,925</p>
                            </div>
                            <div className="p-4 border border-gray-300" style={{ backgroundColor: themeColors.secondary }}>
                                <p>Total Tax: $3,926</p>
                            </div>
                            <div className="p-4 border border-gray-300" style={{ backgroundColor: themeColors.secondary }}>
                                <p>Total Income: 73%</p>
                            </div>
                            <div className="p-4 border border-gray-300" style={{ backgroundColor: themeColors.secondary }}>
                                <p>Total Loss: 45%</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 p-4 border border-gray-300" style={{ backgroundColor: themeColors.primary }}>
                        <div className='grid grid-cols-3 gap-2 h-48'>
                            <div className='p-4 border border-gray-300' style={{ backgroundColor: themeColors.secondary }}>new user</div>
                            <div className='p-4 border border-gray-300' style={{ backgroundColor: themeColors.secondary }}>new job assigner</div>
                            <div className='p-4 border border-gray-300' style={{ backgroundColor: themeColors.secondary }}>new job assigner</div>
                        </div>
                    </div>
                    <div className='col-span-4 p-4 h-72 border border-gray-300' style={{ backgroundColor: themeColors.primary }}>Product Sales Details</div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;

