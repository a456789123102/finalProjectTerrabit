import React, { useEffect } from 'react';
import RatingStarSelection from "./ratingStarSelection";
import { createReview, updateReview } from '@/app/apis/review';
import { useParams } from "next/navigation";

function PersonalReviewBox({
  myReviews = null,
  mode,
  setIsEditClick,
  comment,
  setComment,
  selectedStars,
  setSelectedStars,
}: {
  myReviews?: any;
  mode: string;
  setIsEditClick: (value: boolean) => void;
  comment: string;
  setComment: (value: string) => void;
  selectedStars: number;
  setSelectedStars: (value: number) => void;
}) {
  const { id } = useParams();
  const productId = String(id);

  useEffect(() => {
    if (mode === "edit" && myReviews) {
      setComment(myReviews.comments);
      setSelectedStars(myReviews.rating);
    }
  }, [mode, myReviews, setComment, setSelectedStars]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleCancel = () => {
    setIsEditClick(false);
  };

  const handleSubmit = async () => {
    try {
      if (mode === "create") {
        const res = await createReview(productId, selectedStars, comment);
        console.log("Created review:", res);
        window.location.reload();
      } else if (mode === "edit") {
        console.log("edited");
        const res = await updateReview(productId, selectedStars, comment);
        setIsEditClick(false);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  return (
    <div className="text-gray-600 w-full flex flex-col h-auto">
      <div className="relative w-full">
        <textarea
          className="border min-h-24 text-start p-2 w-full resize-y rounded-[4px] pr-10"
          placeholder="You have purchased this product! Feel free to share your review."
          value={comment}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <div className="flex flex-row justify-between w-full">
        <RatingStarSelection
          maxStars={5}
          selectedStars={selectedStars}
          setSelectedStars={setSelectedStars}
        />
        <div className="flex flex-row items-baseline gap-5 mt-3">
          {mode === "edit" && (
            <div
              className="self-end text-blue-700 underline hover:text-blue-400 cursor-pointer"
              onClick={handleCancel}
            >
              cancel
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-3 rounded w-36 hover:bg-blue-800 self-end"
          >
            {mode === "create" ? <div>Submit Review</div> : <div>Edit Review</div>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonalReviewBox;
