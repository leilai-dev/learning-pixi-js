let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

//Create a Pixi Application
let app = new PIXI.Application({
  width: 256, // default: 800
  height: 256, // default: 600
  antialias: true, // default: false
  transparent: false, // default: false
  resolution: 1, // default: 1
  // forceCanvas: true,
});

app.renderer.backgroundColor = 0x061639;

/* 
//If you want to make the canvas fill the entire window, you can apply this
//CSS styling:
app.renderer.view.style.position = "absolute";
app.renderer.view.style.width = window.innerWidth + "px";
app.renderer.view.style.height = window.innerHeight + "px";
app.renderer.view.style.display = "block";
*/

app.renderer.autoResize = true;
app.renderer.resize(512, 512);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);