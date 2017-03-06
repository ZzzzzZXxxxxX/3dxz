/**
 * Created by Boy on 2015/12/1.
 */
//消息枚举
var dataType={
    ChatMessage:0,//聊天消息
    DrawMessage:1,//画图消息
    TokenMessage:2//令牌
};
//聊天消息格式
var chatMessage={
    type:dataType.ChatMessage,
    content:null
};
//绘画消息格式
var drawMessae={
    type:dataType.DrawMessage,
    startX:0,
    startY:0,
    endX:0,
    endY:0,
    color:"blue",
    lineWidth:2,
    isClear:false
};
//令牌消息
var tokenMessage={
    type:dataType.TokenMessage,
    hasToken:false
};