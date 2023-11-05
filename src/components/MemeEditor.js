import React from "react";

export default function MemeEditor({
  meme,
  setMeme,
  addMeme,
  editMeme,
  updateMeme,
  editIndex,
}) {
    function handleChange(event){
        const{name, value} = event.target
        setMeme(prevMeme => ({
          ...prevMeme,
          [name]:value
        }))
      }
  return (
    <div className="inputs">
      <input
        // Input fields for top and bottom text
        name="topText"
        type="text"
        placeholder="Top text"
        className="Shutup"
        value={meme.topText}
        onChange={handleChange}
      />
      <input
        // Input fields for top and bottom text
        /// added values so they can be controlled compoentents
        name="bottomText"
        type="text"
        placeholder="Bottom text"
        className="take-my"
        value={meme.bottomText}
        onChange={handleChange}

      />
      {editIndex !== null ? (
        <button className="edit-meme" onClick={updateMeme}>
          Update 🖼
        </button>
      ) : (
        <button className="add-meme" onClick={addMeme}>
          Add 🖼
        </button>
      )}
    </div>
  );
}
