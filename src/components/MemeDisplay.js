import React from "react";

export default function MemeDisplay({ meme, getMemeImage, inList }) {
  return (
    <div className="meme">
      <img src={meme.randomImage} className="meme-generated" alt="" />
      <h2 className={inList ? "text-list" : "text-display"}>
        {meme.topText}
      </h2>
      <h2 className={inList ? "text-list" : "text-display"}>
        {meme.bottomText}
      </h2>

    </div>
  );
}