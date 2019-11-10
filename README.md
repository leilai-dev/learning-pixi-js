# Overview
- Firebase Hosting 활용
- [kittykatattack/learningPixi: A step-by-step introduction to making games and interactive media with the Pixi.js rendering engine.] (https://github.com/kittykatattack/learningPixi) 튜토리얼 내용 정리하기

<!-- ## 프로젝트 구성 -->

# 튜토리얼 내용 정리
## Introduction
HTML5 환경의 게임 개발에 대한 설명, pixi.js에 대한 간략 소개

### 추가적으로 정리가 필요한 & 고려해볼만한 내용
- Pixi vs Phaser
- Canvas vs WebGL
- HTML5 PWA vs Cross Platform


## 1. Setting up
최신 릴리즈의 pixi.js 받기
> https://github.com/pixijs/pixi.js/releases

최초 pixi.js v5로 진행하려 했으나 로컬 환경에서 (Uncaught Error: WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.) 해당 에러 발생, Live server VS Code 플러그인 사용 중인데 테스트가 힘들어서 그냥 v4로 진행
현재 노트북이 Chrome 하드웨어 가속 기능을 끈 상태라 WebGL 렌더링이 안되는 것으로 예상
```
PIXI.utils.isWebGLSupported() 실행이 안된다?
```

콘솔창에서 PixiJS 이니셜라이징 로그를 확인하기


## 2. Creating the Pixi Application and stage
> http://pixijs.download/release/docs/PIXI.Application.html
```
// Initializing app
let app = new PIXI.Application({
  width: 256, // default: 800
  height: 256, // default: 600
  antialias: true, // default: false
  transparent: false, // default: false
  resolution: 1, // default: 1
  // forceCanvas: true,
  // ...
});
```


## 3. Pixi sprites
> http://pixijs.download/release/docs/PIXI.Application.html#stage
> http://pixijs.download/release/docs/PIXI.Container.html

```
app.stage
// app.stage.addChild(Sprite);
```

### Sprite class 활용 예 3가지
- Single image file
- sub-iamge on a tileset
- texture atlas (JSON file)


## 4. Sprite From Image
> http://pixijs.download/release/docs/PIXI.utils.html#.TextureCache

이미지 리소스(Texture, ...) 캐싱 > Sprite 생성 > 화면에 그리기

PIXI.loader 객체에서 아마 캐싱하는듯?

### 추천 방법
> https://www.html5gamedevs.com/topic/16019-preload-all-textures/?tab=comments#comment-90907 참고
```
PIXI.loader
  .add("images/anyImage.png") // .add(["images.png", ..."]) 배열 형태 가능
  .load(setup);

function setup() {
  let sprite = new PIXI.Sprite(
    PIXI.loader.resources["images/anyImage.png"].texture
  );

  app.stage.addChild(sprite);
}
```

### Javascript Image 객체로부터 스프라이트 생성시
```
let base = new PIXI.BaseTexture(anyImageObject),
    texture = new PIXI.Texture(base),
    sprite = new PIXI.Sprite(texture);
```
Canvas 엘리먼트에서도 받아올 수 있음
```
let base = new PIXI.BaseTexture.fromCanvas(anyCanvasElement),
```

## 5. Aliases
```
//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;
```
코드 가독성 향상을 위해.


## 6. Loading Progress
### PIXI.loader.add() 이미지 리소스 이름 지정 가능
```
PIXI.loader
  .add("catImage", "images/cat.png")
  .load(setup);

let cat = new PIXI.Sprite(PIXI.loader.resources.catImage.texture);
```
그러나 웬만하면 쓰지 않는 것을 추천하고 있음

### Monitoring load progress
로더 객체에서 onProgress 이벤트를 받아서 구현 가능
> http://pixijs.download/release/docs/PIXI.Loader.html#onProgress
```
PIXI.loader
  .add([
    "images/one.png",
    "images/two.png",
    "images/three.png"
  ])
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler() {
  console.log("loading"); 
}

function setup() {
  console.log("setup");
}
```
콘솔 출력 결과는
```
loading
loading
loading
setup
```

이벤트 핸들러에서 파라미터 추가하여 로딩 진행현황 표시하기 
```
function loadProgressHandler(loader, resource) { 
  console.log("loading: " + resource.url); 

  console.log("progress: " + loader.progress + "%"); 

  // add()에서 리소스 name 프로퍼티 설정한 경우
  //console.log("loading: " + resource.name);
}
```

그 외 추가 정보
> https://github.com/kittykatattack/learningPixi#more-about-pixis-loader


## 7. Position And Rotation
좌상단 (0, 0) 기준,
```
function setup() {

  //Create the `cat` sprite
  let cat = new Sprite(resources["images/cat.png"].texture);

  //Change the sprite's position
  cat.x = 96;
  cat.y = 96;
  // cat.position.set(120, 120);

  //Change the sprite's size
  cat.width = 80;
  cat.height = 120;
  // cat.scale.set(1.5, 3);

  //Add the cat to the stage so you can see it
  app.stage.addChild(cat);
}
```

### Rotation 참고사항
anchor와 pivot 둘 중 아무거나, 0~1 정규화인지, 픽셀 기준 이동인지 차이
- anchor shifts the origin point of the sprite's image texture, using a 0 to 1 **normalized** value.
- pivot shifts the origin of the sprite's x and y point, using **pixel** values.
```
cat.anchor.x = 0.5;
cat.anchor.y = 0.5;
// cat.anchor.set(0.5, 0.5);
// cat.pivot.set(32, 32); // image size: 64x64일 경우 둘 다 이미지 중앙 기준
```
> https://github.com/kittykatattack/learningPixi#rotation


## 8. Sprite From Tileset
캐싱된 이미지에서 스프라이트 영역을 PIXI.Rectangle 객체 생성해서 지정하기
```
  let texture = TextureCache["images/tileset.png"];
  let rectangle = new Rectangle(192, 128, 64, 64);
  texture.frame = rectangle;
  let rocket = new Sprite(texture);

  //Optionally use `pivot` to move the sprite's x and y position
  /*
  rocket.pivot.set(32, 32);
  rocket.rotation = 0.3;
  console.log(rocket.position)
  */

  app.stage.addChild(rocket);
```


## 9. SpriteFromTextureAtlas
별도의 텍스쳐 패커는 없음
> [TexturePacker - Create Sprite Sheets for your game!] (https://www.codeandweb.com/texturepacker)

위와 같은 프로그램을 사용하여 json데이터로 뽑아낸 아틀라스 이미지를 활용
```
// JSON 양식
"blob.png":
{
	"frame": {"x":55,"y":2,"w":32,"h":24},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":32,"h":24},
	"sourceSize": {"w":32,"h":24},
	"pivot": {"x":0.5,"y":0.5}
},
```
json 파일을 로드시 add, 키값으로 받아오는 듯?

### setup() 내부에서 이미지 로드시, 3가지 방법
1. TextureCache
```
let texture = TextureCache["frameId.png"], // TextureCache[KEY];
sprite = new Sprite(texture);
app.stage.addChild(sprite);
```
2. PIXI.loader.resources
loader에서 add한 아틀라스 json정보에 대해 아래와 같이 활용 가능
```
let sprite = new Sprite(
  resources["images/treasureHunter.json"].textures["frameId.png"]
);
app.stage.addChild(sprite);
```
3. 아틀라스 id로 alias call
```
let id = PIXI.loader.resources["images/treasureHunter.json"].textures; 
let sprite = new Sprite(id["frameId.png"]);
app.stage.addChild(sprite);
```

그리드 형식으로 표현될 경우 기준 타일 사이즈를 상수로 선언해 놓는것도 괜찮을 듯


## 10. MovingSprites
PIXI.Application.ticker 에서 gameLoop(delta) 콜백 활용
> http://pixijs.download/release/docs/PIXI.Application.html#ticker

You don't have to use Pixi's ticker to create a game loop. If you prefer, just use requestAnimationFrame, like this:
```
function gameLoop() {

  //Call this `gameLoop` function on the next screen refresh
  //(which happens 60 times per second)
  requestAnimationFrame(gameLoop);

  //Move the cat
  cat.x += 1;
}

//Start the loop
gameLoop();
```


## 11. VelocityVariables
등속도 운동?
```
function gameLoop(delta){
  //Update the cat's velocity
  cat.vx = 1;
  cat.vy = 1;

  //Apply the velocity values to the cat's 
  //position to make it move
  cat.x += cat.vx;
  cat.y += cat.vy;
}
```


## 12. GameStates
이전 11 내용을 state 변수 추가해서 gameState/gameLoop 관리하기
```
let cat, state;
...
function setup() {
  // ...
  //Set the game state
  state = play;
 
  //Start the game loop 
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){
  //Update the current game state:
  state(delta);
}

// play state에서 수행할 내용을 분리
function play(delta) { 
  //Move the cat 1 pixel to the right each frame
  cat.vx = 1
  cat.x += cat.vx;
}
```


## 13. KeyboardMovement
이벤트 핸들러가 미리 정의된게 아예 없나? 터치/클릭 이벤트 고려해보기
```
//The `keyboard` helper function
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };
  //The `upHandler`
  key.upHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };
  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

function setup() {
  ... // 리소스 초기화 
  //Capture the keyboard arrow keys
  let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

  // 각 키 이벤트 down/up의 상세 내용 정의
  left.press = () => {
    cat.vx = -5;
    cat.vy = 0;
  };
  left.release = () => {
    if (!right.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };
  ...
  state = play;
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  //Update the current game state:
  state(delta);
}

function play(delta) {
  //Use the cat's velocity to make it move
  cat.x += cat.vx;
  cat.y += cat.vy
}
```

