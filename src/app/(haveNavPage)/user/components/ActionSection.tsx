import React from 'react';

function ActionSection({ order, handleCancelledOrder, handleRefoundOrder }) {

    const cancelledBTN = (
        <button
            key="cancelled"
            className="p-2 px-4 bg-red-500 hover:bg-red-400 shadow-md rounded"
            onClick={() => handleCancelledOrder(order.id)}
        >
            Cancel Order
        </button>
    );

    const refoundBTN = (
        <button
            key="refound"
            className="p-2 px-4 bg-orange-500 hover:bg-orange-400 shadow-md rounded"
            onClick={() => handleRefoundOrder(order.id)}
        >
            Request Refund
        </button>
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
            <div className="text-[1.1rem] mb-2 font-bold">Action:</div>
            <div className="text-[0.8rem] text-white flex gap-2">
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
