var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount=0;
var gameState
var allPlayers
var car1,car2
var cars
var obstacles,fuels,coins
function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1img=loadImage("assets/car1.png")
  car2img=loadImage("assets/car2.png")
  trackimg=loadImage("assets/track.jpg")
  obstacle1Image=loadImage("assets/obstacle1.png")
  obstacle2Image=loadImage("assets/obstacle2.png")
  fuelImage=loadImage("assets/fuel.png")
  coinImage=loadImage("assets/coin.png")
  lifeImage=loadImage("assets/life.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  cars=[]
  game = new Game();
  game.start();

}

function draw() {
  background(backgroundImage);
  if(playerCount==2){
    game.update(1)
    game.play()
    
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
