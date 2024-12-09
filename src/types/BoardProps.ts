export interface BoardProps {
    tiles: (number | null)[];
    gridSize: number;
    tileSize: number;
    handleTileClick: (index: number) => void;
    handleShuffle: () => void;
  }

  
