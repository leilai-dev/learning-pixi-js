//Aliases
let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite;
//Create a Pixi Application
let app = new Application({
  antialiasing: true,
  transparent: false,
}
);
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
loader
  .add("../../images/cat.png")
  .load(setup);
//Define any variables that are used in more than one function
let cat;
function setup() {
  //Create the `cat` sprite 
  cat = new Sprite(resources["../../images/cat.png"].texture);
  cat.y = 96;
  cat.vx = 0;
  cat.vy = 0;
  app.stage.addChild(cat);

  //Start the game loop 
  app.ticker.add(delta => gameLoop(delta));
}
function gameLoop(delta) {
  //Update the cat's velocity
  cat.vx = 1;
  cat.vy = 1;
  //Apply the velocity values to the cat's 
  //position to make it move
  cat.x += cat.vx;
  cat.y += cat.vy;
}