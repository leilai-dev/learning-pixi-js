firebaseAnalytics.logEvent('screen_view', document.title);

// Settings that the classes need to make use of before the game is initialized
let settings = {
  gridSize: 9,
  bombCount: 10,
  squareSize: 32
}

// An array of colours because PIXI is awkward and it saves me having ugly code
let colours = {
  black: 0x000000,
  gray: 0x999999,
  lightgray: 0xDDDDDD,
  purple: 0x740574,
  red: 0XFC0303,
  green: 0x167D32,
  white: 0xFFFFFF
}

// The map class the inherits from the PIXI.Graphics class
class Map extends PIXI.Graphics {
  constructor(limit) {
    super();
    this.limit = limit;
    this.x = 0;
    this.y = 0;
    this.draw();
    this.setBombs();
  }

  setBombs() {
    let chosenTiles = [];
    // We have to temporarily remove the tile from the children array to make sure we dont choose the same tile twice
    // Doing it this way round stops from iterating again and again if it keeps picking tiles that are already chosen
    for (let i = 0; i < settings.bombCount; i++) {
      let randomIndex = Math.floor(Math.random() * this.children.length);
      this.children[randomIndex].bomb = true;
      chosenTiles.push(this.children.splice(randomIndex, 1)[0]);
    }
    // Now we just put them back as if nothing ever happened now that they're happy little bombs!
    chosenTiles.forEach(tile => {
      this.children.push(tile);
    });
  }

  draw() {
    // This renders the entire map
    for (let x = 0; x < this.limit; x++) {
      for (let y = 0; y < this.limit; y++) {
        let startPointX = x * settings.squareSize;
        let startPointY = y * settings.squareSize;
        this.addChild(new Tile(startPointX, startPointY));
      }
    }
  }
}

class Tile extends PIXI.Graphics {
  constructor(posX, posY) {
    super();
    this.interactive = true; // Sets the graphic to be interactive.
    this.x = posX;
    this.y = posY;
    this.idX = posX / settings.squareSize;
    this.idY = posY / settings.squareSize;
    this.playState = 0; // 0 = Unclicked, 1 = cleared, 2 = Flagged.
    this.bomb = false;
    this.draw(colours.gray);
    this.click = () => { game.click(this); } // Sets the click function from PIXI.Graphics to run my click function.
  }

  draw(colour) {
    // Renders the tile.
    this.moveTo(-1, 0)
      .beginFill(colour)
      .lineStyle(1, colours.black)
      .lineTo(0 + settings.squareSize, 0)
      .lineTo(settings.squareSize, settings.squareSize)
      .lineTo(0, settings.squareSize)
      .lineTo(0, 0);
  }

  countNearbyBombs() {
    let bombCount = 0;
    // Counts all the bombs around the tile.
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        let tile = game.getTileByPosition(this.idX + x, this.idY + y);
        if (tile && tile != this) {
          if (tile.bomb == true) {
            bombCount++;
          }
        }
      }
    }
    return bombCount;
  }

  flag() {
    if (this.playState == 2) {
      this.playState = 0;
      this.children.shift();
      game.flagsPlaced--;
    } else {
      // Checks to see if the player has already marked the maximum amount of bombs or not.
      if (game.flagsPlaced < settings.bombCount) {
        this.playState = 2;
        let flag = new PIXI.Text('F', {
          fontFamily: 'sans-serif',
          fontSize: settings.squareSize - 10,
          fill: colours.red
        });
        flag.anchor.set(0.5);
        flag.x = settings.squareSize / 2;
        flag.y = settings.squareSize / 2;
        this.addChild(flag);
        game.flagsPlaced++;
      }
    }
    game.updateFlagText();
  }

  blowUp(win) {
    // Changes the colour of the tile to either red or green depending on whether the player has won or lost.
    this.clear();
    if (!win) {
      this.draw(colours.red);
    } else {
      this.draw(colours.green);
    }
  }

  tileClear() {
    // Works out whether the tile can be cleared or not.
    if (this.playState == 0) {
      // Makes sure the tile isnt a bomb.
      if (!this.bomb) {
        // Clears the tile and changes its colour.
        game.clearedTotal++;
        this.playState = 1;
        this.clear();
        this.draw(colours.lightgray);
        // Checks to see if there are any bombs in the area, if so adds a count to the tile.
        let bombs = this.countNearbyBombs();
        if (bombs > 0) {
          let bombText = new PIXI.Text(bombs, {
            fontFamily: 'sans-serif',
            fontSize: settings.squareSize - 10,
            fill: 0x000000
          });
          this.addChild(bombText);
          // Positions the text in the center of the tile.
          bombText.anchor.set(0.5);
          bombText.x = settings.squareSize / 2;
          bombText.y = settings.squareSize / 2;
        } else {
          // Triggers every tile around this tile to try and clear if it can.
          for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
              let tile = game.getTileByPosition(this.idX + x, this.idY + y);
              // Skips over itself because theres no need.
              if (tile && tile != this) {
                tile.tileClear();
              }
            }
          }
        }
      } else {
        // If its a bomb end the game.
        game.end();
      }
    }
  } s

}

// The game object.
let game = {
  // The actual PIXI application
  pixi: new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: colours.purple,
    resolution: 1
  }),
  // Some extra totals/settings that are only needed once the game is initialized
  clearedTotal: 0,
  playEnabled: true,
  flagsPlaced: 0,
  // Initializes the map.
  map: new Map(settings.gridSize),
  // Initializes flag text
  flagText: new PIXI.Text('Flags: ' + settings.bombCount, {
    fontFamily: 'sans-serif',
    fontSize: settings.squareSize - 10,
    fill: colours.white
  }),
  // Initializes play again button 
  playAgainButton: null,
  initPlayAgainButton() {
    this.playAgainButton = new PIXI.Graphics().beginFill(colours.white).lineStyle(2, colours.black).drawRect(0, 0, 150, 30);
    let text = new PIXI.Text('Play Again', {
      fontFamily: 'sans-serif',
      fontSize: 18,
      fill: colours.black
    });
    text.anchor.set(0.5);
    text.x = this.playAgainButton.width / 2;
    text.y = this.playAgainButton.height / 2 - 3;
    this.playAgainButton.addChild(text);
    this.playAgainButton.interactive = true;
    this.playAgainButton.click = () => {
      game.restart();
    }
    this.playAgainButton.visible = false;
  },
  // Function for getting a tile by its position.
  getTileByPosition(x, y) {
    let correctTile = false;
    // Runs through every tile on the map.
    this.map.children.forEach((tile) => {
      if (tile.idX == x && tile.idY == y) {
        correctTile = tile;
        return;
      }
    });
    return correctTile;
  },
  positionStage() {
    // Sets the stage in the center of the screen instead of top left, this works better in my head when doing coordinates.
    this.pixi.stage.x = window.innerWidth / 2;
    this.pixi.stage.y = window.innerHeight / 2;
    this.map.x = -this.map.width / 2;
    this.map.y = -this.map.height / 2;
  },
  rightClick(pos) {
    // Got to have a fancy rightclick function because its not properly supported
    let xTileID = Math.floor(((pos.x - (window.innerWidth / 2)) / settings.squareSize) + settings.gridSize / 2);
    let yTileID = Math.floor(((pos.y - (window.innerHeight / 2)) / settings.squareSize) + settings.gridSize / 2);
    // Checks the number is within the bounds of the grid
    if (xTileID < settings.gridSize && yTileID < settings.gridSize) {
      // Makes sure the value is actually above 0.
      if (xTileID >= 0 && yTileID >= 0) {
        // Clicks the tile!
        this.click(this.getTileByPosition(xTileID, yTileID), true);
      }
    }
  },
  click(tile, right = false) {
    // Makes sure the game hasnt ended.
    if (this.playEnabled) {
      if (!right) {
        tile.tileClear();
      } else {
        // Toggle the flag on whatever tile providing that it is not already cleared.
        if (tile.playState != 1) {
          tile.flag();
        }
      }
    }
    // You win if you've won the game... Self explanatory.
    if (this.clearedTotal == ((settings.gridSize * settings.gridSize) - settings.bombCount)) {
      this.end(true);
    }
  },
  end(win = false) {
    // Ends the game.
    this.playEnabled = false;
    this.map.children.forEach(tile => {
      if (tile.bomb) {
        tile.blowUp(win);
      }
    });
    this.playAgainButton.visible = true;
  },
  updateFlagText() {
    let flagsLeft = settings.bombCount - this.flagsPlaced;
    this.flagText.text = 'Flags: ' + flagsLeft;
  },
  restart() {
    this.pixi.stage.removeChild(this.map);
    this.map = null;
    this.map = new Map(settings.gridSize);
    this.pixi.stage.addChild(this.map)
    this.positionStage();
    this.flagsPlaced = 0;
    this.updateFlagText();
    this.clearedTotal = 0;
    this.playEnabled = true;
    this.playAgainButton.visible = false;
  },
  init() {
    // Adds the canvas to the body.
    document.body.appendChild(this.pixi.renderer.view);
    this.positionStage();
    // Adds an event listener that automatically resizes the renderer if the screen size were to change.
    window.addEventListener('resize', () => {
      this.pixi.renderer.resize(window.innerWidth, window.innerHeight);
      this.positionStage();
    });
    disableContextMenu(this.pixi.renderer.view);
    this.pixi.stage.addChild(this.map);
    this.pixi.stage.addChild(this.flagText);
    this.initPlayAgainButton();
    this.pixi.stage.addChild(this.playAgainButton);
    this.playAgainButton.x = -this.playAgainButton.width / 2;
    this.playAgainButton.y = this.map.height / 2 + 5;
    this.flagText.x = -this.map.width / 2;
    this.flagText.y = -this.map.height / 2 - this.flagText.height - 5;
  }
}

game.init();

// Disable context menu
function disableContextMenu(canvas) {
  canvas.addEventListener('contextmenu', (e) => {
    game.rightClick({ x: e.x, y: e.y });
    e.preventDefault();
  });
}