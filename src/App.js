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
      const GAME_WIDTH = 26;
      const GAME_HEIGHT = 14;
      const game = new Game(GAME_WIDTH, GAME_HEIGHT, GRID_SIZE, SPEED);

      p.setup = () => game.setup(p, sketchRef);
      p.windowResized = () => game.windowResized(p, sketchRef);
      p.draw = () => game.draw(p);
      p.keyPressed = () => game.keyPressed(p);
      p.keyReleased = () => game.keyReleased(p);
    };

    const myP5 = new p5(sketch, sketchRef.current);
    return () => {
      myP5.remove();
    };
  }, []);

  return (
    <div className="app-container">
      <header className="header">Header</header>
      <div className="sketch-container" ref={sketchRef}></div>
    </div>
  );
};

export default App;
