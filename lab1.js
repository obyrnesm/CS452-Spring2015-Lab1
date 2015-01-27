// Sean O'Byrne	1/30/2015	javascript file



var gl;
var points;
var shape = 2;
var vertices;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	//on chick function
	canvas.addEventListener("click", function(){
		//Shape variable determines the shape to be drawn
		shape ++;
		//Triangle
		if(shape == 3 || shape == 6){
			vertices = [vec2( -0.75, -0.75 ), 
			vec2( 0, 0.75 ),
			vec2( 0.75, -0.75 )];
			shape = 3;
		}
		//Square
		if(shape == 4)
			vertices = [
			vec2( -0.5, -0.5 ),
			vec2(  -0.5,  0.5 ),
			vec2(  0.5, 0.5 ),
			vec2( 0.5, -0.5)];
		//5 sided thingy
		if(shape == 5)
			vertices = [
			vec2( -0.6, -0.2 ),
			vec2(  0,  -0.5 ),
			vec2(  0.6, -0.2 ),
			vec2( 0.4, 0.6),
			vec2( -0.4,0.6)];
		
		gl.viewport( 0, 0, canvas.width, canvas.height );
		gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
		
		var program = initShaders( gl, "vertex-shader", "fragment-shader" );
		gl.useProgram( program );
		
		var bufferId = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
		var vPosition = gl.getAttribLocation( program, "vPosition" );
		gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vPosition );
		
		render();
	} );
	canvas.click();
	//calls on click function to draw the first image
	
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, shape );
}
