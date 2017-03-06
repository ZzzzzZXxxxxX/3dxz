/**
 * Created by Boy on 2015/12/1.
 */
var webSocketGame={
    canvas:null,
    ctx:null,
    canDraw:false,
    startX:0,
    startY:0,
    ws:null
};
$(function(){
    webSocketGame.canvas=$("#drawing-pad")[0];
    webSocketGame.ctx=webSocketGame.canvas.getContext("2d");

    if(window.WebSocket){
        webSocketGame.ws=new WebSocket("ws://127.0.0.1:7999");
        webSocketGame.ws.onopen=function(){};
        webSocketGame.ws.onclose=function(){};
        webSocketGame.ws.onerror=function(){};
        webSocketGame.ws.onmessage=function(msg){

           var data=JSON.parse(msg.data);
            switch (data.type)
            {
                case dataType.ChatMessage:
                    $("<li>").html(data.content).appendTo($("#chatList"));
                    break;
                case dataType.DrawMessage:
                    drawLine(data.startX, data.startY, data.endX, data.endY,data.lineWidth,data.color);
                    break;
                case dataType.TokenMessage:
                    if(data.hasToken){
                        $("#btnDraw")[0].onclick=function(){
                            readTodraw();
                        };
                        $("#btnReDraw")[0].onclick=function(){
                        webSocketGame.ctx.clearRect(0,0,500,400);
                    };
                    }
                    $("#btnDrawOver")[0].onclick=function(){
                        chatMessage.content="You Guess";
                        webSocketGame.ws.send(JSON.stringify(chatMessage));
                    };
                    $("#btnSend")[0].onclick=function(){
                        chatMessage.content=$("#message").val();
                        webSocketGame.ws.send(JSON.stringify(chatMessage));
                        $("#message").val("");
                    };
                    break;
            }
        };
    }
});



function drawLine(x1,y1,x2,y2,ld,wc){
    webSocketGame.ctx.strokeStyle=wc;
    webSocketGame.ctx.lineWidth=ld;
    webSocketGame.ctx.beginPath();
    webSocketGame.ctx.moveTo(x1,y1);
    webSocketGame.ctx.lineTo(x2,y2);
    webSocketGame.ctx.closePath();
    webSocketGame.ctx.stroke();
}

function readTodraw(){
    $(webSocketGame.canvas)
        .mousedown(function(e){
            webSocketGame.canDraw=true;
            var canvasPos=$(this).offset();
            var canvasPosX=canvasPos.left;
            var canvasPosY=canvasPos.top;
            var mouseX= e.pageX;
            var mouseY= e.pageY;

            webSocketGame.startX=mouseX-canvasPosX;
            webSocketGame.startY=mouseY-canvasPosY;
            drawLine(webSocketGame.startX-10,webSocketGame.startY-10,
                    webSocketGame.startX-10,webSocketGame.startY-10,ld,wc);
        })
        .mousemove(function(e){
            var canvasPos=$(this).offset();
            var canvasPosX=canvasPos.left;
            var canvasPosY=canvasPos.top;
            var mouseX= e.pageX;
            var mouseY= e.pageY;
            var currentX=mouseX-canvasPosX;
            var currentY=mouseY-canvasPosY;
            var wc=drawMessae.color;
            var ld=drawMessae.lineWidth;

            $("#divColorY")[0].onclick=function(){
                drawMessae.color="yellow";
            }
            $("#divColorG")[0].onclick=function(){
                drawMessae.color="green";
            }
            $("#divColorB")[0].onclick=function(){
                drawMessae.color="black";
            }
            $("#divColorH")[0].onclick=function(){
                drawMessae.color="pink";
            }
            $("#divColorR")[0].onclick=function(){
                drawMessae.color="red";
            }
            if(webSocketGame.canDraw){
                drawLine(webSocketGame.startX-10,webSocketGame.startY-10,
                    currentX-10,currentY-10,ld,wc);
                drawMessae.endX=currentX-10;
                drawMessae.endY=currentY-10;
                drawMessae.color=wc;
                drawMessae.lineWidth=ld;
                drawMessae.startX=webSocketGame.startX-10;
                drawMessae.startY=webSocketGame.startY-10;

                webSocketGame.ws.send(JSON.stringify(drawMessae));
                webSocketGame.startX=currentX;
                webSocketGame.startY=currentY;
            }
            if(mouseX>(500+canvasPosX) || mouseX<canvasPosX+5 || mouseY>(400+canvasPosY) || mouseY<canvasPosY+5)
            {
                webSocketGame.canDraw=false;
            }
        })
        .mouseup(function(){
            webSocketGame.canDraw=false;
        });
}