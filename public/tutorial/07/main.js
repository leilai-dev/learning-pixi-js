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

let app = new Application();

console.log(app.renderer.width)
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
//load an image and run the `setup` function when it's done
loader
  .add("../../images/cat.png")
  .load(setup);
function setup() {
  //Create the `cat` sprite from the texture
  let cat = new Sprite(resources["../../images/cat.png"].texture);
  //Position the sprite and change its width and height
  // 화면 가운데로
  cat.x = app.renderer.width / 2;
  cat.y = app.renderer.height / 2;
  //Optionally change the width and height
  cat.width = 80;
  cat.height = 120;
  //Optionally center the sprite's anchor point
  cat.anchor.x = 0.5;
  cat.anchor.y = 0.5;

  //Rotate the sprite
  cat.rotation = 0.3;
  //You can use this alternative syntax to set the
  //sprites anchor point, scale and rotation
  /*
  cat.anchor.set(0.5, 0.5);
  cat.position.set(120, 120);
  cat.scale.set(1.5, 3);
  */

  // an
  //Add the cat to the stage
  app.stage.addChild(cat);
}