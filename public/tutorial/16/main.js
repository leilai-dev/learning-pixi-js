//Aliases
let Application = PIXI.Application,
  Text = PIXI.Text,
  TextStyle = PIXI.TextStyle;
//Create a Pixi Application
let app = new Application({
  antialiasing: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0x6699ff
}
);
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
//1. Simple text
let message = new Text("Hello Pixi!");
message.anchor.set(0.5, 0.5);
//Position it and add it to the stage
message.position.set(app.renderer.width / 2, app.renderer.height / 2);
app.stage.addChild(message);
//2. Styled text
let style = new TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fill: "white",
  stroke: '#ff3300',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
});
let styledMessage = new Text("Styled Text", style);
styledMessage.anchor.set(0.5, 0.5);
//Position it and add it to the stage
styledMessage.position.set(app.renderer.width / 2, app.renderer.height / 2 + 60);
app.stage.addChild(styledMessage);

let korFontStyle = new TextStyle({
  fontFamily: "NanumSquareRound",
  fontSize: 48,
  fill: "white",
});
let korMessage = new Text("한글 폰트 나눔스퀘어라운드 적용", korFontStyle);
korMessage.anchor.set(0.5, 0.5);
//Position it and add it to the stage
korMessage.position.set(app.renderer.width / 2, app.renderer.height / 2 + 120);
app.stage.addChild(korMessage);
