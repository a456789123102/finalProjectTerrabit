import React, { useEffect, useState } from 'react'
import RatingStarSelection from "./ratingStarSelection"
import {SquarePen} from "lucide-react"
import { createReview } from '@/app/apis/review';
import { useParams } from "next/navigation";

function PersonalReviewBox() {
  const [comment, setComment] = useState<string>("")
  const [selectedStars, setSelectedStars] = useState(4);
  const { id } = useParams(); 
  const productId = String(id);


  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async() => {
    console.log("Submitting comment:", comment,"rating:",selectedStars)
    console.log("Product ID:",productId);
    try {
     const res = await createReview(productId,selectedStars,comment)
     console.log("Created review:",res);
      window.location.reload();
    } catch (error) {
      console.error("Error creating review:", error);
    }
  }

  return (
    <div className="text-gray-600 w-full flex flex-col h-auto ">
<div className="relative w-full">
  <textarea
    className="border min-h-24 text-start p-2 w-full resize-y rounded-[4px] pr-10"
    placeholder="You have purchased this product! Feel free to share your review."
    value={comment}
    onChange={handleInputChange}
  ></textarea>
  <SquarePen className="absolute top-2 right-2 w-5 h-5 text-gray-500 hover:text-gray-700" />
</div>

      <div className='flex flex-row justify-between w-full'>
        <RatingStarSelection
          maxStars={5}
          selectedStars={selectedStars}
          setSelectedStars={setSelectedStars}
        />
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-3 rounded mt-3 w-36 hover:bg-blue-800 self-end">
          Submit Review
        </button>

      </div>
    </div>


  )
}

export default PersonalReviewBox