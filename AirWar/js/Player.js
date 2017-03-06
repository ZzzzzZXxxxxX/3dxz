/**
 * Created by yu on 2015/12/17.
 */
function Player(ctx,buls,fireAudio,playerExplodeAdudio){
    this.ctx =ctx;
    this.img =new Image();
    this.img.src ="images/Player.png"
    this.x =250;
    this.y =350;
    this.width=100;
    this.height=100;
    this.buls =buls;
    this.fireAudio =fireAudio;


    this.exploded1 =false;
    this.explodeImg1 =new Image();
    this.explodeImg1.src ="images/explosionPlayer.png"
    this.explodeIndex1 = 0;
    this.playerAudio =playerExplodeAdudio;
    this.destroyed=false;

    this.OverImg =new Image();
    this.OverImg.src ="images/SpaceShooter_Lose.png"

}

Player.prototype.draw =function(ctx){
    if(keyStatus.upStatus){
        this.y -=5;
    }
    if(keyStatus.downStatus)
    {
        this.y+=5;
    }
    if(this.y<=0)
    {
        this.y =0
    }
    if(this.y>=350)
    {
        this.y =350;
    }
    if(keyStatus.leftStatus){
        this.x -=5;
    }
    if(keyStatus.rightStatus)
    {
        this.x+=5;
    }
    if(this.x<=0)
    {
        this.x =0;
    }
    if(this.x>=500)
    {
        this.x =500;
    }
    if(keyStatus.spaceStatus){
        this.fire();
        keyStatus.spaceStatus =false;
    }

    if(!this.exploded1){
        this.ctx.drawImage(this.img,this.x,this.y);
    }else{
        this.ctx.drawImage(this.explodeImg1,this.explodeIndex1*42,0,42,43,this.x,this.y,42,43);
        this.explodeIndex1++;
        if(this.explodeIndex1>5){
            this.destroyed = true;
        }
        this.ctx.drawImage(this.OverImg,0,0);

    }


}

Player.prototype.fire =function(){
    this.fireAudio.play();
    var bul =new Bullet(this.ctx,this.x+44,this.y-22,this.buls);
    this.buls.push(bul);
}

Player.prototype.getCenter =function(){
    return new Point(this.x+this.width/2,this.y+this.height/2);
}
Player.prototype.explode1 =function(){
    this.playerAudio.play();
    this.exploded1 = true;

}