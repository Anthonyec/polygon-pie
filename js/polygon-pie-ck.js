function PolygonPie(e){function t(e){return Math.cos(e*2*Math.PI)}function n(e){return Math.sin(e*2*Math.PI)}e||console.log("Will use some deault options one day");this.draw=function(){this.options=e;this.context=e.context;this.centerX=e.x;this.centerY=e.y;this.radius=e.radius;this.sides=e.sides;this.percentArray=e.percentArray;this.lineWidth=e.lineWidth;this.lineColor=e.lineColor;this.segmentColors=e.segmentColors;for(var r=0;r<=this.sides;r++){var i=this.radius*(this.percentArray[r]/100),s=r,o=s/this.sides,u=(s+1)/this.sides,a=t(o),f=n(o),l=t(u),c=n(u),h=this.centerX+a*i,p=this.centerY+f*i,d=this.centerX+l*i,v=this.centerY+c*i;this.context.beginPath();this.context.moveTo(h,p);this.context.lineTo(this.centerX,this.centerY);this.context.lineTo(d,v);this.context.lineTo(h,p);this.context.closePath();this.context.fillStyle=this.segmentColors[r];this.context.fill()}for(var r=0;r<=this.sides;r++){var o=r/this.sides,a=t(o),f=n(o),h=this.centerX+a*this.radius,p=this.centerY+f*this.radius;this.context.beginPath();this.context.moveTo(h,p);this.context.lineTo(this.centerX,this.centerY);this.context.stroke();this.context.closePath()}this.context.beginPath();this.context.lineWidth=this.lineWidth;this.context.moveTo(this.centerX+this.radius,this.centerY);for(var r=0;r<=this.sides;r++){var o=r/this.sides,a=t(o),f=n(o),h=this.centerX+a*this.radius,p=this.centerY+f*this.radius;this.context.lineTo(h,p);this.context.strokeStyle=this.lineColor;this.context.stroke()}this.context.closePath()};this.draw()}function render(){ctx.clearRect(0,0,500,500);pie.draw();$("#sSides").val(pieOptions.sides);$("#sLine").val(pieOptions.lineWidth);$(".sPercent").each(function(e){$(this).val(pieOptions.percentArray[e])});$(".sPercentColor").each(function(e){$(this).val(pieOptions.segmentColors[e])})}function animation1(){var e=(new TWEEN.Tween({width:10,sides:100})).to({width:5,sides:6},1500).easing(TWEEN.Easing.Cubic.Out).onUpdate(function(){pieOptions.sides=this.sides;pieOptions.lineWidth=this.width}).start()}function animation2(){var e=(new TWEEN.Tween({width:1,sides:3})).to({width:10,sides:6},5500).easing(TWEEN.Easing.Elastic.Out).onUpdate(function(){pieOptions.sides=this.sides;pieOptions.lineWidth=this.width}).start()}function animation3(){var e=(new TWEEN.Tween({width:1,sides:0})).to({width:10,sides:6},5500).easing(TWEEN.Easing.Elastic.Out).onUpdate(function(){pieOptions.sides=this.sides;pieOptions.lineWidth=this.width}).start(),t=(new TWEEN.Tween({percent:0})).to({percent:100},5500).easing(TWEEN.Easing.Elastic.Out).onUpdate(function(){for(var e=0;e<6;e++)pieOptions.percentArray[e]=this.percent}).start()}function animate(){requestAnimationFrame(animate);TWEEN.update()}var canvas=document.getElementById("logo"),ctx=canvas.getContext("2d"),pieOptions={context:ctx,x:canvas.width/2,y:canvas.height/2,radius:150,sides:6,percentArray:[80,60,30,80,50,20],lineWidth:10,lineColor:"#fff",segmentColors:["#F2385A","#F5A503","#E9F1DF","#56D9CD","#3AA1BF","#71F5EC"]},pie=new PolygonPie(pieOptions);window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();(function e(){requestAnimFrame(e);render()})();animate();