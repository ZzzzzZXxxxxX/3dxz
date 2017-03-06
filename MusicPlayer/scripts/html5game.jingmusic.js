/**
 * Created by Boy on 2015/11/10.
 */
var omusic;
$(function(){
    omusic=$("#music")[0];
    $("#mscPlrCtn").hover(function(){
        $("#playCtl,#playBtn").css({"opacity":"1"});
    },function(){
        $("#playCtl,#playBtn").css({"opacity":"0"});
    });
    document.getElementById("playCtl").title="播放";
    $("#playBtn").click(function(){
        $("#playBtn").toggleClass("play pause");
        if($("#mscPlr[class*=rotateCD]").length==0)
        {
            $("#mscPlr").addClass("rotateCD");
        }
        //鼠标悬停提示

        if($("div > a").hasClass("play"))
        {
            document.getElementById("playCtl").title="播放";
        }
        else
        {
            document.getElementById("playCtl").title="暂停";
        }

        if(omusic.paused)
        {
            $("#mscPlr").addClass("rt").removeClass("stRt");
            omusic.play();
        }
        else
        {
            $("#mscPlr").addClass("stRt").removeClass("rt");
            omusic.pause();
        }
    });
    $(omusic).bind("ended",function(){
        $("#playBtn").removeClass().addClass("play");
        $("#mscPlr").removeClass();
    });
});