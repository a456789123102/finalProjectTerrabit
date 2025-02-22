'use client'
import { useTheme } from "@/app/context/themeContext";
import TopDashboard from "./components/topDashboard";
import RatingBox from "./components/RatingBox";
import SalesChartsBox from "./components/salesChartsBox";
import TopSellerBox from "./components/topSellerBox";
import NewUserBox from "./components/newUserBox";

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
                            <SalesChartsBox />
                            <RatingBox />
                        </div>
                    </div>

                    {/* Sales Funnel */}
                    {/* <div className="col-span-4 grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 border border-gray-300" style={{ backgroundColor: themeColors.primary }}>
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
                    </div> */}

                    <TopSellerBox />
                    <div className="col-span-4  border-gray-300" >
                        <div className='grid grid-cols-2 gap-2 h-48'>
                        <NewUserBox/>
                            <div className='p-4 border border-gray-300' style={{ backgroundColor: themeColors.base }}>new job assigner</div>
                           
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminPage;

