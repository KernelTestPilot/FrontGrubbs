export class Game {
    gridSize: number;
    shuffleMoves: number;
    tiles: (number | null)[];

    constructor(gridSize: number, shuffleMoves: number, tiles: (number | null)[] | null = null) {
        this.gridSize = gridSize;
        this.shuffleMoves = shuffleMoves;
        this.tiles = tiles || this.generateInitialTiles(); // Use provided tiles or generate new board 

        if (!tiles) {
            this.shuffleTiles(); // If no tiles provided shuffle
        }
    }

    /*
     *Generate the start array with one null slot, ex in a 4x4 grid: [1, 2, 3, ..., 15, null].
    */
    generateInitialTiles(): (number | null)[] {
        const tiles: (number | null)[] = [...Array(this.gridSize * this.gridSize - 1).keys()].map((i) => i + 1);
        tiles.push(null); // Add the empty tile 
        return tiles;
      }

    /**
     * Shuffeling the array by making random moves.
    */
    shuffleTiles(): void {
        const size = this.gridSize;
        const directions = [
            [-1, 0], // Up
            [1, 0],  // Down
            [0, -1], // Left
            [0, 1],  // Right
        ];

        let emptyIndex = this.tiles.indexOf(null);
        //shuffle moves based on config settings
        for (let i = 0; i < this.shuffleMoves; i++) {
            const emptyRow = Math.floor(emptyIndex / size); // Row of the null array slot.
            const emptyCol = emptyIndex % size;// Column of the null array slot.

            // Filter valid moves to ensure they stay within grid boundaries.
            const validMoves = directions.filter(([dx, dy]) => {
                const newRow = emptyRow + dx;
                const newCol = emptyCol + dy;
                return newRow >= 0 && newRow < size && newCol >= 0 && newCol < size;
            });

            // Choose a random valid move.
            const [dx, dy] = validMoves[Math.floor(Math.random() * validMoves.length)];
            const newRow = emptyRow + dx;
            const newCol = emptyCol + dy;

            // Calculate the index of the new position of the null array slot.
            const newEmptyIndex = newRow * size + newCol;

            // Swap the null array slot with the target array slot.
            [this.tiles[emptyIndex], this.tiles[newEmptyIndex]] = [
                this.tiles[newEmptyIndex],
                this.tiles[emptyIndex],
            ];
            //Update the null array slot
            emptyIndex = newEmptyIndex;
        }
    }

    isSolved(): boolean {
        for (let i = 0; i < this.tiles.length - 1; i++) {
            if (this.tiles[i] !== i + 1) return false; // Check if each array slot is is in its correct position.
        }
        return true;
    }

    moveTile(index:number): boolean {
        const size = this.gridSize;
        const emptyIndex = this.tiles.indexOf(null); // Find the index of the null array slot.

        const [emptyRow, emptyCol] = [
            Math.floor(emptyIndex / size),// Row of the null array slot.
            emptyIndex % size,  //Column of the null array slot.
        ];
        const [clickedRow, clickedCol] = [
            Math.floor(index / size), //Row of clicked array slot
            index % size,   //Column of clicked array slot
        ];
         // Check if the clicked array slot is next to the null array slot.
        const isAdjacent =
            (emptyRow === clickedRow && Math.abs(emptyCol - clickedCol) === 1) ||
            (emptyCol === clickedCol && Math.abs(emptyRow - clickedRow) === 1);

        if (isAdjacent) {
            //swap positions
            [this.tiles[emptyIndex], this.tiles[index]] = [
                this.tiles[index],
                this.tiles[emptyIndex],
            ];
            return true; //True if move was successful
        }
        return false; //False if not
    }
}