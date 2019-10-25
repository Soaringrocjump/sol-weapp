"use strict";var _index=_interopRequireDefault(require("./cax/index.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var info=wx.getSystemInfoSync(),innerAudioContext=wx.createInnerAudioContext(),shapeArray=[];Component({externalClasses:["sol-class"],properties:{visible:{type:Boolean,value:!1},mode:{type:Number,value:"1"},createSpeed:{type:Number,value:400},time:{type:Number,value:15},readyTime:{type:Number,value:5},total:{type:Number,value:100},number:{type:Number,value:10},min:{type:Number,value:0},max:{type:Number,value:3},decimal:{type:Number,value:0}},data:{score:0,showScore:0,showChangeScore:0,gameTimer:"",createPacketTimer:"",packetMoveDownTimer:"",readyRainTimer:null,readyVisible:!0,isGameOver:!1,packetArr:[]},ready:function(){this.start()},methods:{start:function(){var e=this;this.data.readyRainTimer=setInterval(function(){0==e.data.readyTime?(clearInterval(e.data.readyRainTimer),e.setData({readyVisible:!1}),e.play()):(e.data.readyTime-=1,e.setData({readyTime:e.data.readyTime}))},1e3)},play:function(){var e=new _index.default.Stage(info.windowWidth,info.windowHeight,"myCanvas",this);this.createPacket(e),this.packetMoveDown(e),this.stopRain(e),this.audioOfClick()},audioOfClick:function(){innerAudioContext.autoplay=!1,innerAudioContext.src="/assets/dianji.mp3",innerAudioContext.onPlay(function(){}),innerAudioContext.onError(function(e){})},createPacket:function(a){var t=this,r=0,e=0,i=this.data,n=i.total,o=i.number,s=i.max,c=i.min,d=i.time,u=i.mode,m=i.createSpeed;1==u?(e=1e3*d/o,this.data.packetArr=this.randomRedPacketGenerator(o,n,c,s)):e=m,this.data.createPacketTimer=setInterval(function(){var e="redCard"+String(r);t.createShape(a,e,r),r++},e)},createShape:function(e,r,i){var n=this,o=this,a=Math.random()*(info.windowWidth-80);r=new _index.default.Bitmap("/assets/images/rdc.png");var t=90*Math.random()-45;r.rotation=t,r.scaleX=r.scaleY=(10*Math.random()+40)/100,r.x=a,r.y=-50,r.on("touchstart",function(){Array.prototype.indexValue=function(e){for(var a=0;a<this.length;a++)if(this[a]==e)return a};var e=shapeArray.indexValue(r);shapeArray.splice(e,1),r.destroy(),o.animationOfScore(),innerAudioContext.play();var a=0;a=1==n.data.mode?parseFloat(n.data.packetArr[i]):parseFloat(Math.random()*n.data.max+n.data.min);var t=o.data.score+a;o.setData({score:t,showScore:t.toFixed(n.data.decimal),showChangeScore:a.toFixed(n.data.decimal)})}),e.add(r),shapeArray.push(r)},animationOfScore:function(){var e=wx.createAnimation({duration:300,timingFunction:"ease"});(this.animation=e).opacity(1).step(),setTimeout(function(){e.opacity(0).step(),this.setData({animationData:e.export()})}.bind(this),10)},packetMoveDown:function(t){this.data.packetMoveDownTimer=setInterval(function(){shapeArray.forEach(function(e,a){e.y=e.y+3,e.y>info.windowHeight&&(t.remove(e),shapeArray.splice(a,1))}),t.update()},10)},stopRain:function(a){var t=this;this.data.gameTimer=setInterval(function(){var e=t.data.time-1;0==e&&t.rainOver(a),t.setData({time:e})},1e3)},rainOver:function(t){clearInterval(this.data.createPacketTimer),clearInterval(this.data.packetMoveDownTimer),clearInterval(this.data.gameTimer),shapeArray.forEach(function(e,a){e.destroy(),t.update()}),this.setData({isGameOver:!0})},finish:function(){this.triggerEvent("finish")},checkrule:function(){},shuffle_pick:function(e){for(var a=[],t=e.length;0<t;){var r=Math.floor(Math.random()*t);a.push(e[r]),e[r]=e[--t]}return a},randomRedPacketGenerator:function(e,a,t,r){if(a<t*e||r*e<a)throw Error("没法满足最最少 ".concat(t," 最大 ").concat(r," 的条件"));for(var i,n,o,s=[],c=e;1<=c;c--)o=t<a-r*(c-1)?a-r*(c-1):t,n=a-t*(c-1)<r?a-t*(c-1):r,i=parseFloat(Math.random()*(n-o)+o).toFixed(this.data.decimal),a=parseFloat(a-i),s.push(i);return this.shuffle_pick(s)}}});