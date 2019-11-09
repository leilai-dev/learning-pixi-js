let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

let app = new PIXI.Application();

document.body.appendChild(app.view);

let texture = PIXI.utils.TextureCache["../../images/cat.png"];
let sprite = new PIXI.Sprite(texture);
console.log(sprite);


PIXI.loader
  .add("../../images/cat.png")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

  //Create the cat sprite
  let cat = new PIXI.Sprite(PIXI.loader.resources["../../images/cat.png"].texture);

  //Add the cat to the stage
  app.stage.addChild(cat);
}
