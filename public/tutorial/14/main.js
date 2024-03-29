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
//load a JSON file and run the `setup` function when it's done
loader
  .add("../../images/animals.json")
  .load(setup);
function setup() {
  //There are three ways to make sprites from textures atlas frames
  //Make the three animal sprites
  //Create an alias for the texture atlas frame ids
  let id = resources["../../images/animals.json"].textures;
  //The cat
  let cat = new Sprite(id["cat.png"]);
  cat.position.set(16, 16);
  //The hedgehog
  let hedgehog = new Sprite(id["hedgehog.png"]);
  hedgehog.position.set(32, 32);
  //The tiger
  let tiger = new Sprite(id["tiger.png"]);
  tiger.position.set(64, 64);
  //Group the animals
  let animals = new Container();
  animals.addChild(cat);
  animals.addChild(hedgehog);
  animals.addChild(tiger);
  //Add the `animals` group to the stage
  app.stage.addChild(animals);
  //Change the position of the group
  animals.position.set(64, 64);
  //Optionally change the group's width and height
  //animals.width = 200;
  //animals.height = 200;
  //Find out what the `animal` groups's children are
  console.log(animals.children);
  //Displays: [Sprite, Sprite, Sprite]
  //Find out what the group's position and size is
  console.log(animals.position);
  //Displays: Point{x: 0, y: 0 ...}
  console.log(animals.width);
  //Displays: 112
  console.log(animals.height);
  //Displays: 112 
  //Find the cat's local position
  console.log(cat.x);
  //Displays: 16

  //Find the cat's global position
  console.log(animals.toGlobal(cat.position));
  //Displays: Point{x: 80, y: 80...};
  //Use `getGlobalPosition` to find the sprite's 
  //global position
  console.log("Tiger world x: " + tiger.getGlobalPosition().x);
  console.log("Tiger world y: " + tiger.getGlobalPosition().y);
  //Use `toLocal` to find a sprite's position relative to another sprite
  console.log("Tiger local x: " + tiger.toLocal(tiger.position, hedgehog).x);
  console.log("Tiger local y: " + tiger.toLocal(tiger.position, hedgehog).y);


  //If you don't know what group the sprite belongs to, use the
  //sprite's `parent` property.
  console.log(cat.parent.toGlobal(cat.position));
}
