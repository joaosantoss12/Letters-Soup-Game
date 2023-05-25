import React from "react";
import "./top10.css";
import { useEffect } from "react";

let topGamers = []; // Se for dentro do GameOverModal será sempre incializado vazio quando
// for chamado, ou seja, quando !gameStarted

function Top10(props) {
  useEffect(() => {
    if (props.top10) {
      showTop10();
    }
  }, [props.top10]);

  const showTop10 = ()  => {
    const infoTop = document.getElementById("infoTop");
    const div = document.getElementById("top10Table");
    topGamers.forEach((gamer) => {
      div.firstChild.textContent = gamer.nickname;
      div.lastChild.textContent = gamer.points;

      infoTop.appendChild(div.cloneNode(true));
      console.log("YAY");
    });
  }

  const saveTop10 = () => {
    let nickname = document.getElementById("inputNick").value;
    const newPoints = { nickname: nickname, points: props.totalPoints };

    let userExists = false;

    topGamers.forEach((gamer) => {
      if (gamer.nickname === nickname && gamer.points < props.totalPoints) {
        gamer.points = props.totalPoints;
        userExists = true;
      }
    });

    if (userExists === false) {
      if (nickname != "") topGamers.push(newPoints);
    }

    topGamers.sort(function (a, b) {
      return b.points - a.points;
    });

    if (topGamers.length > 10) {
      if (nickname != "") topGamers.pop();
    }

    console.log(topGamers);
    if (nickname != "") {
      document.getElementById("inputNick").value = "";
      props.handleModalClose();
    }
  };
}
export default Top10;
