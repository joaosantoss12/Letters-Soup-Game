import React from "react";
import "./letter.css";

function Letter(props) {
  const foundWordClass = props.found ? "found" : "";
  let clickedLetterClass = props.clicked;

  const handleClickLetter = () => {
    if (clickedLetterClass === "") {
      clickedLetterClass = "clicked";
      props.handleClickedLetters();
    }
    else{
      clickedLetterClass = "";
      props.handlePopClickedLetters();
    }
  };

  return (
    <div
      className={`letter ${clickedLetterClass} ${foundWordClass}`}
      onClick={handleClickLetter}
    >
      {props.letter}
    </div>
  );
}

export default Letter;
