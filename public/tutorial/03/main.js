let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}
PIXI.utils.sayHello(type);

firebaseAnalytics.logEvent('screen_view', document.title);

let app = newPIXI.Application();

document.body.appendChild(app.view);

console.log(app.stage);