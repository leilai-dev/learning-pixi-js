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