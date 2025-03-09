import React, { useState } from "react";
import {Star, Angry, Frown, Meh, Smile, Laugh} from "lucide-react"

interface RatingStarSelectionProps {
    maxStars: number;
    selectedStars: number;
    setSelectedStars: (stars: number) => void;
}

const RatingStarSelection: React.FC<RatingStarSelectionProps> = ({ maxStars, selectedStars, setSelectedStars }) => {
    const [hoveredStars, setHoveredStars] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => {
        setHoveredStars(index + 1); // +1 เพราะ index เริ่มจาก 0
    };

    const handleMouseLeave = () => {
        setHoveredStars(null); // รีเซ็ต hover effect
    };

    const handleClick = (index: number) => {
        setSelectedStars(index + 1);
    };

    const emoteIcons: Record<number, JSX.Element> = {
        0: <Angry className="w-8 h-8 text-red-600" />,   
        1: <Angry className="w-8 h-8 text-orange-500" />,
        2: <Frown className="w-8 h-8 text-yellow-500" />,  
        3: <Meh className="w-8 h-8 text-green-500" />,   
        4: <Smile className="w-8 h-8 text-blue-500" />,   
        5: <Laugh className="w-8 h-8 text-purple-500" />
      };
    return (
<div className="flex flex-row items-center gap-2">
<div className="flex pt-2">
            {[...Array(maxStars)].map((_, index) => (
                <Star 
                className={`w-7 h-7 px-1 text-yellow-500 cursor-pointer transition duration-300`
                }
                key={index}
                fill={index < (hoveredStars ?? selectedStars) ? "gold" : "#D3D3D3"}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(index)}
                />
            ))}
        </div>
        <div>
        {emoteIcons[hoveredStars ?? selectedStars] || <Meh className="w-6 h-6 text-gray-400" />}
        </div>
</div>
    );
};

export default RatingStarSelection;
