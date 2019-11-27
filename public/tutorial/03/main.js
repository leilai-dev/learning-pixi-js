let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}
PIXI.utils.sayHello(type);

const firebaseAnalytics = firebase.analytics();
firebaseAnalytics.logEvent('screen_view', document.title);

let app = new PIXI.Application();

document.body.appendChild(app.view);

console.log(app.stage);