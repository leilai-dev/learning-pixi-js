//Aliases
let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite;
//Create a Pixi Application
const firebaseAnalytics = firebase.analytics();
firebaseAnalytics.logEvent('screen_view', document.title);

let app = new Application({
  antialiasing: true,
  transparent: false,
  resolution: 1
}
);
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
loader
  .add("../../images/cat.png")
  .load(setup);
//Define any variables that are used in more than one function
let cat, state;

function setup() {
  //Create the `cat` sprite 
  cat = new Sprite(resources["../../images/cat.png"].texture);
  cat.y = 96;
  cat.vx = 0;
  cat.vy = 0;
  app.stage.addChild(cat);
  //Set the game state
  state = play;

  //Start the game loop 
  app.ticker.add(delta => gameLoop(delta));
}
function gameLoop(delta) {
  //Update the current game state:
  state(delta);
}
function play(delta) {
  //Move the cat 1 pixel to the right each frame
  cat.vx = 1
  cat.x += cat.vx;
}
