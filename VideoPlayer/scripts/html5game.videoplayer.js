var videoPlayer;//视频对象
var dura;//播放总时长
var isFullScreen=false;
var videoPlayer=$("#my-video")[0];
videoPlayer.volume=0.5;
var playAndPause=$("#playPause");
$(function(){
    videoPlayer.addEventListener("webkitfullscreenchange",function(){
        $("#video-controls").addClass("full-screen");
    });
    videoPlayer.addEventListener("loadedmetadata", function(){
            document.getElementById("showVideoTime").innerHTML =videoPlayer.duration.toFixed(0);
    },false);
    videoPlayer.addEventListener("progress", function(){

        var buffertime=0;
        if(videoPlayer.buffered&&videoPlayer.buffered.length)
        {
            buffertime=videoPlayer.buffered.end(0);
        }
        var percent=Math.round(100*buffertime/videoPlayer.duration);
        $("#buffer-progress").css({
            "width":percent+"%"
        });
    }, false);
    videoPlayer.addEventListener("timeupdate",function(){
        var temp=this.currentTime.toFixed(0);
        if(parseInt(temp)<10){
            temp="0"+temp;
        }
        var percent=Math.round(100*temp/videoPlayer.duration);
        $("#played-progress").css({
            "width":percent+"%"
        });
        var x1=parseInt($("#video-progress").css("width"));
        if(videoPlayer.currentTime>0&&percent>1){
                $("#progress-bar").css({
                    "left":percent*x1/100-9
                });
         }
        $(".playtime").text(temp);
    }, false);
});
function videoFullscreen(){
        if(isFullScreen){
                isFullScreen=false;
                if(document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }else{
                videoPlayer.webkitRequestFullScreen();
                isFullScreen=true;
            }
}
//暂停/播放
function playPauseVideo(){
    if(videoPlayer.paused==false){
        playAndPause.addClass("playClass");
        playAndPause.removeClass("pauseClass");
        videoPlayer.pause();
    }else{
        playAndPause.addClass("pauseClass");
        playAndPause.removeClass("playClass");
        videoPlayer.play();
    }
}
//停止
function stopVideo(){
    videoPlayer.currentTime = 0;
}
//快进
function fastForward(){
    videoPlayer.currentTime+=2;
//    videoPlayer.playbackRate*=2;
//    if(videoPlayer.playbackRate>2){
//        videoPlayer.playbackRate=1;
//    }
}
//慢放
function fastBackward(){
    videoPlayer.currentTime-=2;
}
//静音
function volumeControl() {
   if(videoPlayer.muted){
	   $("#volume").removeClass("volumeMute");
	   $("#volume").addClass("volume");
       videoPlayer.muted=false;
   }else{
       $("#volume").addClass("volumeMute");
	   $("#volume").removeClass("volume");
       videoPlayer.muted=true;
   }
}
$("#video-progress").click(function(e){
	var pbl=e.offsetX-$("#progress-bar").width()/3;
	$("#progress-bar").css({"left":pbl+"px"});
	videoPlayer.currentTime=videoPlayer.duration*pbl/$("#buffer-progress").width();
	console.log(e.offsetX);
});
var left;
var moveTF=false;
$("#progressBar").mousedown(function(){
	moveTF=true;	
});
$("#volumeControl").mousemove(function(){
	if(moveTF){
		left=event.clientX-$("#volumeProgress").offset().left-$("#progressBar").width()/2;
		if(left>=0 && left<=100){
			if(!videoPlayer.muted){
				$("#progressBar").css({"left":left+"px"});
				videoPlayer.volume=left*0.01;
			}else{
				$("#volume").removeClass("volumeMute");
				$("#volume").addClass("volume");
				$("#progressBar").css({"left":left+"px"});
				videoPlayer.muted=false;
			}
		}
	}
});
$("#volumeProgress").click(function(){
	var x;
	x=event.offsetX;
	if(!videoPlayer.muted){
		$("#progressBar").css({"left":x+"px"});
		videoPlayer.volume=x*0.01;
	}else{
		$("#volume").removeClass("volumeMute");
		$("#volume").addClass("volume");
		videoPlayer.muted=false;
		$("#progressBar").css({"left":x+"px"});
		videoPlayer.volume=x*0.01;
	}
})
$("#volumeControl").mouseup(function(e){
	moveTF=false;
});
$("#progressBar").mouseover(function(e){
	moveTF=false;
});
//控制视频播放结束
function playEnded(){
    videoPlayer.loop;
}