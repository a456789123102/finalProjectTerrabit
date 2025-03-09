"use client";
import React, { useEffect, useState } from "react";

interface PublishedCheckboxProps {
  isPublished: boolean | null;
  setIsPublished: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const PublishedCheckbox: React.FC<PublishedCheckboxProps> = ({ isPublished, setIsPublished }) => {
  const [publishedCheck, setPublishedCheck] = useState<boolean>(isPublished === null || isPublished === true);
  const [notPublishedCheck, setNotPublishedCheck] = useState<boolean>(isPublished === null || isPublished === false);

  useEffect(() => {
    if (publishedCheck && notPublishedCheck) {
      setIsPublished(null);
    } else if (publishedCheck) {
      setIsPublished(true);
    } else if (notPublishedCheck) {
      setIsPublished(false);
    }

    if (!publishedCheck && !notPublishedCheck) {
      setNotPublishedCheck(true);
      setIsPublished(false);
    }
  }, [publishedCheck, notPublishedCheck, setIsPublished]);

  return (
    <div className="flex flex-col text-[0.8rem] gap-1">
      {/* Published Checkbox */}
      <div className="flex items-center gap-2 w-full">
        <input type="checkbox" checked={publishedCheck} onChange={() => setPublishedCheck(!publishedCheck)} />
        <span>Published</span>
      </div>

      {/* Unpublished Checkbox */}
      <div className="flex items-center gap-2">
        <input type="checkbox" checked={notPublishedCheck} onChange={() => setNotPublishedCheck(!notPublishedCheck)} />
        <span>Unpublished</span>
      </div>
    </div>
  );
};

export default PublishedCheckbox;
