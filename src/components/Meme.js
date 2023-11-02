import React, {useState, useEffect} from "react";

// take out memes data so its not still triyng to pull from local file as well 
// import memesData from "./memesData";

export default function Meme() {

    

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  // took out memes data call and leave array empty sicne we are no longer calling  memes data from local file 
//   const [allMemes, setAllMemes] = React.useState(memesData);



// Initialize an empty array to store memes
const [allMemes, setAllMemes] = React.useState([]);

const [memesList, setMemesList] = useState([]);
const [editIndex, setEditIndex] = useState(null);


// we are gonna add  an api call here instead of pulling directly from our local js file

   // Fetch memes data from the API and update allMemes state
React.useEffect(() => {
 
    fetch( "https://api.imgflip.com/get_memes")
    .then(res => res.json())
// console log data first to make sure ap request is working 
// .then(data => console.log(data))


 // change above stement to set all memes instead of conole log now that api is wokring 

// looking at the challenge above, we only want the array property so we cant just use data, we end up using data.data.memes since thats what our object is called-- see memesDats.js. scrimba told me to do this but was throwing an error, worked when changed back to data 
.then(data => setAllMemes(data.data.memes ))



    //dependics array goes  here but we leave it empty becuase nothing is changing in state or making a new api request so array remains empty 
}, []);

// checking to see if data is working 
console.log(allMemes)

// Select a random meme image from the fetched data
  function getMemeImage() {
    // took out below loine and changed the rest to aCCESS allMemes
    // const memesArray = allMemes.data.memes;
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;

    // Update the meme state with the selected image
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }


  function handleChange(event) {
    const {name, value} = event.target
    // call set meme and access the previous meme, use curly braces surrounded wiht paranthes as an implict object return
    
    // Update the meme state based on the input field being edited
    setMeme(prevMeme =>({
       // this copies all the properties of the previous meme
       ...prevMeme,
// this changes the top and bottom text depending on what name gets pulled in from the target
[name] : value

    }))
}


function addMeme() {
    // Create a new meme object based on the current state
const newMeme = {...meme};
//add the new meme to a list 


setMemesList((prevList) => [...prevList, newMeme]);



//clear the name input field 
setMeme({
    topText: "",
    bottomText: "",
    randomImage: "",
});
}


function editMeme(index){
    // set the meme input fields wiht the meme to be edited 
 
    setMeme(memesList[index]);
setEditIndex(index);

}


// Update the meme in the memesList array
function updateMeme(){
    //  // Set the meme input fields with the meme to be edited
setMemesList((prevList)=> {
    prevList[editIndex] = meme;
    return [...prevList];
});


// Clear the meme input fields
setMeme({
    topText: "",
    bottomText: "",
    randomImage: "",
  });


  // Clear the editingIndex
  setEditIndex(null);
}


// Delete a meme from the memesList array
function deleteMeme(index){

    setMemesList((prevList) => prevList.filter((_, i) => i !== index));
}
  return (
    <main>
      <div className="inputs">
        <input
          // added a name property to each input so we can watch for changes

          name="topText"
          type="text"
          placeholder="Top text"
          className="Shutup"
          /// added values so they can be controlled coomponents
          value={meme.topText}
          // added a handle change ND hNDLE CHANGE FUNCTION ABOVE 
          onChange={handleChange}
        />
        <input
        /// added values so they can be controlled compoentents
          name="bottomText"
          type="text"
          placeholder="Bottom text"
          className="take-my"
          value={meme.bottomText}
          onChange={handleChange}
        />


{/* it first checks whether the editIndex is not null, indicating whether an item is being edited. If it's not null, it displays an "Update" button. If it's null, it displays an "Add" button. */}

{editIndex !== null ? (
          <button className="edit-meme" onClick={updateMeme}>
            Update 🖼
          </button>
        ) : (
          <button className="add-meme" onClick={addMeme}>
            Add 🖼
          </button>
        )
        }
      </div>


      {/* This div displays the selected meme image using the meme.randomImage URL. */}
      <div className="meme">
        <img src={meme.randomImage} className="meme-generated" alt="" />
      </div>


      {/* maps through the memesList array and generates elements for each meme in the list. It displays each meme's image, an "Edit" button (which calls the editMeme function when clicked), and a "Delete" button (which calls the deleteMeme function when clicked). */}
      <div className="meme-list">
        {memesList.map((meme, index) => (
          <div key={index} className="meme-item">
            <img src={meme.randomImage} alt="Meme" />
            <button onClick={() => editMeme(index)}>Edit</button>
            <button onClick={() => deleteMeme(index)}>Delete</button>
          </div>
        ))}
      </div>
      <button className="get-new" onClick={getMemeImage}>
        Refresh 🖼
      </button>
      <div className="meme">
      

        {/* changed the hard coded h2s to pull in our object values in state wiht meme.topTextand meme.bottom */}
        <h2 className="text-top">{meme.topText}</h2>
        <h2 className="text-bottom">{meme.bottomText}</h2>
      </div>
    </main>
    );
        }


