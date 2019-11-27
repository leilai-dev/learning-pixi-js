let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

firebaseAnalytics.logEvent('screen_view', document.title);

let app = newPIXI.Application();

document.body.appendChild(app.view);
