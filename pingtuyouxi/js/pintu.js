var $block = $(".block");
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var randomIndex = 0;
var itemAtIndex = 0;
var mBox = document.getElementById("move_block");
var MLeft = MRight = MUp = MDown = false;
var MoveIndex = 0;
var test = 0;
var x = y = 0;
var UseStep = 0;
var UseTime=0;
var ReStart=false;
var isFinish=0;
//复制9个div
for(var i = 0; i < 8; i++) {
	$block.clone().appendTo($("#bg"));
}

//判断有无解
function solvability(order) {
	var sum=0;
	for(var m=0;m<arr.length;m++){
			for(var n=m+1;n<arr.length;n++){
				if(arr[m]>arr[n])
					sum++;
			}
		}
	return sum;
}

$("#btns").click(function() {
	for(var i = arr.length - 1; i >= 0; i--) {
		randomIndex = Math.floor(Math.random() * (i + 1));
		itemAtIndex = arr[randomIndex];
		arr[randomIndex] = arr[i];
		arr[i] = itemAtIndex;
	}
	var canPlay = solvability(arr);
//	alert(canPlay);
//	alert(arr);	
	if(ReStart==true){
		UseTime=0;
		UseStep=0;
		$("#move_block").css({"visibility":"visible"});
	}
	ReStart=true;
	$("#btns").val("重开");
	$("#bg_before").css({
		"visibility": "hidden"
	});
	$("#bg").css({
		"visibility": "visible"
	});
	draw();
	$("#move_block").focus();
	
});
$("#btns").one("click",function(){
	times = setInterval(setTime, 1000); //每隔1秒执行函数
});
$("#btne").click(function() {
	$("#btne").val("继续");
	clearInterval(times); //清除对函数的调用
});

//判断是否完成
function gameOver(){
	for(i=0;i<arr.length-1;i++){
		if(arr[i]<arr[i+1]){
			isFinish++;
		}
	}
	if(isFinish==8){
		clearInterval(times); 	
		alert("你完成游戏一共走了"+UseStep+"步，共耗时"+UseTime+"s");
		$("#move_block").css({"visibility":"hidden"});
		isFinish=0;
	}else{
		isFinish=0;
	}
}
//图片随机摆放
function draw() {
	$(".block").each(function(index) {
		$(this).css({
			"left": 102 * (index % 3) + "px",
			"top": 102 * Math.floor(index / 3) + "px",
			"background-image": "url(img/test.jpg)",
			"background-position": "-" + 100 * (arr[index] % 3) + "px -" + 100 * Math.floor(arr[index] / 3) + "px"
		});
	});
}
//控制范围
function limit() {
	//防止左侧溢出
	mBox.offsetLeft <= 0 && (mBox.style.left = 0);
	//防止顶部溢出
	mBox.offsetTop <= 0 && (mBox.style.top = 0);
	//防止右侧溢出
	305 - mBox.offsetLeft - mBox.offsetWidth <= 0 && (mBox.style.left = 305 - mBox.offsetWidth + "px");
	//防止底部溢出
	305 - mBox.offsetTop - mBox.offsetHeight <= 0 && (mBox.style.top = 305 - mBox.offsetHeight + "px");
}
//计时
function setTime() {
	gameOver();
	UseTime++;
}

//黑块移动
setInterval(function() {
	document.getElementById("score").innerHTML = "步数: <br /> " + UseStep + "<br/>时间:<br/>" + UseTime + "s";
	if(MLeft) {
		mBox.style.left = mBox.offsetLeft - 102 + "px";
		x = (MoveIndex - 1) / 3;
		if(parseInt(MoveIndex / 3) == parseInt(x) && MoveIndex > 0) {
			test = arr[MoveIndex];
			arr[MoveIndex] = arr[MoveIndex - 1];
			arr[MoveIndex - 1] = test;
			draw();
			MoveIndex--;
			UseStep++;
		}
	} else if(MRight) {
		mBox.style.left = mBox.offsetLeft + 102 + "px";
		y = (MoveIndex + 1) / 3;
		if(parseInt(MoveIndex / 3) == parseInt(y) && MoveIndex < 9) {
			test = arr[MoveIndex];
			arr[MoveIndex] = arr[MoveIndex + 1];
			arr[MoveIndex + 1] = test;
			draw();
			MoveIndex++;
			UseStep++;
		}
	}
	if(MUp) {
		mBox.style.top = mBox.offsetTop - 102 + "px"
		if((MoveIndex % 3) == (MoveIndex - 3) % 3 && MoveIndex > 0) {
			test = arr[MoveIndex];
			arr[MoveIndex] = arr[MoveIndex - 3];
			arr[MoveIndex - 3] = test;
			draw();
			MoveIndex = MoveIndex - 3;
			UseStep++;
		}
	} else if(MDown) {
		mBox.style.top = mBox.offsetTop + 102 + "px"
		if((MoveIndex % 3) == (MoveIndex + 3) % 3 && MoveIndex < 6) {
			test = arr[MoveIndex];
			arr[MoveIndex] = arr[MoveIndex + 3];
			arr[MoveIndex + 3] = test;
			draw();
			MoveIndex = MoveIndex + 3;
			UseStep++;
		}
	}
	limit();
}, 100);
//控制黑块
$("#move_block").attr("tabindex", 1);
$("#move_block").keydown(function(event) {
	switch((event || window.event).keyCode) {
		case 37:
			MLeft = true;
			break;
		case 38:
			MUp = true;
			break;
		case 39:
			MRight = true;
			break;
		case 40:
			MDown = true;
			break;
	}
});
$("#move_block").keyup(function(event) {
	switch((event || window.event).keyCode) {
		case 37:
			MLeft = false;
			break;
		case 38:
			MUp = false;
			break;
		case 39:
			MRight = false;
			break;
		case 40:
			MDown = false;
			break;
	}
});