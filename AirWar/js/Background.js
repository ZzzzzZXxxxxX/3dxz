/**
 * Created by yu on 2015/12/15.
 */
function Background(ctx){
    this.ctx=ctx;
    this.img=new Image();
    this.img.src="images/Stars.png";
    this.img1=new Image();
    this.img1.src="images/star2.png";
    this.y=0;
}
Background.prototype.draw=function(){

    this.ctx.drawImage(this.img,0,this.y);
    this.ctx.drawImage(this.img,0,this.y-450);
    if(this.y>450)
    {
        this.y =0;
    }
    this.y++;

}