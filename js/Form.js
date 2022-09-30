class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Enter your name");
    this.playButton = createButton("Play");
    this.titleImg = createImg("./assets/title.png", "game title");
    this.greeting = createElement("h2");
  }

  position(){
   
    this.input.position(width/2-140,height*2/3*2/3)
    this.playButton.position(width/2-130,height*2/3)
    this.titleImg.position(width/2-650,height*1/6)
    this.greeting.position(width/2-130,height/2)
  }
  style(){
    this.input.class("customInput")
    this.playButton.class("customButton")
    this.titleImg.class("gameTitle")
    this.greeting.class("greeting")
  }

  mouseInput(){
    this.playButton.mousePressed(()=>{
      this.hide()
      var message= `hi ${this.input.value()}`;
      this.greeting.html(message+" <br> wait for other")
    playerCount+=1
    player.name=this.input.value()
    player.index=playerCount
    player.create()
    player.updateplayerCount(playerCount)
    player.getDist()
  })
  }

  hide() {
    this.titleImg.hide();
    this.playButton.hide();
    this.input.hide();
    
  }

  display(){
    this.position()
    this.style()
    this.mouseInput()
   
  }

  
}
