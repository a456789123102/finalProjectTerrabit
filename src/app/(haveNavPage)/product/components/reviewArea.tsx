import React from 'react';
import StarRating from '@/app/components/starRating';
import { useUserStore } from '@/store/zustand';
import { useRouter } from 'next/navigation';
import personalReviewBox from './personalReviewBox';

interface Review {
    id: number;
    rating: number;
    userName: string;
    comments: string;
}
function ReviewArea({ reviews, myReviews, myReviewPermission }) {
    const router = useRouter();
    const handleLoginClick = () => {
        const currentPath = encodeURIComponent(window.location.pathname);
        router.push(`/login?redirect=${currentPath}`);
        return;
    }

    const { username } = useUserStore();
    return (
        <div>
            <div className="bg-gray-50 text-slate-800 rounded-md h-auto p-1 shadow-md">
                <div className="p-4 w-full border border-gray-300 bg-white rounded-lg shadow-sm"> {/* ✅ เส้นขอบสมมาตร */}
                    {myReviews !== null ? (
                        <div className="p-4 my-2 bg-gray-100 rounded-lg border border-gray-300">
                            <div className="font-semibold text-lg text-gray-900">{myReviews.userName}</div>
                            <div className="flex items-center mt-1">
                                <StarRating rating={myReviews.rating} />
                            </div>
                            <div className="mt-2 text-gray-700">{myReviews.comments}</div>
                        </div>
                    ) : myReviewPermission ? (
                        <div className="text-gray-600 text-center italic">
                            You have purchased this product! Feel free to share your review.
                        </div>
                    ) : username ? (
                        <div className="text-gray-600 text-center italic">
                            You need to purchase this product before leaving a review.
                        </div>
                    ) : (
                        <div className="text-gray-600 text-center italic text-[0.9rem]">
                            Please{" "}
                            <button
                                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline px-1"
                                onClick={handleLoginClick}
                            >
                                log in
                            </button>{" "}
                            and buy this product to gain review access.
                        </div>
                    )}
                </div>
            </div>




            {reviews.length > 0 ? (
                reviews.map((review: Review) => (
                    <div key={review.id} className="p-3 my-2 bg-white border">
                        <div className="font-semibold">{review.userName}</div>
                        <div className="flex flex-row">
                            <StarRating rating={review.rating} />
                        </div>
                        <div className="text-slate-800">{review.comments}</div>
                    </div>
                ))
            ) : (
                <div className="text-[0.8rem] p-4">
                    This product has not been reviewed yet...
                </div>
            )}
        </div>
    );
}

export default ReviewArea;
