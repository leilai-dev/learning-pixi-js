let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

const firebaseAnalytics = firebase.analytics();
firebaseAnalytics.logEvent('screen_view', document.title);

let app = new PIXI.Application();

document.body.appendChild(app.view);
