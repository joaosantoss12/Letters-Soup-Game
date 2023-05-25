import "./control-panel.css";

function ControlPanel(props){
  const gameStartedClass = props.gameStarted ? "gameStarted" : "";
  const gameStartedClassInstructions = props.gameStarted ? "" : "instrucoes";

  const instructionsAlert = () => {
    alert("| ===== Bem-vindo ao jogo de Sopa de Letras ===== |\n=> Para jogar selecione um nível de jogo e clique no botão de iniciar jogo\n=> Caso encontre uma palavra na sopa de letras, clique em cima das respetivas letras\n=>Se as letras selecionadas formarem uma palavra pretendida, esta fica destacada a cinzento e não será possivel clicar nas letras novamente e a palavra irá desaparecer da lista\n=> Se pretender adicionar uma nova palavra, clique no botão '+' na aba das palavras\n=> O jogo acaba quando todas as palavras são descobertas ou quando o tempo chega a 0");
  }

    return (
        <section id="panel-control">
          <form className="form">
            <fieldset className="form-group">
              <label htmlFor="btLevel">Nível:</label>
              <select
                id="btLevel"
                defaultValue="0"
                onChange={props.handleLevelChange} 
                disabled={props.gameStarted}
              >
                <option value="0">Selecione...</option>
                <option value="1">&#128564; Básico </option>
                <option value="2">&#129300; Intermédio</option>
                <option value="3">&#129324; Avançado</option>
              </select>
            </fieldset>
            <button
              type="button"
              id="btPlay"
              onClick={props.handleGameStarted}
              disabled={props.selectedLevel === "0"}
            >
              {props.gameStarted ? "Terminar Jogo" : "Começar Jogo"}
            </button>
          </form>
          <div className="form-metadata">
            <dl className={`list-item left ${gameStartedClassInstructions}`}>
              <button type="button" onClick={instructionsAlert}>Instruções de jogo</button>
            </dl>
            <dl className={`list-item left ${gameStartedClass}`}>
              <dt>Tempo de Jogo:</dt>
              <dd id="gameTime" className={`${props.classTimer}`}>{props.timer}</dd>
            </dl>
            <dl className={`list-item right ${gameStartedClass}`}>
              <dt>Pontuação TOP:</dt>
              <dd id="pointsTop">0</dd>
            </dl>
            <dl className={`list-item left ${gameStartedClass}`}>
              <dt>Pontuação:</dt>
              <dd id="points">{props.totalPoints}</dd>
            </dl>
            <div id="top10" className="right">
              <button id="btTop" onClick={props.showTop10}>Ver TOP 10</button>
            </div>
          </div>
        </section>
      );
    }
    
    export default ControlPanel;