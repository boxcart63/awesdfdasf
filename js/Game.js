class Game {
  constructor() {
    this.resetbutton=createButton("");
    this.leaderboard=createElement("h2")
    this.leader1=createElement("h3")
    this.leader2=createElement("h3")
    this.resettext=createElement("h3")
  }


  start() {

    form = new Form();
    form.display();
    player = new Player();
    player.getCount()
    car1=createSprite(width/2-100,0,0,0)
    car1.addImage("car1",car1img)
    car1.scale=(0.07)
    car2=createSprite(width/2+100,0,0,0)
    car2.addImage("car2",car2img)
    car2.scale=(0.07)
    cars=[car1,car2]
    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];
    fuels=new Group()
    obstacles=new Group()
    coins=new Group()
    this.addObjects(obstacles,12,obstacle1Image,0.04,obstaclesPositions)
    this.addObjects(fuels,10,fuelImage,0.02)
    this.addObjects(coins,10,coinImage,0.09)
  }
addObjects(group,grouplength,groupimg,scale,positions=[]){
  for(var i=0;i<grouplength;i+=1){
    var x,y;
    if(positions.length>0){
      x=positions[i].x
      y=positions[i].y
      groupimg=positions[i].image
    }else{
      x=random(width/2-150,width/2+150)
      y=random(-height*4.5,height-400)
    }
    var sprite=createSprite(x,y)
    sprite.addImage("img",groupimg)
    sprite.scale=scale
    group.add(sprite)
  }
}
  leaderb(){
    var leader1;
    var leader2;
    var players=Object.values(allPlayers)
    if(players[0].rank==0){
      leader1=players[0]
      leader2=players[1]
    }else {
      leader1=players[1]
      leader2=players[0]
    }
    this.leader1.html(leader1.name+": "+leader1.score)
    this.leader2.html(leader2.name+": "+leader2.score)
  }
  play(){
    this.hideElements()
    this.resetbuton()
   
    form.greeting.hide()
    Player.getInfo()
    console.log(allPlayers)
   
    if (allPlayers!=undefined){
      image(trackimg,0,-height*5,width,height*6)
      this.showFuel()
      this.showLife()
      this.leaderb()
      this.fuelLoss()
      var index=0
      for(var plr in allPlayers){
        index+=1
        cars[index-1].position.x=allPlayers[plr].positionX
        cars[index-1].position.y=allPlayers[plr].positionY
        if(index==player.index){
          stroke(10)
          fill("cyan")
          ellipse(allPlayers[plr].positionX,allPlayers[plr].positionY,63)
         
          camera.position.y=cars[index-1].position.y
        }
      }
      if(keyIsDown(UP_ARROW)){
        player.positionY-=5
        player.fuel-=1
        player.updatePlayer()
        }
      if(keyIsDown(LEFT_ARROW)){
        player.positionX-=1
        player.fuel-=1
        player.updatePlayer()
      }
      if(keyIsDown(RIGHT_ARROW)){
        player.positionX+=1
        player.fuel-=1
        player.updatePlayer()
      }

      drawSprites()
    }
  }
  getState(){
    database.ref("gamestate").on("value",function(data){
      gameState=data.val()
    })
  }
  update(stat){
    database.ref("/").update({
      gamestate:stat
  })
  }
  hideElements(){
    form.hide()

    this.resetbutton.position(width/2+330,100)
    this.resetbutton.class("resetButton")
    this.resettext.position(width/2+330,40)
    this.resettext.class("resetText")
    this.resettext.html("reset?")
    this.leaderboard.class("resetText")
    this.leader1.class("leadersText")
    this.leader2.class("leadersText")
    this.leaderboard.position(width/3-60,40)
    this.leader1.position(width/3-50,80)
    this.leader2.position(width/3-50,130)
    this.leaderboard.html("Leaderboard")
  }

  showFuel(){
    image(fuelImage,width/2-70,player.positionY-300,20,20)
    fill("white")
    rect(width/2-50,player.positionY-300,185,20)
    fill("yellow")
    rect(width/2-50,player.positionY-300,player.fuel,20)
  }
  showLife(){
    image(lifeImage,width/2-70,player.positionY-250,20,20)
    fill("white")
    rect(width/2-50,player.positionY-250,185,20)
    fill("red")
    rect(width/2-50,player.positionY-250,player.life,20)
  }
  fuelLoss(){
    if(player.fuel<=0){
      this.losePopup()
    }
  }
  losePopup(){
    swal({
      title:"You lose",
      text:"hahahahahah",
      imageUrl:"https://us.123rf.com/450wm/sudowoodo/sudowoodo2006/sudowoodo200600003/149044053-cartoon-hand-gesture-showing-letter-l-loser-sign-simple-black-and-white-comic-drawing-isolated-vecto.jpg?ver=6",
      imageSize:"100x100",
      confirmButtonText:"agian?"
    })
  }
  resetbuton(){
    this.resetbutton.mousePressed(()=>{
      database.ref("/").set({
        playercount:0,
        gamestate:0,
        players:{}
      })
      window.location.reload()
    })    
  }
  

}
