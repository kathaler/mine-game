// App.js
import React, { useEffect, useRef } from "react";
import p5 from "p5";
import Game from "./Game";

const App = () => {
  const sketchRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      const GAME_WIDTH = window.innerWidth;
      const GAME_HEIGHT = window.innerHeight;
      const GRID_SIZE = 64;
      const SPEED = 6;

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

  return <div ref={sketchRef}></div>;
};

export default App;
