'use client'
import { useTheme } from "@/app/context/themeContext";
import TopDashboard from "./components/topDashboard";
import RatingBox from "./components/RatingBox";
import SalesChartsBox from "./components/salesChartsBox";
import TopSellerBox from "./components/topSellerBox";
import NewUserBox from "./components/newUserBox";
import NewTicketBox from "./components/newTicketBox";

function AdminPage() {
    const { theme, themeColors } = useTheme();
    return (
        <div className="min-h-screen" style={{ backgroundColor: themeColors.bg }}>
            <div className="flex-grow flex flex-col">
                <div className="grid grid-cols-4 gap-4 p-6 w-full"

                >
                    <TopDashboard />
                    {/* Overview of Revenue and Profit */}
                    <div className="col-span-4 " style={{ backgroundColor: themeColors.primary }}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <SalesChartsBox />
                            <RatingBox />
                        </div>
                    </div>

                    <TopSellerBox />
                    <div className="col-span-4  border-gray-300" >
                        <div className='grid lg:grid-cols-2 grid-cols-1 gap-2'>
                            <NewUserBox />
                           <NewTicketBox/>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminPage;

