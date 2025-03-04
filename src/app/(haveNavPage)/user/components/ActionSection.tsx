import { CircleX, HandCoins } from 'lucide-react';
import React from 'react';

function ActionSection({ order, handleCancelledOrder, handleRefoundOrder }) {

    const cancelledBTN = (
        <div className="p-2 text-red-500 cursor-pointer flex items-center gap-2 hover:underline" onClick={() => handleCancelledOrder(order.id)}>
          <CircleX size={15} />
          <div>Cancelled Order</div>
        </div>
      );
      
      const refoundBTN = (
        <div className="p-2 text-orange-500 cursor-pointer flex items-center gap-2 hover:underline" onClick={() => handleRefoundOrder(order.id)}>
          <HandCoins size={15} />
          <div>Request Refund</div>
        </div>
      );
      


    const actions = [
        { orderStatus: "pending_payment_proof", AvailableOptions: [cancelledBTN, refoundBTN] },
        { orderStatus: "pending_payment_verification", AvailableOptions: [refoundBTN] },
        { orderStatus: "payment_verified", AvailableOptions: [refoundBTN] },
        { orderStatus: "cancelled_by_admin", AvailableOptions: [] },
        { orderStatus: "cancelled_by_user", AvailableOptions: [] },
        { orderStatus: "refund_completed", AvailableOptions: [] },
    ];

    const availableActions = actions.find(action => action.orderStatus === order.status)?.AvailableOptions || [];

    return (
        <div>
            <div className="border-b border-gray-300 mb-3 py-[10px] items-baseline text-[1.1rem]">Action:</div>
            <div className="text-[0.8rem] text-white flex gap-2 flex-col">
                {availableActions.length > 0 ? (
                    availableActions.map(option => option) 
                ) : (
                    <span className="text-gray-400">No actions available</span> 
                )}
            </div>
        </div>
    );
}

export default ActionSection;
