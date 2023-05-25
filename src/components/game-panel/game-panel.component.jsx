import "./game-panel.css";
import { Letter, Word } from "../imports";
import { useState, useEffect } from "react";
import { LETRAS } from "../../constants/index";

function GamePanel(props) {
  let gameClasse = "";
  let selectedWord = "";
  const [clickedLettersX, setClickedLettersX] = useState([]);
  const [clickedLettersY, setClickedLettersY] = useState([]);
  const [clickedLetters, setClickedLetters] = useState([]);
  const [clickedLettersAux, setClickedLettersAux] = useState([]);
  const [foundLetters, setFoundLetters] = useState([]);
  const [direction, setDirection] = useState("");

  if (props.selectedLevel === "0" || props.gameStarted === false) {
    gameClasse = "hide";
  } else if (props.selectedLevel === "2") {
    gameClasse = "intermedio";
  } else if (props.selectedLevel === "3") {
    gameClasse = "avancado";
  }

  const handleClickedLetters = (letter) => {
    if (props.gameStarted) {
      if (clickedLetters.length === 0) {
        letter.clicked = "clicked";
        setClickedLettersX(letter.x);
        setClickedLettersY(letter.y);

        setClickedLetters((previousState) => {
          const copyState = [...previousState];
          copyState.push(letter.name);
          return copyState;
        });
        setClickedLettersAux((previousState) => {
          // KEY DA LETRA PORQUE SE FOSSE NAME SELECIONAVA TODAS
          const copyState = [...previousState];
          copyState.push(letter.key);
          return copyState;
        });
      } else if (clickedLetters.length === 1) {
        if (clickedLettersX === letter.x) {
          letter.clicked = "clicked";

          setClickedLetters((previousState) => {
            const copyState = [...previousState];
            copyState.push(letter.name);
            return copyState;
          });

          setClickedLettersAux((previousState) => {
            // KEY DA LETRA PORQUE SE FOSSE NAME SELECIONAVA TODAS
            const copyState = [...previousState];
            copyState.push(letter.key);
            return copyState;
          });

          setDirection("horizontal");
        } else if (clickedLettersY === letter.y) {
          letter.clicked = "clicked";

          setClickedLetters((previousState) => {
            const copyState = [...previousState];
            copyState.push(letter.name);
            return copyState;
          });

          setClickedLettersAux((previousState) => {
            // KEY DA LETRA PORQUE SE FOSSE NAME SELECIONAVA TODAS
            const copyState = [...previousState];
            copyState.push(letter.key);
            return copyState;
          });

          setDirection("vertical");
        } 
        /* else if (
          clickedLettersY === letter.y - 1 &&
          clickedLettersX === letter.x - 1
        ) {
          letter.clicked = "clicked";

          setClickedLetters((previousState) => {
            const copyState = [...previousState];
            copyState.push(letter.name);
            return copyState;
          });

          setClickedLettersAux((previousState) => {
            // KEY DA LETRA PORQUE SE FOSSE NAME SELECIONAVA TODAS
            const copyState = [...previousState];
            copyState.push(letter.key);
            return copyState;
          });

          setDirection("diagonal");
        }*/
      } 

      if (direction === "horizontal") {
        if (clickedLettersX === letter.x) {
          letter.clicked = "clicked";

          setClickedLetters((previousState) => {
            const copyState = [...previousState];
            copyState.push(letter.name);
            return copyState;
          });
          setClickedLettersAux((previousState) => {
            // KEY DA LETRA PORQUE SE FOSSE NAME SELECIONAVA TODAS
            const copyState = [...previousState];
            copyState.push(letter.key);
            return copyState;
          });
        }
      } else if (direction === "vertical") {
        if (clickedLettersY === letter.y) {
          letter.clicked = "clicked";

          setClickedLetters((previousState) => {
            const copyState = [...previousState];
            copyState.push(letter.name);
            return copyState;
          });
          setClickedLettersAux((previousState) => {
            // KEY DA LETRA PORQUE SE FOSSE NAME SELECIONAVA TODAS
            const copyState = [...previousState];
            copyState.push(letter.key);
            return copyState;
          });
        }
      } 
      /* else if (direction === "diagonal") {
        if (
          clickedLettersY + 1 === letter.y  &&
          clickedLettersX + 1 === letter.x 
        ) {
          letter.clicked = "clicked";

          setClickedLetters((previousState) => {
            const copyState = [...previousState];
            copyState.push(letter.name);
            return copyState;
          });
          setClickedLettersAux((previousState) => {
            // KEY DA LETRA PORQUE SE FOSSE NAME SELECIONAVA TODAS
            const copyState = [...previousState];
            copyState.push(letter.key);
            return copyState;
          });
        }
      } */
    }
  };

  const handlePopClickedLetters = (letter) => {
    if (props.gameStarted) {
      if (letter.clicked != "") {
        letter.clicked = "";
      }
      setClickedLetters((previousState) => {
        // Adicionar o nome das palavras
        const copyState = [...previousState];
        copyState.pop(letter.name);
        return copyState;
      });
      setClickedLettersAux((previousState) => {
        // Adicionar o nome das palavras
        const copyState = [...previousState];
        copyState.pop(letter.key);
        return copyState;
      });
      if(clickedLetters.length === 0){
        setClickedLettersX([]);
        setClickedLettersY([]);
      }
    } else {
      setClickedLetters([]);
      setClickedLettersAux([]);
    }
  };

  useEffect(() => {
    if (props.gameStarted) {
      selectedWord = clickedLetters.join(""); // JUNTAR TODOS OS MEMBROS DO ARRAY NUMA STRING
      for (let i = 0; i < props.tabuleiro.length; i++) {
        if (selectedWord === props.words[i]) {
          // PALAVRA SELECIONADA ESTÁ NA LISTA
          console.log("ENCONTROU UMA A PALAVRA!");
          props.updatePoints();
          setFoundLetters(clickedLettersAux);
          for (let j = 0; j < props.words.length; j++) {
            // ELMINAR PALAVRA DA LISTA
            if (selectedWord === props.words[i]) {
              props.words.splice(i, 1);
            }
          }
          if (props.words.length === 0) {
            props.winGame();
          }
          setClickedLetters([]);
          setClickedLettersX([]);
          setClickedLettersY([]);
          setDirection("");
        }
      }
    }
  }, [clickedLetters]);

  useEffect(() => {
    setClickedLetters([]);
    setClickedLettersAux([]);
    setClickedLettersX([]);
    setClickedLettersY([]);
    setFoundLetters([]);
    setDirection("");
  }, [props.gameStarted]);

  function checkIfLetterFound(letter) {
    for (let i = 0; i < foundLetters.length; i++) {
      if (letter.key === foundLetters[i]) {
        return true;
      }
    }
    return false;
  }

  const [addWord, setAddWord] = useState("dontAddWord");
  const handleAddWords1 = () => {
    if (addWord === "dontAddWord") {
      setAddWord("addWord");
    } else {
      setAddWord("dontAddWord");
    }
  };

  const handleAddWords2 = () => {
    // ADICIONAR NOVA PALAVRA NO TABULEIRO
    let word = document.querySelector("input").value.toUpperCase();
    let array = [];

    props.words.push(word);

    for (let i = word.length - 1; i > -1; i--) {
      array.unshift(word[i]);
    }

    let numOfLettersPerLine;

    switch (props.selectedLevel) {
      case "1":
        numOfLettersPerLine = 12; // 12 colunas x 10 linhas
        break;
      case "2":
        numOfLettersPerLine = 14; // 14 colunas x 12 linhas
        break;
      case "3":
        numOfLettersPerLine = 16; // 16 colunas x 14 linhas
        break;
      default:
        numOfLettersPerLine = 0;
        break;
    }

    for (let i = 0; i < numOfLettersPerLine - word.length; i++) {
      const randomLetterIndex = Math.floor(Math.random() * LETRAS.length);
      const randomLetter = LETRAS[randomLetterIndex];
      array.push(randomLetter);
    }

    array.forEach((letter, index) => {
      props.tabuleiro.push({
        key: `0000${letter}-${index}`,
        name: letter,
        found: "",
      });
    });

    document.querySelector("input").value = "";
    setAddWord("dontAddWord");
  };

  return (
    <section className="game-panel">
      <span className="panel">
        <div className="letters">
          <h3 className={`title ${gameClasse}`}>Sopa de Letras</h3>
          <div className={`letterlist ${gameClasse}`} id="game">
            {props.tabuleiro.map((letter) => (
              <Letter
                key={letter.key}
                class={letter.found}
                letter={letter.name}
                clicked={letter.clicked}
                gameStarted={props.gameStarted}
                handleClickedLetters={() => {
                  handleClickedLetters(letter);
                }}
                handlePopClickedLetters={() => {
                  handlePopClickedLetters(letter);
                }}
                found={checkIfLetterFound(letter)}
              />
            ))}
          </div>
        </div>
        <div className="words">
          <div className="header-game-panel">
            <h3 className={`title ${gameClasse}`}>Palavras</h3>
            <button className={`${gameClasse}`} onClick={handleAddWords1}>
              +
            </button>
          </div>
          <div className={`wordlist ${gameClasse}`}>
            {props.words.map((word) => (
              <Word key={word} word={word} />
            ))}

            <div className="newWordInput">
              <input
                type="text"
                placeholder="Adicionar palavra"
                className={`${gameClasse} ${addWord}`}
              ></input>
              <button
                onClick={handleAddWords2}
                className={`${gameClasse} ${addWord}`}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </span>
    </section>
  );
}

export default GamePanel;
