/**
 * Created by yu on 2015/12/15.
 */
function Director(){


    this.gameCtx=null;//Canvas rendering2D Object canvas的渲染上下文
    this.player=null;//Player Object 飞机对象
    this.enemies=[];//Enemy List Object 敌人
    this.bullets=[];//Bullets List Object 子弹
    this.back=null;//Background Object 背景对象
    this.backAudio=null;//Background Audio Object 背景音效
    this.fireAudio=null;//Fire Audio 射击音效
    this.enemyExplodeAudio=null;//Audio of Enemy Explode Object 敌人爆炸的音效
    this.playerExplodeAudio=null;//Audio of Player Explode Object 玩家爆炸的音效
    this.gameIntervalId=null;//

    this.score = 0;

 }
//操作
Director.prototype.play=function(){
    //alert("Play");
    this.backAudio.play();
    var fps=60;
    var temp=this;
//    alert(this.gameCtx);
    this.gameIntervalId=setInterval(function(){
        temp.gameLoop();
    },1000/fps);

}
//暂停
Director.prototype.pause=function(){
    clearInterval(this.gameIntervalId);
}
//退出
Director.prototype.exit=function(){

}
//游戏主循环
Director.prototype.gameLoop=function(){
    //0.清屏
    this.gameCtx.clearRect(0,0,600,450);
    //1.绘制背景
    this.back.draw();
    //2.绘制玩家或玩家爆炸
    this.player.draw();


    //3.绘制敌人或敌人爆炸
   var newEnemies = this.enemies.filter(function(enemy){
        if(!enemy.destroyed){
            return true;
        }
    });
    this.enemies  = newEnemies;
    for(var i =0;i<this.enemies.length;i++)
    {
        this.enemies[i].draw()
    }

    //4.绘制子弹
    for(var i =0;i<this.bullets.length;i++)
    {

        this.bullets[i].draw();
    }
    //5.碰撞检测
    this.checkCollision();

    //6.绘制分数
    this.gameCtx.fillText("Score:"+this.score,430,20);

}

Director.prototype.checkCollision =function(){
    for(var i =0;i<this.enemies.length;i++){
        if(!this.enemies[i].exploded)
        {
            for(var j =0;j<this.bullets.length;j++)
            {
                if(isCollided(this.enemies[i],this.bullets[j]))
                {

                    this.enemies[i].explode();
                    this.score+=100;

                }

            }
            if(isCollided(this.enemies[i],this.player)){
                console.log("sssss")
                this.player.explode1();
            }
        }

    }
}