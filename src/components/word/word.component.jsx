import React from "react";
import "./word.css";

function Word(props) {

    return (
      <div className="word">
        {props.word}
      </div>
    );
  }
  
  export default Word;