/**
 * Created by yu on 2015/12/17.
 */
function Enemy(ctx,explodeAudio){
    this.ctx =ctx;
    this.img =new Image();
    this.img.src ="images/Rock.png"
    this.x =Math.floor(Math.random()*600);
    this.y =Math.floor(-50000+Math.random()*50000);
    this.width =66;
    this.height = 70;

    this.exploded =false;
    this.explodeImg =new Image();
    this.explodeImg.src ="images/explosionEnemy.png"
    this.explodeIndex = 0;
    this.explodeAdudio =explodeAudio;
    this.destroyed=false;


}

Enemy.prototype.draw =function(){
    if(!this.exploded){
        this.ctx.drawImage(this.img,this.x,this.y);
        this.y++;
    }else{
//        this.ctx.drawImage(this.explodeImg,this.x,this.y);
        this.ctx.drawImage(this.explodeImg,this.explodeIndex*44,0,44,49,this.x,this.y,44,49);
        this.explodeIndex++;
        if(this.explodeIndex>7){
            this.destroyed = true;
        }
    }


}
Enemy.prototype.getCenter =function(){
    return new Point(this.x+this.width/2,this.y+this.height/2);
}

Enemy.prototype.explode =function(){
    this.explodeAdudio.play();
    this.exploded = true;

}