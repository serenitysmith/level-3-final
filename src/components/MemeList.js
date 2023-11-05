import React from "react";

export default function MemeList({ memesList, editMeme, deleteMeme, inList }) {
  return (
    <div className="meme-list">
      {memesList.map((meme, index) => (
        <div key={index} className="meme-item">
          <img src={meme.randomImage} alt="Meme" />
          <h2 className="textlist-bottom" inlist={true}>{meme.topText}</h2>
          <h2  className="textlist-top" inlist={true}    >{meme.bottomText}</h2>
          <button onClick={() => editMeme(index)}>Edit</button>
          <button onClick={() => deleteMeme(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}