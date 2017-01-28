//"use strict";

var canvas;
var gl;

var numVertices = 96;

var axis = 0;
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var theta = [0, 0, 0];
var thetaLoc;

//动画类型
var anivation = [0, 0, 0];
var anivationLoc;

//动画比例
var scale = [0, 0, 0];
var scaleLoc;

//放缩比例
var zoom=1;
var zoomLoc;

var id = 0;

var left_eye1;
var right_eye1;
var left_eye2;
var right_eye2;
var left_eye1_ball;
var right_eye1_ball;
var left_eye2_ball;
var right_eye2_ball;

var vertices = [
	//bird1身体
	vec3(-0.6, -0.2, 0.2), //0
	vec3(-0.6, 0.2, 0.2), //1
	vec3(-0.2, 0.2, 0.2), //2
	vec3(-0.2, -0.2, 0.2), //3
	vec3(-0.6, -0.2, -0.2), //4
	vec3(-0.6, 0.2, -0.2), //5
	vec3(-0.2, 0.2, -0.2), //6
	vec3(-0.2, -0.2, -0.2), //7
	//bird1嘴巴
	vec3(-0.47, -0.1, 0.2),
	vec3(-0.33, -0.1, 0.2),
	vec3(-0.4, 0.0, 0.2),
	vec3(-0.4, -0.1, 0.4),
	//bird2身体
	vec3(0.2, -0.2, 0.2),
	vec3(0.2, 0.2, 0.2),
	vec3(0.6, 0.2, 0.2),
	vec3(0.6, -0.2, 0.2),
	vec3(0.2, -0.2, -0.2),
	vec3(0.2, 0.2, -0.2),
	vec3(0.6, 0.2, -0.2),
	vec3(0.6, -0.2, -0.2),
	//bird2嘴巴
	vec3(0.33, -0.1, 0.2),
	vec3(0.47, -0.1, 0.2),
	vec3(0.4, 0.0, 0.2),
	vec3(0.4, -0.1, 0.4),
	//bird1边框
	vec3(-0.6, -0.2, 0.2),
	vec3(-0.6, 0.2, 0.2),
	vec3(-0.2, 0.2, 0.2),
	vec3(-0.2, -0.2, 0.2),
	vec3(-0.6, -0.2, -0.2),
	vec3(-0.6, 0.2, -0.2),
	vec3(-0.2, 0.2, -0.2),
	vec3(-0.2, -0.2, -0.2),

	vec3(-0.6, -0.2, 0.2),
	vec3(-0.6, -0.2, -0.2),
	vec3(-0.6, 0.2, 0.2),
	vec3(-0.6, 0.2, -0.2),
	vec3(-0.2, 0.2, 0.2),
	vec3(-0.2, 0.2, -0.2),
	vec3(-0.2, -0.2, 0.2),
	vec3(-0.2, -0.2, -0.2),

	//bird2边框
	vec3(0.2, -0.2, 0.2),
	vec3(0.2, 0.2, 0.2),
	vec3(0.6, 0.2, 0.2),
	vec3(0.6, -0.2, 0.2),
	vec3(0.2, -0.2, -0.2),
	vec3(0.2, 0.2, -0.2),
	vec3(0.6, 0.2, -0.2),
	vec3(0.6, -0.2, -0.2),

	vec3(0.2, -0.2, 0.2),
	vec3(0.2, -0.2, -0.2),
	vec3(0.2, 0.2, 0.2),
	vec3(0.2, 0.2, -0.2),
	vec3(0.6, 0.2, 0.2),
	vec3(0.6, 0.2, -0.2),
	vec3(0.6, -0.2, 0.2),
	vec3(0.6, -0.2, -0.2),
		//眉毛
	vec3(-0.58, 0.134, 0.201),
	vec3(-0.58, 0.082, 0.201),
	vec3(-0.431,0.051, 0.201),
	vec3(-0.434, 0.074, 0.201),
 
    vec3(-0.22, 0.134, 0.201),
	vec3(-0.22, 0.082, 0.201),
	vec3(-0.369,0.051, 0.201),
	vec3(-0.365, 0.074, 0.201),

	vec3(0.57, 0.13, 0.201),
	vec3(0.57, 0.09, 0.201),
	vec3(0.432,0.05, 0.201),
	vec3(0.435, 0.07, 0.201),

	vec3(0.22, 0.134, 0.201),
	vec3(0.22, 0.082, 0.201),
	vec3(0.369,0.051, 0.201),
	vec3(0.365, 0.074, 0.201)

];

var vertexColors = [
	//身体
	vec4(0.0, 0.0, 0.4, 0.5), //蓝色
	vec4(0.0, 0.0, 0.4, 0.5),
	vec4(0.0, 0.0, 0.4, 0.5),
	vec4(0.0, 0.0, 0.4, 0.5),
	vec4(0.0, 0.0, 0.4, 0.5),
	vec4(0.0, 0.0, 0.4, 0.5),
	vec4(0.0, 0.0, 0.4, 0.5),
	vec4(0.0, 0.0, 0.4, 0.5),
	//嘴巴
	vec4(1.0, 1.0, 0.0, 1.0), //黄色
	vec4(1.0, 1.0, 0.0, 1.0),
	vec4(1.0, 1.0, 0.0, 1.0),
	vec4(1.0, 1.0, 0.0, 1.0),

	//身体
	vec4(0.0, 0.0, 0.4, 0.5), //蓝色
	vec4(0.0, 0.0, 0.4, 0.5),
	vec4(0.0, 0.0, 0.4, 0.5),
	vec4(0.0, 0.0, 0.4, 0.5),
	vec4(0.0, 0.0, 0.4, 0.5),
	vec4(0.0, 0.0, 0.4, 0.5),
	vec4(0.0, 0.0, 0.4, 0.5),
	vec4(0.0, 0.0, 0.4, 0.5),
	//嘴巴
	vec4(1.0, 1.0, 0.0, 1.0), //黄色
	vec4(1.0, 1.0, 0.0, 1.0),
	vec4(1.0, 1.0, 0.0, 1.0),
	vec4(1.0, 1.0, 0.0, 1.0),
	//bird1身体边框线
	vec4(1.0, 1.0, 1.0, 1.0), //白色
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),

	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),

	//bird2身体边框线
	vec4(1.0, 1.0, 1.0, 1.0), //白色
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),

	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0),
	
	//眉毛
	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),

	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),

	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),

	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0)

];

// indices of the 12 triangles that compise the cube

var indices = [
	//bird1身体
	1, 0, 3,
	3, 2, 1,
	2, 3, 7,
	7, 6, 2,
	3, 0, 4,
	4, 7, 3,
	6, 5, 1,
	1, 2, 6,
	4, 5, 6,
	6, 7, 4,
	5, 4, 0,
	0, 1, 5,
	//bird1嘴巴
	8, 10, 9,
	8, 10, 11,
	9, 10, 11,
	8, 9, 11,

	//bird2身体
	13, 12, 15,
	15, 14, 13,
	14, 15, 19,
	19, 18, 14,
	15, 12, 16,
	16, 19, 15,
	18, 17, 13,
	13, 14, 18,
	16, 17, 18,
	18, 19, 16,
	17, 16, 12,
	12, 13, 17,

	//bird2嘴巴
	20, 22, 21,
	20, 22, 23,
	21, 22, 23,
	20, 21, 23
];
window.onload = function init() {
	canvas = document.getElementById("gl-canvas");

	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {
		alert("WebGL isn't available");
	}

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1.0, 1.0, 1.0, 1.0);

	gl.enable(gl.DEPTH_TEST);;

	left_eye1 = ball(-0.50, 0, 0.21, 0.04, 255, 255, 255); //左眼1
	right_eye1 = ball(-0.30, 0, 0.21, 0.04, 255, 255, 255); //右眼1
	left_eye2 = ball(0.30, 0, 0.21, 0.04, 255, 255, 255); //左眼2
	right_eye2 = ball(0.50, 0, 0.21, 0.04, 255, 255, 255); //右眼2
	left_eye1_ball = ball(-0.47, 0, 0.24, 0.015, 0, 0, 0); //左眼珠1
	right_eye1_ball = ball(-0.27, 0, 0.24, 0.015, 0, 0, 0); //右眼珠1
	left_eye2_ball = ball(0.33, 0, 0.24, 0.015, 0, 0, 0); //左眼珠2
	right_eye2_ball = ball(0.53, 0, 0.24, 0.015, 0, 0, 0); //右眼珠2

	//  Load shaders and initialize attribute buffers
	//
	var program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	// array element buffer

	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

	// color array atrribute buffer

	var cBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);

	// vertex array attribute buffer
	var vBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	thetaLoc = gl.getUniformLocation(program, "theta");
	anivationLoc = gl.getUniformLocation(program, "anivation");
	scaleLoc = gl.getUniformLocation(program, "scale");
	zoomLoc = gl.getUniformLocation(program, "uzoom");

	//event listeners for buttons

	document.getElementById("xButton").onclick = function() {
		axis = xAxis;
		anivation.x = 0;
	};
	document.getElementById("yButton").onclick = function() {
		axis = yAxis;
		anivation.x = 1;
	};
	document.getElementById("zButton").onclick = function() {
		axis = zAxis;
		anivation.x = 2;
	};
	document.getElementById("lButton").onclick = function() {
		anivation.x = 3;
	};
	document.getElementById("rButton").onclick = function() {
		anivation.x = 4;
	};
	document.getElementById("zoomButton").onclick = function() {
		anivation.x = 5;
	};
	document.getElementById("stopButton").onclick = function() {
		stop();
	};

	render();
};

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	if (anivation.x == 0 || anivation.x == 1 || anivation.x == 2) {
		theta[axis] += 2.0;
		gl.uniform3fv(thetaLoc, theta);

	}

	if (anivation.x == 4) {
		scale[0] += 0.01;
		gl.uniform3fv(scaleLoc, scale);
	}
	if (anivation.x == 3) {
		scale[0] -= 0.01;
		gl.uniform3fv(scaleLoc, scale);
	}
	if (anivation.x == 5) {
		zoom[0]*=0.95;
		gl.uniform1fv(zoomLoc,flatten(zoom) );
			}

	gl.uniform3fv(anivationLoc, anivation);
	//画身体
	gl.drawElements(gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0);
	//画bird1身体外框线
	gl.drawArrays(gl.LINE_LOOP, 24, 4);
	gl.drawArrays(gl.LINE_LOOP, 28, 4);
	gl.drawArrays(gl.LINES, 32, 2);
	gl.drawArrays(gl.LINES, 34, 2);
	gl.drawArrays(gl.LINES, 36, 2);
	gl.drawArrays(gl.LINES, 38, 2);
	//画burd2身体外框线
	gl.drawArrays(gl.LINE_LOOP, 40, 4);
	gl.drawArrays(gl.LINE_LOOP, 44, 4);
	gl.drawArrays(gl.LINES, 48, 2);
	gl.drawArrays(gl.LINES, 50, 2);
	gl.drawArrays(gl.LINES, 52, 2);
	gl.drawArrays(gl.LINES, 54, 2);

	var Length = 72;
	Length = drawball(Length, left_eye1);
	Length = drawball(Length, right_eye1);
	Length = drawball(Length, left_eye2);
	Length = drawball(Length, right_eye2);
	Length = drawball(Length, left_eye1_ball);
	Length = drawball(Length, right_eye1_ball);
	Length = drawball(Length, left_eye2_ball);
	Length = drawball(Length, right_eye2_ball);
	gl.drawArrays(gl.TRIANGLE_FAN, Length, right_eye2_ball);
	id = requestAnimFrame(render);
	    gl.drawArrays(gl.TRIANGLE_FAN, 56, 4);
gl.drawArrays(gl.TRIANGLE_FAN, 60, 4);
gl.drawArrays(gl.TRIANGLE_FAN, 64, 4);
gl.drawArrays(gl.TRIANGLE_FAN, 68, 4);
}

//消除动画
function stop() {
	if (id !== null) {
		cancelAnimationFrame(id);
		id = null;
	}
}

//得到球
function ball(x, y, z, r, color1, color2, color3) {
	var _x = 0;
	var _y = 0;
	var _z = 0;
	var length1 = 0;
	for (var i = 89; i > -89; i--) {
		if (i == 89) {
			vertices.push(vec3(x, y, z + r));
			vertexColors.push(vec4(color1 / 255, color2 / 255, color3 / 255, 1));
			for (var j = 0; j <= 360; j++) {
				_x = x + r * Math.sin(Math.PI / 180 * j) * Math.cos(i / 180 * Math.PI);
				_y = y + r * Math.cos(Math.PI / 180 * j) * Math.cos(Math.PI / 180 * i);
				_z = z + r * Math.sin(Math.PI / 180 * i);
				vertices.push(vec3(_x, _y, _z));
				vertexColors.push(vec4(color1 / 255, color2 / 255, color3 / 255, 1));
			}
		}
		for (var j = 0; j <= 360; j++) {
			length1 += 2;
			_x = x + r * Math.sin(Math.PI / 180 * j) * Math.cos(Math.PI / 180 * i);
			_y = y + r * Math.cos(Math.PI / 180 * j) * Math.cos(Math.PI / 180 * i);
			_z = z + r * Math.sin(Math.PI / 180 * i);
			vertices.push(vec3(_x, _y, _z));
			vertexColors.push(vec4(color1 / 255, color2 / 255, color3 / 255, 1));
			_x = x + r * Math.sin(Math.PI / 180 * j) * Math.cos(Math.PI / 180 * (i - 1));
			_y = y + r * Math.cos(Math.PI / 180 * j) * Math.cos(Math.PI / 180 * (i - 1));
			_z = z + r * Math.sin(Math.PI / 180 * (i - 1));
			vertices.push(vec3(_x, _y, _z));
			vertexColors.push(vec4(color1 / 255, color2 / 255, color3 / 255, 1));
		}
		if (i == -88) {
			vertices.push(vec3(x, y, z - r));
			vertexColors.push(vec4(color1 / 255, color2 / 255, color3 / 255, 1));
			for (var j = 0; j <= 360; j++) {
				_x = x + r * Math.sin(Math.PI / 180 * j) * Math.cos(Math.PI / 180 * (i + 1));
				_y = y + r * Math.cos(Math.PI / 180 * j) * Math.cos(Math.PI / 180 * (i + 1));
				_z = z + r * Math.sin(Math.PI / 180 * (i - 1));
				vertices.push(vec3(_x, _y, _z));
				vertexColors.push(vec4(color1 / 255, color2 / 255, color3 / 255, 1));
			}
		}
	}
	return length1;
}


//画球
function drawball(m, length) {
	gl.drawArrays(gl.TRIANGLE_FAN, m, 362);
	gl.drawArrays(gl.TRIANGLE_STRIP, m + 362, length);
	gl.drawArrays(gl.TRIANGLE_FAN, m + 362 + length, 362);

	return length + m + 362 + 362;
}