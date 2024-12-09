import { config } from '../config/GameConfig';
import { Game } from '../game/GameClass.ts';
import React, { useState } from 'react';
import '../styles/Board.css';
import '../styles/Tile.css';

const Board: React.FC = () => {
  const { gridSize, shuffleMoves } = config; // Import constants from the config file
  const [tileManager, setTileManager] = useState(new Game(gridSize, shuffleMoves));
  const [isComplete, setIsComplete] = useState(false);

  const handleTileClick = (index: number) => {
    const tileMoved = tileManager.moveTile(index);
    if (tileMoved) {
      setTileManager(new Game(gridSize, shuffleMoves, [...tileManager.tiles])); // Update tile manager with new state

      if (tileManager.isSolved()) {
        setIsComplete(true);
      }
    }
  };

  const handleShuffle = () => {
    tileManager.shuffleTiles();
    setTileManager(new Game(gridSize, shuffleMoves, [...tileManager.tiles])); // Update tile manager
    setIsComplete(false);
  };

  return (
    <div className="board">
      {isComplete && <div className="win-message">🎉 Congrats, you win:O 🎉</div>}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {tileManager.tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile === null ? 'empty' : ''}`}
            onClick={() => tile !== null && handleTileClick(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      <button className="shuffle-button" onClick={handleShuffle}>
        Shuffle
      </button>
    </div>
  );
};

export default Board;