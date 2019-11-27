//Aliases
let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite;

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

const firebaseAnalytics = firebase.analytics();
firebaseAnalytics.logEvent('screen_view', document.title);

let app = new PIXI.Application();

document.body.appendChild(app.view);

//Use Pixi's built-in `loader` module to load an image
loader
  .add([
    "../../images/cat.png",
    "../../images/blob.png",
    "../../images/explorer.png"
  ])
  .on("progress", loadProgressHandler)
  .load(setup);
function loadProgressHandler(loader, resource) {
  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url);
  //If you gave your files names with the `add` method, you can access
  //them like this
  //console.log("loading: " + resource.name);
  //Display the precentage of files currently loaded
  console.log("progress: " + loader.progress + "%");
}
function setup() {
  console.log("setup");
  //Create the sprites
  let cat = new Sprite(resources["../../images/cat.png"].texture),
    blob = new Sprite(resources["../../images/blob.png"].texture),
    explorer = new Sprite(resources["../../images/explorer.png"].texture);
  //Add the sprites to the stage
  app.stage.addChild(cat);
  app.stage.addChild(blob);
  app.stage.addChild(explorer);
  //Position the sprites
  blob.position.set(82, 82);
  explorer.position.set(128, 128);

}