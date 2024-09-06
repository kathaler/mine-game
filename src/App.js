// App.js
import React, { useEffect, useRef } from "react";
import p5 from "p5";
import Game from "./Game";
import "./styles.css";

const App = () => {
  const sketchRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      const GRID_SIZE = 64;
      const SPEED = 8;

      // const GAME_WIDTH = Math.floor(document.documentElement.clientWidth/GRID_SIZE);
      // const GAME_HEIGHT = Math.floor(document.documentElement.clientHeight/GRID_SIZE);

      const GAME_WIDTH = 20;
      const GAME_HEIGHT = 10;
      const game = new Game(GAME_WIDTH, GAME_HEIGHT, GRID_SIZE, SPEED);

      p.setup = () => game.setup(p);
      p.windowResized = () => game.windowResized(p);
      p.draw = () => game.draw(p);
      p.keyPressed = () => game.keyPressed(p);
      p.keyReleased = () => game.keyReleased(p);
    };

    const myP5 = new p5(sketch, sketchRef.current);
    return () => {
      myP5.remove();
    };
  }, []);

  return <div ref={sketchRef} id="sketch-container"></div>;
};

export default App;
