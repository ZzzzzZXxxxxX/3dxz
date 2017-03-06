/**
 * Created by yu on 2015/12/15.
 */
$(function(){

    $(document).keydown(function(e){
//        alert(e.which)
        switch (e.which) {
            case keyCode.up:
                keyStatus.upStatus =true;
                break
            case keyCode.down:
                keyStatus.downStatus =true
                break
            case keyCode.left:
                keyStatus.leftStatus =true
                break
            case keyCode.right:
                keyStatus.rightStatus =true
                break
            case keyCode.space:
                keyStatus.spaceStatus =true
                break;
        }
    }).keyup(function(e){
        switch (e.which) {
            case keyCode.up:
                keyStatus.upStatus =false;
                break
            case keyCode.down:
                keyStatus.downStatus =false
                break
            case keyCode.left:
                keyStatus.leftStatus =false
                break
            case keyCode.right:
                keyStatus.rightStatus =false
                break;
        }
    });


    var direct=new Director();
    direct.gameCtx=document.getElementById("game_canvas").getContext("2d");
    direct.gameCtx.font ="80,宋体";
    direct.gameCtx.fillStyle ="yellow"
    direct.back=new Background(direct.gameCtx);
    direct.backAudio = document.getElementById("backAudio");
    direct.fireAudio = document.getElementById("shootAudio");
    direct.enemyExplodeAudio =document.getElementById("enemyAudio");
    direct.playerExplodeAudio =document.getElementById("playerAudio");
    direct.player = new Player(direct.gameCtx,direct.bullets,direct.fireAudio,direct.playerExplodeAudio);
    for(var i=0;i<800;i++)
    {
        direct.enemies.push(new Enemy(direct.gameCtx,direct.enemyExplodeAudio));
    }

    direct.play();
})
