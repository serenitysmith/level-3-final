import React from "react";

export default function MemeDisplay({ meme, getMemeImage }) {
  return (
    <div className="meme">
      <img src={meme.randomImage} className="meme-generated" alt="" />
      <h2 className="text-top"  >
        {meme.topText}
      </h2>
      <h2 className="text-bottom">
        {meme.bottomText}
      </h2>

    </div>
  );
}