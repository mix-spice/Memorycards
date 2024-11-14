import React from "react";
import styles from "./Rules.module.css";

const Rules = ({ closeRules }) => {
  return (
    <div className={styles.rulesOverlay}>
      <div className={styles.rulesContainer}>
        <h1 class={styles.gameText}>WHAT MASHA USED YESTERDAY???</h1>
        <p  class={styles.gameText}>Click on each image once, if you click on one image twice, Masha gets OD</p>
        <button onClick={closeRules} className={styles.closeButton}>Start Game</button>
      </div>
    </div>
  );
};

export default Rules;
