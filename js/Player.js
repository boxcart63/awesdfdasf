class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank=0
    this.score=0
    this.fuel=185
    this.life=185
  }

  getCount(){
    database.ref("playercount").on("value",function(data){
      playerCount=data.val()
    })
  }
  updateplayerCount(count){
    database.ref("/").update({
      playercount:count
    })
  }
  create(){
    if(this.index==1){
      this.positionX=width/2-100
    }else{
      this.positionX=width/2+100
    }
   var playerIndex="players/player"+this.index
    database.ref(playerIndex).set({
      name:this.name,
      positionX:this.positionX,
      positionY:this.positionY,
      rank:this.rank,
      score:this.score,
      fuel:this.fuel,
      life:this.life
    }) 
    
  }
  updatePlayer(){
    var playerIndex="players/player"+this.index
    database.ref(playerIndex).update({
      positionX:this.positionX,
      positionY:this.positionY,
      rank:this.rank,
      score:this.score,
      fuel:this.fuel,
      life:this.life
    })
  }
  getDist(){
    database.ref("players/player"+this.index).on("value",data=>{
      var data=data.val()
      this.positionX=data.positionX;
      this.positionY=data.positionY;

    })
  }
 static getInfo(){
    database.ref("players").on("value",data=>{
      var data=data.val(
      )
        allPlayers=data
    })
  }
}
