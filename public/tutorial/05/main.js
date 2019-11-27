//Aliases
let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite;

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

firebaseAnalytics.logEvent('screen_view', document.title);

let app = newApplication();

document.body.appendChild(app.view);


loader
  .add("../../images/cat.png")
  .load(setup);

function setup() {
  let cat = new Sprite(resources["../../images/cat.png"].texture);

  //Add the cat to the stage
  app.stage.addChild(cat);
}
