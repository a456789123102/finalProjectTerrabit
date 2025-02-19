'use client'
import { useTheme } from "@/app/context/themeContext";
import TopDashboard from "./components/topDashboard";
import RatingBox from "./components/RatingBox";
import SalesChartsBox from "./components/salesChartsBox";

function AdminPage() {
    const { theme, themeColors } = useTheme();
    return (
        <div className="min-h-screen">
            <div className="flex flex-col min-h-screen">
                <div className="grid grid-cols-4 gap-4 p-6 w-full"
                    style={{ backgroundColor: themeColors.bg }}
                >
                    <TopDashboard />
                    {/* Overview of Revenue and Profit */}
                    <div className="col-span-4 " style={{ backgroundColor: themeColors.primary }}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Sub-grid for the graph and summary */}
                            {/* <div className="rounded-[4px] lg:col-span-2 border border-gray-300" style={{ backgroundColor: themeColors.base }}>
                                <div className="p-3 border-b border-gray-300 font-medium text-[1.4rem]">OVERVIEW ORDER AND INCOMES</div>
                                <div className="p-4">
                                    <div className="flex flex-row justify-between">
                                        <div>
                                            <div className="text-0.9rem ">This Year Sales</div>
                                            <div className=" flex flex-row items-baseline gap-1">
                                                <div className="text-[1.4rem]">4,500</div>
                                                <div className="text-red-500 text-[0.8rem]">- 0.9%</div>
                                                <div className="text-gray-400 text-[0.8rem]">last year</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-0.9rem ">This Year Incomes</div>
                                            <div className=" flex flex-row items-baseline gap-1">
                                                <div className="text-[1.4rem]">4,50000</div>
                                                <div className="text-red-500 text-[0.8rem]">- 20.04%</div>
                                                <div className="text-gray-400 text-[0.8rem]">last year</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-0.9rem ">Refound rate</div>
                                            <div className=" flex flex-row items-baseline gap-1">
                                                <div className="text-[1.4rem]">12.14%</div>
                                                <div className="text-green-500 text-[0.8rem]">20.04%</div>
                                                <div className="text-gray-400 text-[0.8rem]">last year</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-40 mt-4" style={{ backgroundColor: themeColors.tertiary }}>Graph Placeholder</div>
                                </div>
                            </div> */}
                            <SalesChartsBox />
                            <RatingBox />
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

