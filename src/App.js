import { useState, useEffect, useCallback } from "react";

import "./assets/styles/App.css";
import {
  Header,
  Footer,
  ControlPanel,
  GamePanel,
  GameOverModal,
  Top10,
} from "./components/imports";
import {
  LETRAS,
  PALAVRAS,
  TIMEOUT_BASICO,
  TIMEOUT_INTERMEDIO,
  TIMEOUT_AVANCADO,
} from "./constants/index";

let timerId = undefined; // Para usar no timeout

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const handleGameStarted = () => {
    if (gameStarted) {
      setGameStarted(false);
      winGame();
    } else {
      setGameWords(selectedLevel);
      setGameStarted(true);
      setClassTimer("");
    }
  };

  const [selectedLevel, setSelectedLevel] = useState("0");
  const handleLevelChange = (event) => {
    const { value } = event.currentTarget;
    setSelectedLevel(value);
  };

  let selectedWord = [];

  const [timer, setTimer] = useState();
  const [classTimer, setClassTimer] = useState("");
  useEffect(() => {
    let levelTimer;
    if (gameStarted) {
      if (selectedLevel === "1") {
        setTimer(TIMEOUT_BASICO);
        levelTimer = TIMEOUT_BASICO;
      } else if (selectedLevel === "2") {
        setTimer(TIMEOUT_INTERMEDIO);
        levelTimer = TIMEOUT_INTERMEDIO;
      } else if (selectedLevel === "3") {
        setTimer(TIMEOUT_AVANCADO);
        levelTimer = TIMEOUT_AVANCADO;
      }

      timerId = setInterval(() => {
        let nextTimer;
        setTimer((previousState) => {
          nextTimer = previousState - 1;
          if (nextTimer === -1) {
            setIsGameOverModalOpen(true);
            setGameStarted(false);
            setTimer(levelTimer);
          } else if (nextTimer <= 10) {
            setClassTimer("tenSeconds");
          }
          return nextTimer;
        });
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameStarted]); // Realiza efeito quando variaveis do gameStarted alterarem

  const [tabuleiro, setTabuleiro] = useState([]);
  const setGameTabuleiro = (level) => {
    let linhas = 0;
    let colunas = 0;

    switch (level) {
      case "1":
        // 12 colunas x 10 linhas
        linhas = 10;
        colunas = 12;
        break;
      case "2":
        // 14 colunas x 12 linhas
        linhas = 12;
        colunas = 14;
        break;
      case "3":
        // 16 colunas x 14 linhas
        linhas = 14;
        colunas = 16;
        break;
      default:
        break;
    }

    for (let i = 0; i < linhas; i++) {
      // INICIALIZAR O TABULEIRO VAZIO COM VARIAVEIS
      for (let j = 0; j < colunas; j++) {
        tabuleiro.push({
          x: i,
          y: j,
          name: "",
          key: "",
          found: "",
          clicked: "",
        });
      }
    }

    for (let i = 0; i < tabuleiro.length; i++) {
      // COLOCAR AS LETRAS NO TABULEIRO
      tabuleiro[i].name = letters[i].name;
      tabuleiro[i].key = letters[i].key;
      tabuleiro[i].clicked = letters[i].clicked;
    }

    let X=0;
    let Y=0;
    let orientacao;
    let ordem;

    for (let i = 0; i < words.length; i++) {

      X = Math.floor(Math.random() * linhas);
      Y = Math.floor(Math.random() * colunas);

      orientacao = Math.floor(Math.random() * 2); // 3 se for diagonal
      ordem = Math.floor(Math.random() * 2);

      if(orientacao === 0){
        while (words[i].length > colunas - Y){
          Y = Math.floor(Math.random() * colunas);
        }
      }
      else if(orientacao === 1){
       while (words[i].length > linhas - X){
          X = Math.floor(Math.random() * linhas);
        }
      }
      else if(orientacao === 2){
        while (words[i].length > linhas - X || words[i].length > colunas - Y){
          X = Math.floor(Math.random() * linhas);
          Y = Math.floor(Math.random() * colunas);
        }
      }

      if(ordem === 0){
      for (let k = 0; k < words[i].length; k++) {
        tabuleiro[X * colunas + Y].name = words[i][k];

        if(orientacao === 0){
          Y++;
        }
        else if(orientacao === 1){
          X++;
        }
        /* else if(orientacao === 2){
          console.log("DIAGONAL!");
          X++;
          Y++;
        } */
        // Y++ => HORIZONTAL  X++ => VERTICAL  Y++ e X++ => DIAGONAL
      }
      }
      else if(ordem === 1){
        for (let k = words[i].length-1; k > -1; k--) {
          tabuleiro[X * colunas + Y].name = words[i][k];
  
          if(orientacao === 0){
            Y++;
          }
          else if(orientacao === 1){
            X++;
          }
          /* else if(orientacao === 2){
            console.log("DIAGONAL!");
            X++;
            Y++;
          } */
          // Y++ => HORIZONTAL  X++ => VERTICAL  Y++ e X++ => DIAGONAL
        }
      }

    }
    

    setTabuleiro(tabuleiro);
  };

  const [words, setArrayWords] = useState([]);
  const [letters, setArrayLetters] = useState([]);
  const setGameWords = (level) => {
    let numOfWords;
    let numOfLetters;

    switch (level) {
      case "1":
        numOfWords = 5;
        numOfLetters = 120; // 12 colunas x 10 linhas
        break;
      case "2":
        numOfWords = 10;
        numOfLetters = 168; // 14 colunas x 12 linhas
        break;
      case "3":
        numOfWords = 15;
        numOfLetters = 224; // 16 colunas x 14 linhas
        break;
      default:
        numOfWords = 0;
        numOfLetters = 0;
        break;
    }

    const arrayWords = [];
    const usedIndex = [];

    for (let i = 0; i < numOfWords; i++) {
      while (usedIndex.length < numOfWords) {
        const randomWordIndex = Math.floor(Math.random() * PALAVRAS.length);
        const randomWord = PALAVRAS[randomWordIndex];

        while (!usedIndex.includes(randomWordIndex)) {
          usedIndex.push(randomWordIndex);
          arrayWords.push(randomWord);
        }
      }
    }

    setArrayWords(arrayWords);

    const arrayLetters = []; // PREENCHER A GRID
    const arrayLettersAux = [];

    for (let i = 0; i < numOfLetters; i++) {
      const randomLetterIndex = Math.floor(Math.random() * LETRAS.length);
      const randomLetter = LETRAS[randomLetterIndex];
      arrayLetters.push(randomLetter);
    }

    arrayLetters.forEach((letter, index) => {
      arrayLettersAux.push({
        key: `${letter}-${index}`,
        name: letter,
        found: "",
        clicked: "",
      });
    });

    setArrayLetters(arrayLettersAux);
  };

  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsGameOverModalOpen(false);
    setTotalPoints(0);
    setGameStarted(false);
    setArrayWords([]);
      setArrayLetters([]);
      setTabuleiro([]);
  };
  const winGame = () => {
    setIsGameOverModalOpen(true);
  };

  const [totalPoints, setTotalPoints] = useState(0);
  // Pontuação: numero de cartas/2 * o tempo (quanto maior o nível mais ganha!)
  // Desconta 5 pontos sempre q não faz par.
  const updatePoints = (operacaoSoma = true) => {
    let pointsSum = totalPoints;
    if (operacaoSoma) {
      pointsSum += timer * (words.length / 2);
    } else {
      pointsSum < 5 ? (pointsSum = 0) : (pointsSum -= 5);
    }
    setTotalPoints(pointsSum);
  };

  // OS USE EFFECTS QUANDO AFETAVAM O "BARALHANÇO" DAS PALAVRAS E LETRAS NAO FUNCIONAVA PARA O
  // QUE ESTIVESSE POR BAIXO, OU SEJA, AS PALAVRAS ERAM ALTERADAS PARA OUTAS RANDOM MAS AS LETRAS
  // CONTINUAVAM IGUAIS, ENTAO OS USE EFFECTS FICARAM PARA ATUALIZAR AS LETRAS E AS FUNCOES DE HANDLE
  // DE GAMESTARTED E SELECTLEVEL FICARAM PARA ATUALIZAR AS PALAVRAS, O QUE É O MESMO MAS POR ALGUMA RAZAO
  // AO USAR 2 FUNCOES NO USE EFFECTS A SEGUNDA NAO FUNCIONAVA

  useEffect(() => {
     if (gameStarted) {
      setGameTabuleiro(selectedLevel);
    } 
  }, [gameStarted]);

  useEffect(() => {
    setGameWords(selectedLevel);
  }, [selectedLevel]);

  return (
    <div id="container">
      <Header />
      <main className="main-content">
        <ControlPanel
          handleLevelChange={handleLevelChange}
          handleGameStarted={handleGameStarted}
          gameStarted={gameStarted}
          selectedLevel={selectedLevel}
          timer={timer}
          classTimer={classTimer}
          totalPoints={totalPoints}
          // showTop10={showTop10}
        />
        <GamePanel
          gameStarted={gameStarted}
          words={words}
          //letters={letters}
          tabuleiro={tabuleiro}
          selectedLevel={selectedLevel}
          selectedWord={selectedWord}
          onGameWin={handleGameStarted}
          updatePoints={updatePoints}
          winGame={winGame}
        />
      </main>
      <Footer />
      <GameOverModal
        isGameOverModalOpen={isGameOverModalOpen}
        totalPoints={totalPoints}
        handleModalClose={handleModalClose}
      />
      {/* <Top10 newNickName={newNickName} newPontuation={newPontuation} showTop10={showTop10} /> */}
    </div>
  );
}

export default App;
