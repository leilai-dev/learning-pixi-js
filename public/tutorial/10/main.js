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
  width: 256,
  height: 256,
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
let cat;
function setup() {
  //Create the `cat` sprite 
  cat = new Sprite(resources["../../images/cat.png"].texture);
  cat.y = 96;
  app.stage.addChild(cat);

  //Start the game loop by adding the `gameLoop` function to
  //Pixi's `ticker` and providing it with a `delta` argument.
  //Any functions added to the `ticker` will be called 60 times per second.
  //This means that the `gameLoop` function (defined in the code ahead) will be updated
  //60 times per second. 
  app.ticker.add(delta => gameLoop(delta));
}
function gameLoop(delta) {
  //Move the cat 1 pixel 
  cat.x += 1;
  //The `delta` value represents the amount of fractional lag between frames.
  //You can optionally add it to the cat's position, to make the cat's animation
  //independent of the frame rate. Whether or not you choose to add it is largely an 
  //aestheic choice, and the difference in the effect will only really be noticable
  //if your animation is struggling to keep up with a consistent 60 frames per second
  //display rate.
  //cat.x += 1 + delta;
}