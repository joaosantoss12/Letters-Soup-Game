import React from "react";
import "./game-over-modal.css";
import { Footer, Top10 } from "../imports";
import { useEffect } from "react";

function GameOverModal(props) {
  const modalClass = `w3-modal ${props.isGameOverModalOpen ? "show-modal" : ""}`;

  return (
    <div id="modal-gameOver" className={modalClass}>
      <div className="w3-modal-content w3-card-4 w3-animate-zoom estilos">
        <header>
          <span
            className="w3-button w3-display-topright closeModal"
            data-modalid="gameOver"
            onClick={props.handleModalClose}
          >
            &times;
          </span>
          <div>Jogo Terminado</div>
        </header>
        <div className="info" id="messageGameOver">
          <p>Pontuação: {props.totalPoints}</p>
          <p className="newTop10">Parabéns! Entrou para o TOP10!</p>
        </div>
        <div className="info" id="nickname">
          Nome:
          <input
            type="text"
            id="inputNick"
            size="16"
            placeholder="Introduza o seu nome"
          />
          <button id="okTop">ok</button>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default GameOverModal;