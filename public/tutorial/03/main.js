let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}
PIXI.utils.sayHello(type);

let app = new PIXI.Application();

document.body.appendChild(app.view);

console.log(app.stage);