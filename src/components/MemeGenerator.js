import React, { useState, useEffect } from "react";
import MemeEditor from "./MemeEditor";
import MemeDisplay from "./MemeDisplay";
import MemeList from "./MemeList";

export default function MemeGenerator() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });
  const [memesList, setMemesList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    // Fetch memes data from the API and update allMemes state
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  // Other functions for handling memes (getMemeImage, addMeme, editMeme, updateMeme, deleteMeme)
function getMemeImage(){
  const randomNumber = Math.floor(Math.random()* allMemes.length);
  const url = allMemes[randomNumber].url;

  setMeme((prevMeme)=> ({
    ...prevMeme,
    randomImage:url,
  }));
}

function addMeme(){
  const newMeme ={...meme,  
  topText:meme.topText,
bottomText: meme.bottomText,

};
  setMemesList((prevList)=> [...prevList,newMeme]);
  setMeme({
    topText: "",
    bottomText: "",
    randomImage: "",
  });
}

function editMeme(index){
  setMeme(memesList[index]);
  setEditIndex(index);
}

function updateMeme(){
  setMemesList((prevList)=> {
    prevList[editIndex]=meme;
    return[...prevList];
  });
  setMeme({
    topText: "",
    bottomText: "",
    randomImage: "",
  });
  setEditIndex(null);
}

function deleteMeme(index){
  setMemesList((prevList)=> prevList.filter((_, i)=> i  !== index));
}
  return (
    <main>
      <MemeEditor
        meme={meme}
        setMeme={setMeme}
        addMeme={addMeme}
        editMeme={editMeme}
        updateMeme={updateMeme}
        editIndex={editIndex}
      />
      <MemeDisplay meme={meme} getMemeImage={getMemeImage} inList={true} />

      <MemeList
        memesList={memesList}
        editMeme={editMeme}
        deleteMeme={deleteMeme}
        
      />
 {/* Add a "Refresh" button */}
 <button className="get-new" onClick={getMemeImage}>
      Refresh 🖼
    </button>

    </main>
  );
}

