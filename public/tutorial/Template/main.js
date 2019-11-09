let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

let app = new PIXI.Application();

document.body.appendChild(app.view);
