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
> 
