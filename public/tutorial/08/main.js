//Aliases
let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle;
//Create a Pixi Application
firebaseAnalytics.logEvent('screen_view', document.title);

let app = newApplication({
  antialiasing: true,
  transparent: false,
  resolution: 1
}
);

document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done
loader
  .add("../../images/tileset.png")
  .load(setup);

function setup() {
  //Create the `tileset` sprite from the texture
  let texture = TextureCache["../../images/tileset.png"];
  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  let rectangle = new Rectangle(192, 128, 64, 64);
  //Tell the texture to use that rectangular section
  texture.frame = rectangle;
  //Create the sprite from the texture
  let rocket = new Sprite(texture);
  //Position the rocket sprite on the canvas
  rocket.x = 32;
  rocket.y = 32;
  //Optionally use `pivot` to move the sprite's x and y position
  /*
  rocket.pivot.set(32, 32);
  rocket.rotation = 0.3;
  console.log(rocket.position)
  */
  //Add the rocket to the stage
  app.stage.addChild(rocket);
}