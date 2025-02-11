import React from 'react';
import StarRating from '@/app/components/starRating';
import { useUserStore } from '@/store/zustand';
import { useRouter } from 'next/navigation';
import PersonalReviewBox from './personalReviewBox';

interface Review {
    id: number;
    rating: number;
    userName: string;
    comments: string;
    updatedAt: string;
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

            <div className="bg-gray-50 text-slate-800 rounded-[4px] h-auto p-1 gap-4">
                <div className="p-3 w-full border border-gray-300 bg-white">
                    {myReviews !== null ? (
                        <div className='p-1'>
                            <div className='flex flex-row gap-2 items-baseline'>
                                <div className="font-semibold text-slate-900 text-xl ">{myReviews.userName}</div>
                                <div className="flex flex-row">
                                    <StarRating rating={myReviews.rating} />
                                </div>
                            </div>
                            <div className='text-[0.75rem] text-slate-500 mb-2'>  {new Date(myReviews.updatedAt).toLocaleString("en-GB", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                            }).replace(",", "")}</div>
                            <div className="text-slate-700 min-h-20 overflow-hidden break-words whitespace-normal">
                                {myReviews.comments}
                            </div>

                        </div>
                    ) : myReviewPermission ? (
                        <PersonalReviewBox />
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
                    <div key={review.id} className="p-1 my-3 bg-white border border-gray-300 rounded-[4px]">
                        <div className='p-3 border'>
                            <div className='flex flex-row gap-2 items-baseline'>
                                <div className="font-semibold text-slate-900">{review.userName}</div>
                                <div className="flex flex-row">
                                    <StarRating rating={review.rating} />
                                </div>
                            </div>
                            <div className='text-[0.75rem] text-slate-500 mb-2 '>
                            {new Date(review.updatedAt).toLocaleString("en-GB", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                            }).replace(",", "")}
                            </div>
                            <div className="text-slate-600 min-h-20">{review.comments}</div>
                        </div>
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
