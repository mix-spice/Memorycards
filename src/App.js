import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Rules from "./components/Rules";
import Result from "./components/Result";

import BIER from "../src/images/Bier.png";
import VODKA from "../src/images/Vodka.png";
import MDMA from "../src/images/MDMA.png";
import KETAMINE from "../src/images/ketamine.png";
import COCAINE from "../src/images/Cocaine.png";
import METH from "../src/images/Meth.png";
import LSD from "../src/images/lsd.jpg";
import HEROIN from "../src/images/Heroin.png";
import FENTANYL from "../src/images/fentanyl.png";
import IBUPROFEN from "../src/images/ibuprofen.png";
import WEED from "../src/images/Weed.png";
import NICOTINE from "../src/images/Nicotine.png";
import GHB from "../src/images/GHB.png";
import SPICE from "../src/images/Spice.png";
import PEIOT from "../src/images/peyot.png";
import XAN from "../src/images/xanax.png";

function App() {
  const [instances, setInstances] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [clickedImages, setClickedImages] = useState(new Set());
  const [showRules, setShowRules] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const images = [
    BIER, VODKA, MDMA, KETAMINE, COCAINE, METH, LSD, HEROIN, FENTANYL,
    IBUPROFEN, WEED, NICOTINE, GHB, SPICE, PEIOT, XAN
  ];

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const resetGame = (win = false) => {
    const shuffledImages = shuffleArray(images);
    setInstances((prevInstances) =>
      prevInstances.map((instance, index) => ({
        ...instance,
        src: shuffledImages[index % shuffledImages.length],
      }))
    );
    setUserScore(0);
    setClickedImages(new Set());
    setShowResult(true);
    setIsWin(win);
  };

  useEffect(() => {
    const shuffledImages = shuffleArray(images);
    setInstances([
      { id: 1, name: "BIER", src: shuffledImages[0] },
      { id: 2, name: "VODKA", src: shuffledImages[1] },
      { id: 3, name: "MDMA", src: shuffledImages[2] },
      { id: 4, name: "KETAMINE", src: shuffledImages[3] },
      { id: 5, name: "COCAINE", src: shuffledImages[4] },
      { id: 6, name: "METHAMPHETAMINE", src: shuffledImages[5] },
      { id: 7, name: "LSD", src: shuffledImages[6] },
      { id: 8, name: "HEROIN", src: shuffledImages[7] },
      { id: 9, name: "FENTANYL", src: shuffledImages[8] },
      { id: 10, name: "IBUPROFEN", src: shuffledImages[9] },
      { id: 11, name: "WEED", src: shuffledImages[10] },
      { id: 12, name: "NICOTINE", src: shuffledImages[11] },
      { id: 13, name: "XANAX", src: shuffledImages[12] },
      { id: 14, name: "PEIOT", src: shuffledImages[13] },
      { id: 15, name: "SPICE", src: shuffledImages[14] },
      { id: 16, name: "GHB", src: shuffledImages[15] },
    ]);
  }, []);

  const handleImageClick = (clickedSrc) => {
    if (clickedImages.has(clickedSrc)) {
      resetGame(false);
      return;
    }

    setClickedImages((prev) => new Set(prev).add(clickedSrc));

    const shuffledImages = shuffleArray(images);
    setInstances((prevInstances) =>
      prevInstances.map((instance, index) => ({
        ...instance,
        src: shuffledImages[index % shuffledImages.length],
      }))
    );

    const newScore = userScore + 1;
    setUserScore(newScore);

    if (newScore === 16) {
      resetGame(true);
    }
  };

  const handlePlayClick = () => {
    // Toggle visibility if needed, or just set up the audio play functionality directly
    setShowPlayer(true);
  
    // Use YouTube's API to play without showing the player
    const iframe = document.createElement("iframe");
    iframe.style.display = "none"; // Hide iframe
    iframe.src = "https://www.youtube.com/embed/BVFJCRl_P2c?autoplay=1&controls=0&modestbranding=1&showinfo=0&iv_load_policy=3&rel=0";
    iframe.allow = "autoplay";
    document.body.appendChild(iframe);
  
    // Optionally, you can remove the iframe after a short delay if autoplay works
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 5000); // 5 seconds is usually enough for autoplay to start
  };
  return (
    <div className={styles.mainContainer}>
      <header>
        <div>
          <h1>Score 16 to Win</h1>
          <h1>Your Score: {userScore}</h1>
          {showRules && <Rules closeRules={() => setShowRules(false)} />}
          {showResult && <Result closeResult={() => setShowResult(false)} isWin={isWin} />}
          <button className={styles.playButton} onClick={handlePlayClick}>
        Play Junkie
      </button>
      {showPlayer && (
        <div className={styles.videoPlayerContainer}>
         <iframe
            title="YouTube Audio Player"
            src="https://www.youtube.com/embed/BVFJCRl_P2c?autoplay=1&controls=0&modestbranding=1&showinfo=0&iv_load_policy=3&rel=0"
            frameBorder="0"
            style={{ display: "none" }} // Hide the video player
            allow="autoplay"
          ></iframe>
        </div>
      )}
        </div>
        
      </header>

      <div className={styles.cardsContainer}>
        {instances.map((instance) => (
          <div key={instance.id} className={styles[`${instance.name.toLowerCase()}Card`]}>
            <button onClick={() => handleImageClick(instance.src)}>
              <img src={instance.src} className={styles.images} alt={instance.name} />
            </button>
          </div>
        ))}
      </div>

     
    </div>
  );
}

export default App;
