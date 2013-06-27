var canvas = document.getElementById("logo");
var ctx = canvas.getContext("2d");

var pieOptions = {
						context: ctx,
						x: canvas.width/2,
						y: canvas.height/2,
						radius: 150,
						sides: 6,
						percentArray: [80, 60, 30, 80, 50, 20],

						lineWidth: 10,
						lineColor: '#fff',
						segmentColors: ['#F2385A', '#F5A503', '#E9F1DF', '#56D9CD', '#3AA1BF', '#71F5EC']
					};

var pieOptions = {
	context: ctx,
	x: canvas.width/2,
	y: canvas.height/2,
	radius: 150,
	sides: 6,
	percentArray: [80, 60, 30, 80, 50, 20],

	lineWidth: 10,
	lineColor: '#fff',
	segmentColors: ['#63C5EC', '#36D787', '#F9D01E', '#FA8FB9', '#A3369F', '#E81333']
};


var PolygonPie = function ( options ) {

	function trigFunctionX ( pointRatio ){
		return Math.cos(pointRatio*2*Math.PI);
	}

	function trigFunctionY ( pointRatio ){
		return Math.sin(pointRatio*2*Math.PI);
	}

	if (!options) {
		console.log("Will use some deault options one day")
	}
	

	this.options = options
	this.context  = options.context;
	this.centerX  = options.x;
	this.centerY  = options.y;
	this.radius  = options.radius;
	this.sides  = options.sides;
	this.percentArray  = options.percentArray;
	this.lineWidth = options.lineWidth;
	this.lineColor = options.lineColor;
	this.segmentColors = options.segmentColors;
	

	this.draw = function() {

		for (var i=0; i<=this.sides; i++) {
			var triRadius = (this.radius*(this.percentArray[i]/100));
			var pointCount = i;
			var pointRatio = pointCount/this.sides;
			var pointRatioPRev = (pointCount+1)/this.sides;

			var xSteps = trigFunctionX(pointRatio);
			var ySteps = trigFunctionY(pointRatio);

			var xStepsPrev = trigFunctionX(pointRatioPRev);
			var yStepsPrev = trigFunctionY(pointRatioPRev);

			var pointX = this.centerX + xSteps * triRadius;
			var pointY = this.centerY + ySteps * triRadius;

			var pointXPrev = this.centerX + xStepsPrev * triRadius;
			var pointYPrev = this.centerY + yStepsPrev * triRadius;

			this.context.beginPath();
			this.context.moveTo(pointX,  pointY);
			this.context.lineTo(this.centerX, this.centerY);
			this.context.lineTo(pointXPrev, pointYPrev);
			this.context.lineTo(pointX, pointY);
			this.context.closePath();
			this.context.fillStyle = this.segmentColors[i];
			this.context.fill();
		}

		for (var i=0; i<=this.sides; i++) {
			var pointRatio = i/this.sides;
			var xSteps = trigFunctionX(pointRatio);
			var ySteps = trigFunctionY(pointRatio);
			var pointX = this.centerX + xSteps * this.radius;
			var pointY = this.centerY + ySteps * this.radius;
			this.context.beginPath();
			this.context.moveTo(pointX,  pointY);
			this.context.lineTo(this.centerX, this.centerY);
			this.context.stroke();
			this.context.closePath();
		}

		this.context.beginPath();
		this.context.lineWidth = this.lineWidth;
		this.context.moveTo(this.centerX + this.radius,  this.centerY);

		for (var i=0; i<=this.sides; i++) {
			var pointRatio = i/this.sides;
			var xSteps = trigFunctionX(pointRatio);
			var ySteps = trigFunctionY(pointRatio);
			var pointX = this.centerX + xSteps * this.radius;
			var pointY = this.centerY + ySteps * this.radius;
			this.context.lineTo(pointX, pointY);
			this.context.strokeStyle = this.lineColor;
			this.context.stroke();
			
		}

		this.context.closePath();
	}

	this.draw();
};



var pie = new PolygonPie(pieOptions);


var renderToCanvas = function (width, height, renderFunction) {
    var buffer = document.createElement('canvas');
    buffer.width = width;
    buffer.height = height;
    renderFunction(buffer.getContext('2d'));
    return buffer;
};

function render () {
	ctx.clearRect(0, 0, 500, 500);
	pie.draw();
	
	$('#sSides').val(pieOptions.sides);
	$('#sLine').val(pieOptions.lineWidth);

	$(".sPercent").each(function( i ) {
		$(this).val(pieOptions.percentArray[i]);
	});

	$(".sPercentColor").each(function( i ) {
		$(this).val(pieOptions.segmentColors[i]);
	});
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

(function animloop(){
	requestAnimFrame(animloop);
	render();
})();

animate();

function animation1() {
	var tween = new TWEEN.Tween( { width: 10, sides: 100 } )
			.to( { width: 5, sides: 6 }, 1000 )
			.easing( TWEEN.Easing.Exponential.InOut )
			.onUpdate( function () {
			pieOptions.sides = this.sides;
			pieOptions.lineWidth = this.width;
		})
	.start()
}

function animation2() {
	var tween = new TWEEN.Tween( { width: 1, sides: 2 } )
		.to( { width: 10, sides: 6 }, 5500 )
		.easing( TWEEN.Easing.Elastic.Out )
		.onUpdate( function () {
			pieOptions.sides = this.sides;
			pieOptions.lineWidth = this.width;
		})
		.start();
}


function animation3() {
	var tween = new TWEEN.Tween( { width: 1, sides: 0 } )
		.to( { width: 10, sides: 6 }, 5500 )
		.easing( TWEEN.Easing.Elastic.Out )
		.onUpdate( function () {
			pieOptions.sides = this.sides;
			pieOptions.lineWidth = this.width;
		})
		.start();

	var tween2 = new TWEEN.Tween( { percent: 0 } )
		.to( { percent: 100 }, 5500 )
		.easing( TWEEN.Easing.Elastic.Out )
		.onUpdate( function () {
			for (var i=0; i<6; i++) {
				pieOptions.percentArray[i] = this.percent;
			}
		})
		.start();
}

function animate() {
	requestAnimationFrame( animate );
	TWEEN.update();
}

function createOptions () {
	console.log("var pieOptions = { context: ctx, x: canvas.width/2, y: canvas.height/2, radius: 150, sides: "+pieOptions.sides+", percentArray: ["+pieOptions.percentArray[0]+", "+pieOptions.percentArray[1]+", "+pieOptions.percentArray[2]+", "+pieOptions.percentArray[3]+", "+pieOptions.percentArray[4]+", "+pieOptions.percentArray[5]+"], lineWidth: "+pieOptions.lineWidth+", lineColor: '"+pieOptions.lineColor+"', segmentColors: ['"+pieOptions.segmentColors[0]+"', '"+pieOptions.segmentColors[1]+"', '"+pieOptions.segmentColors[2]+"', '"+pieOptions.segmentColors[3]+"', '"+pieOptions.segmentColors[4]+"', '"+pieOptions.segmentColors[5]+"']};")
}
