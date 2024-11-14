// Result.js
import React from "react";
import styles from "./Rules.module.css";
import candle from "../images/candle.gif"
const Result = ({ closeResult, isWin }) => {
  return (
    <div className={styles.rulesOverlay}>
      <div className={styles.rulesContainer}>
        <h1 className={styles.gameText}>
          {isWin ? "You won, Masha survived the night!" : "You lost, Masha died((("}
        </h1>
        {/* Show the candle image only when the player loses */}
        {!isWin && <img src={candle} alt="Candle" className={styles.candleImage} />}
        <button onClick={closeResult} className={styles.closeButton}>Try again</button>
      </div>
    </div>
  );
};

export default Result;
