/**
 * Created by yu on 2015/12/22.
 */
function Bullet(ctx,x,y,buls){
    this.ctx = ctx;
    this.img =new Image();
    this.img.src ="images/projectile.png"
    this.x =x;
    this.y =y;
    this.width =16;
    this.height = 28;
    this.buls =buls
    this.destroyed = false;
}

Bullet.prototype.draw =function(){
    this.ctx.drawImage(this.img,this.x,this.y);
    this.y-=4;
    if(this.y<-10)
    {
        this.buls.remove(this);
    }

}
Bullet.prototype.getCenter =function(){
    return new Point(this.x+this.width/2,this.y+this.height/2);
}