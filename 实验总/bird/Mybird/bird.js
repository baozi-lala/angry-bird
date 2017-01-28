var canvas;
var gl;
var program;
var numVertices = 48;
var normalsArray = [];
var convertion = [];
var convertionbird1;
var convertionbird2;
var convertionlight;//0
var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var normalMatrix, normalMatrixLoc;
var axis = 0;
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var flag = true;

var animal = "0"; //标志量，=0，表示选择小鸟1，=1表示选择小鸟2
//光源参数
var xlight=0.0,ylight=0.0,zlight=0.0;
var x=0,y=0,z=0;
var X_materialAmbient=0.5;
var X_materialDiffuse=0.5;
//旋转比例
var theta = [0, 0, 0];
var theta1 = [0, 0, 0];
var thetaLoc;
var theta2=0.3*Math.PI;
//µÚÈý¸öÕý·½Ìå×Ô¼ºÐý×ª
var theta3=0;
//平移比例
var scale = [0];
var scale1 = [0];
var scaleLoc;

//放缩比例
var zoom = [1];
var zoom1 = [1];
var zoomLoc;

//两个对象的平移量
var move=[0.0];//表示第一个对象保持不动
var move1 = [0.8];//表示将第一个对象向右平移0.8得到第二个对象
var moveLoc;

var id = 0;

var left_eye1;
var right_eye1;
var left_eye1_ball;
var right_eye1_ball;
//0
//光源的位置；漫反射分量，镜面反射分量，环境光分量
var lightPosition ;//= vec4(xlight,ylight,zlight,1.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
//反射系数
var materialAmbient;//= vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse;// = vec4( 1.0, 0.8, 0.0, 1.0);
var materialSpecular;// = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialShininess;// = 10000.0;//高光系数

var ctm;
//单个光源的参数
var ambientColor, diffuseColor, specularColor;
var modelView, projection;
var viewerPos;
//1
//光源的位置；漫反射分量，镜面反射分量，环境光分量
var lightPosition1= vec4(-0.1, 0.7, 0.5, 0.0 );
var lightAmbient1 = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse1 = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular1 = vec4( 1.0, 1.0, 1.0, 1.0 );
//反射系数
// var materialAmbient1= vec4( 1.0, 1.0, 1.0, 1.0 );
// var materialDiffuse1 = vec4( 0.5, 0.8, 0.0, 1.0);
// var materialSpecular1 = vec4( 0.5, 0.8, 0.0, 1.0 );
// var materialShininess1 = 10000.0;//高光系数

var ctm1;
//单个光源的参数
var ambientColor1, diffuseColor1, specularColor1;
//var modelView1, projection1;
var viewerPos1;
var vertices = [
	//bird1身体
	vec4(-0.6, -0.2, 0.2, 1), //0
	vec4(-0.6, 0.2, 0.2, 1), //1
	vec4(-0.2, 0.2, 0.2, 1), //2
	vec4(-0.2, -0.2, 0.2, 1), //3
	vec4(-0.6, -0.2, -0.2, 1), //4
	vec4(-0.6, 0.2, -0.2, 1), //5
	vec4(-0.2, 0.2, -0.2, 1), //6
	vec4(-0.2, -0.2, -0.2, 1), //7
	//bird1嘴巴
	vec4(-0.47, -0.1, 0.2, 1),
	vec4(-0.33, -0.1, 0.2, 1),
	vec4(-0.4, 0.0, 0.2, 1),
	vec4(-0.4, -0.1, 0.4, 1),

	//bird1边框
	vec4(-0.6, -0.2, 0.2, 1),
	vec4(-0.6, 0.2, 0.2, 1),
	vec4(-0.2, 0.2, 0.2, 1),
	vec4(-0.2, -0.2, 0.2, 1),
	vec4(-0.6, -0.2, -0.2, 1),
	vec4(-0.6, 0.2, -0.2, 1),
	vec4(-0.2, 0.2, -0.2, 1),
	vec4(-0.2, -0.2, -0.2, 1),

	vec4(-0.6, -0.2, 0.2, 1),
	vec4(-0.6, -0.2, -0.2, 1),
	vec4(-0.6, 0.2, 0.2, 1),
	vec4(-0.6, 0.2, -0.2, 1),
	vec4(-0.2, 0.2, 0.2, 1),
	vec4(-0.2, 0.2, -0.2, 1),
	vec4(-0.2, -0.2, 0.2, 1),
	vec4(-0.2, -0.2, -0.2, 1),

	//眉毛
	vec4(-0.58, 0.134, 0.201, 1),
	vec4(-0.58, 0.082, 0.201, 1),
	vec4(-0.431, 0.051, 0.201, 1),
	vec4(-0.434, 0.074, 0.201, 1),

	vec4(-0.22, 0.134, 0.201, 1),
	vec4(-0.22, 0.082, 0.201, 1),
	vec4(-0.369, 0.051, 0.201, 1),
	vec4(-0.365, 0.074, 0.201, 1),//35
		//光源
vec4(-0.1, 0.7, 0.5,1.0),


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

	//眉毛
	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),

	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),
	//光源
	vec4(1.0, 0.0, 0.0, 1.0),
	
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
	8, 9, 11
];
//视景体
const left = -1;
const right = 1;
const bottom = -1;
const to = 1;
var near = 0.1;
var far = 3;
var fovy = 45.0;
var aspect = 1;
var perstype = 1;
var dr = Math.PI / 180.0;
var th = dr * 90;
var ph = dr * 90;

//lookat
var eye = vec3(0, 0, 2);
var at = vec3(0, 0, 0);
var up = vec3(0, 1, 0);

//以下两个函数是为了得到使用索引绘制部分的法向量
function triangle(a, b, c) {

	var t1 = subtract(vertices[b], vertices[a]);
	var t2 = subtract(vertices[c], vertices[a]);
	var normal = normalize(cross(t2, t1));
	normal = vec4(normal);
	normal[3] = 0.0;

	normalsArray.push(normal);
	normalsArray.push(normal);
	normalsArray.push(normal);

}

function colorCube() {
	//
	triangle(1, 0, 3);
	triangle(3, 2, 1);
	triangle(2, 3, 7);
	triangle(7, 6, 2);
	triangle(3, 0, 4);
	triangle(4, 7, 3);
	triangle(6, 5, 1);
	triangle(1, 2, 6);
	triangle(4, 5, 6);
	triangle(6, 7, 4);
	triangle(5, 4, 0);
	triangle(0, 1, 5);
	triangle(8, 10, 9);
	triangle(8, 10, 11);
	triangle(9, 10, 11);
	triangle(8, 9, 11);
	
}


window.onload = function init() {
	canvas = document.getElementById("gl-canvas");

	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {
		alert("WebGL isn't available");
	}

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1.0, 1.0, 1.0, 1.0);

	gl.enable(gl.DEPTH_TEST);
	//push移动的光源点和颜色
vertices.push(vec4(xlight, ylight, zlight,1.0));
vertexColors.push(vec4(1.0, 0.0, 0.0, 1.0));
	//算出绘制每个球所需要的点的个数
	// left_eye1 = ball(-0.50, 0, 0.21, 0.04, 255, 255, 255); //左眼1
	// right_eye1 = ball(-0.30, 0, 0.21, 0.04, 255, 255, 255); //右眼1	
	// left_eye1_ball = ball(-0.47, 0, 0.24, 0.015, 0, 0, 0); //左眼珠1
	// right_eye1_ball = ball(-0.27, 0, 0.24, 0.015, 0, 0, 0); //右眼珠1

	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	colorCube();//加法向量的

	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);
	//normalArray
	var nBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

	var vNormal = gl.getAttribLocation(program, "vNormal");
	gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vNormal);

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
	gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	// thetaLoc = gl.getUniformLocation(program, "theta");
	// scaleLoc = gl.getUniformLocation(program, "scale");
	// zoomLoc = gl.getUniformLocation(program, "uzoom");
	// moveLoc = gl.getUniformLocation(program, "move");
	projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");
	modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
	
	normalMatrixLoc = gl.getUniformLocation(program, "normalMatrix");
	//event listeners for buttons
	//0
	 convertion=gl.getUniformLocation(program,"convertion");
	//1
  
  
	//对象切换
	window.addEventListener("keydown", function() {
		switch (event.keyCode) {
			case 32://空格键切换(32是空格键对应的ACSII码)
				if (animal == "0") {
					animal = "1";
				} else {
					animal = "0";
				}
				break;
		}
	});
	convertionbird1=mat4( 1.0,  0.0,  0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0 );

    convertionbied2=mat4( 1.0,  0.0,  0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0, 0.0, 0.0, 1.0 );
	//光源
 convertionlight=mat4( 1.0,  0.0,  0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0 );
	getId();//按钮控件响应
	
	//convertionbird1=mult(convertionbird1,scalem(0.1,0.1,0.01));
	var t=mat4( 1.0,  0.0,  0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.8, 0.0, 0.0, 1.0 );
	convertionbird2=mult(convertionbird1,t);
	//convertionbird1=mult(convertionbird1,translate(0.2,0,0));
var t1=mat4( 1.0,  0.0,  0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        xlight,ylight,zlight, 1.0 );

	convertionlight=mult(convertionlight,t1);
	render();//绘制函数
};

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	modelViewMatrix = lookAt(eye, at, up);
	if (perstype) {
		projectionMatrix = ortho(left, right, bottom, to, near, far);
	} else {
		projectionMatrix = perspective(fovy, aspect, near, far);
	}

	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix) );
   lightPosition=vec4(xlight,ylight,zlight,0.0);
	//gl.uniformMatrix4fv(zoomLoc,false,flatten(convertionlight));
   gl.uniform4fv( gl.getUniformLocation(program,
		"lightPosition"),flatten(lightPosition) );
    
	
	//传递数据绘制第一个对象
	material1();
gl.uniformMatrix4fv( convertion,false,flatten(convertionbird1));
	draw();
	//光源
  // gl.drawArrays(gl.POINTS,36, 1);
    gl.uniformMatrix4fv(convertion,false,flatten(convertionlight));
   gl.drawArrays(gl.POINTS,37,1);
	//传递数据绘制第二个对象
	material2();
	gl.uniformMatrix4fv( convertion,false,flatten(convertionbird2));
	draw();
	window.requestAnimFrame(render);
}

function getId() {
	
	var t1;
	document.getElementById("buttonlightx").onclick=function(){
        xlight+=0.1;
        t1=mat4( 1.0,  0.0,  0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.1, 0,0, 1.0 );
        convertionlight = mult(convertionlight, t1);
    };
   
    document.getElementById("buttonlightxf").onclick=function(){
    	t1=mat4( 1.0,  0.0,  0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        -0.1, 0,0, 1.0 );
        convertionlight = mult(convertionlight, t1);
        xlight-=0.1;
    };
    document.getElementById("buttonlighty").onclick=function(){
        ylight+=0.1;
        t1=mat4( 1.0,  0.0,  0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0,0.1,0, 1.0 );
        convertionlight = mult(convertionlight, t1);
    };
    document.getElementById("buttonlightyf").onclick=function(){
        t1=mat4( 1.0,  0.0,  0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0,-0.1,0, 1.0 );
        convertionlight = mult(convertionlight, t1);
        ylight-=0.1;
    };
     document.getElementById("buttonlightz").onclick=function(){
        t1=mat4( 1.0,  0.0,  0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0,0,0.1, 1.0 );
        convertionlight = mult(convertionlight, t1);
        zlight+=0.1;
    };
    document.getElementById("buttonlightzf").onclick=function(){
        t1=mat4( 1.0,  0.0,  0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0,0,-0.1, 1.0 );
        convertionlight = mult(convertionlight, t1);
        zlight-=0.1;
    };
    
	
	
	//event listeners for buttons
	document.getElementById("topScreen").onclick = function() {
		eye = vec3(0, 2, 0);
		up = vec3(0, 0, 0.1);

	}
	document.getElementById("bottomScreen").onclick = function() {
		eye = vec3(0, -2, 0);
		up = vec3(0, 0, 0.1);

	}
	document.getElementById("leftScreen").onclick = function() {
		eye = vec3(-2, 0, 0);
		up = vec3(0, 0.1, 0);

	}
	document.getElementById("rightScreen").onclick = function() {
		eye = vec3(2, 0, 0);
		up = vec3(0, 0.1, 0);

	}
	document.getElementById("nearScreen").onclick = function() {
		eye = vec3(0, 0, 2);
		up = vec3(0, 0.1, 0);

	}
	document.getElementById("farScreen").onclick = function() {
		eye = vec3(0, 0, -2);
		up = vec3(0, 0.1, 0);

	}

	document.getElementById("xButton").onclick = function() {
		axis = xAxis;
		// if (animal == "0") {
		// 	theta[axis] += 2.0;
		// }
		// if (animal == "1") {
		// 	theta1[axis] += 2.0;
		// }
		 if(animal == "0"){
            convertionbird1 = mult(convertionbird1, rotate(theta2, [2, 0, 0]));
        }else{
            convertionbird2 = mult(convertionbird2, rotate(theta2, [2, 0, 0]));
        }
	};
	document.getElementById("yButton").onclick = function() {
		axis = yAxis;
	 if(animal == "0"){
            convertionbird1 = mult(convertionbird1, rotate(theta2, [0, 2, 0]));
        }else{
            convertionbird2 = mult(convertionbird2, rotate(theta2, [0, 2, 0]));
        }
	};
	document.getElementById("zButton").onclick = function() {
		axis = zAxis;
		 if(animal == "0"){
            convertionbird1 = mult(convertionbird1, rotate(theta2, [0, 0, 3]));
        }else{
            convertionbird2 = mult(convertionbird2, rotate(theta2, [0, 0, 3]));
        }
	};
	document.getElementById("lButton").onclick = function() {
		var t1=mat4( 1.0,  0.0,  0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        -0.1, 0.0, 0.0, 1.0 );
       
		 if(animal == "0"){
            convertionbird1 = mult(convertionbird1,t1);
        }else{
            convertionbird2 = mult(convertionbird2,t1);
        }
	};
	document.getElementById("rButton").onclick = function() {
		 var t2=mat4( 1.0,  0.0,  0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.1, 0.0, 0.0, 1.0 );
		 if(animal == "0"){
            convertionbird1 = mult(convertionbird1, t2);
        }else{
            convertionbird2 = mult(convertionbird2, t2);
        }
	};
	document.getElementById("zoomButton1").onclick = function() {
		if(animal == "0"){
            convertionbird1 = mult(convertionbird1, scalem(1.1,1.1,1.1));
        }else{
            convertionbird2 = mult(convertionbird2, scalem(1.1,1.1,1.1));
        }
	};
	document.getElementById("zoomButton2").onclick = function() {
		if(animal == "0"){
            convertionbird1 = mult(convertionbird1, scalem(0.9,0.9,0.9));
        }else{
            convertionbird2 = mult(convertionbird2, scalem(0.9,0.9,0.9));
        }
	};
	document.getElementById("stopButton").onclick = function() {
		flag = !flag;

	};

	document.getElementById("perspective").onclick = function() {
		perstype = 0;
	}
	document.getElementById("ortho").onclick = function() {
		perstype = 1;
	}
	document.getElementById("fovy").change = function() {
		fovy = this.value;
	}
	document.getElementById("distance").change = function() {
		near = 0.03 * this.value;
	}
	document.getElementById("theta").change = function() {
		th = this.value * dr;
		eye = vec4(2 * Math.sin(ph), 2 * Math.sin(th),
			2 * Math.cos(th));
	}
	document.getElementById("phi").change = function() {
		ph = this.value * dr;
		eye = vec4(2 * Math.sin(ph), 2 * Math.sin(th),
			2 * Math.cos(ph));
	}
}

function draw() {
	if (flag) {
		document.getElementById("stopButton").innerHTML = "暂停";
	} else {
		document.getElementById("stopButton").innerHTML = "继续";
	}

	//画身体
	gl.drawElements(gl.TRIANGLES, 48, gl.UNSIGNED_BYTE, 0);
	//画bird1身体外框线
	gl.drawArrays(gl.LINE_LOOP, 12, 4);
	gl.drawArrays(gl.LINE_LOOP, 16, 4);
	gl.drawArrays(gl.LINES, 20, 2);
	gl.drawArrays(gl.LINES, 22, 2);
	gl.drawArrays(gl.LINES, 24, 2);
	gl.drawArrays(gl.LINES, 26, 2);
	//画眉毛
	gl.drawArrays(gl.TRIANGLE_FAN, 28, 4);
	gl.drawArrays(gl.TRIANGLE_FAN, 32, 4);

	// var Length = 36;
	// Length = drawball(Length, left_eye1);
	// Length = drawball(Length, right_eye1);
	// Length = drawball(Length, left_eye1_ball);
	// Length = drawball(Length, right_eye1_ball);
	//gl.drawArrays(gl.TRIANGLE_FAN, Length, right_eye1_ball);
}

//得到球
function ball(x, y, z, r, color1, color2, color3) {
	var _x = 0;
	var _y = 0;
	var _z = 0;
	var length1 = 0;
	for (var i = 89; i > -89; i--) {
		if (i == 89) {
			vertices.push(vec4(x, y, z + r, 1));
			vertexColors.push(vec4(color1 / 255, color2 / 255, color3 / 255, 1));
			//法向量
			var t1 = subtract(vec3(x, y, z), vec3(x, y, z + r));
			var normal = normalize(t1);
			normal = vec4(normal);
			normal[3] = 0;
			normalsArray.push(normal);

			for (var j = 0; j <= 360; j++) {
				_x = x + r * Math.sin(Math.PI / 180 * j) * Math.cos(i / 180 * Math.PI);
				_y = y + r * Math.cos(Math.PI / 180 * j) * Math.cos(Math.PI / 180 * i);
				_z = z + r * Math.sin(Math.PI / 180 * i);
				vertices.push(vec4(_x, _y, _z, 1));
				vertexColors.push(vec4(color1 / 255, color2 / 255, color3 / 255, 1));
				//法向量
				var t1 = subtract(vec3(x, y, z), vec3(_x, _y, _z));
				var normal = normalize(t1);
				normal = vec4(normal);
				normal[3] = 0;
				normalsArray.push(normal);

			}
		}
		for (var j = 0; j <= 360; j++) {
			length1 += 2;
			_x = x + r * Math.sin(Math.PI / 180 * j) * Math.cos(Math.PI / 180 * i);
			_y = y + r * Math.cos(Math.PI / 180 * j) * Math.cos(Math.PI / 180 * i);
			_z = z + r * Math.sin(Math.PI / 180 * i);
			vertices.push(vec4(_x, _y, _z, 1));
			vertexColors.push(vec4(color1 / 255, color2 / 255, color3 / 255, 1));
			//法向量
			var t1 = subtract(vec3(x, y, z), vec3(_x, _y, _z));
			var normal = normalize(t1);
			normal = vec4(normal);
			normal[3] = 0;
			normalsArray.push(normal);

			_x = x + r * Math.sin(Math.PI / 180 * j) * Math.cos(Math.PI / 180 * (i - 1));
			_y = y + r * Math.cos(Math.PI / 180 * j) * Math.cos(Math.PI / 180 * (i - 1));
			_z = z + r * Math.sin(Math.PI / 180 * (i - 1));
			vertices.push(vec4(_x, _y, _z, 1));
			vertexColors.push(vec4(color1 / 255, color2 / 255, color3 / 255, 1));
			//法向量
			var t1 = subtract(vec3(x, y, z), vec3(_x, _y, _z));
			var normal = normalize(t1);
			normal = vec4(normal);
			normal[3] = 0;
			normalsArray.push(normal);

		}
		if (i == -88) {
			vertices.push(vec4(x, y, z - r, 1));
			vertexColors.push(vec4(color1 / 255, color2 / 255, color3 / 255, 1));
			//法向量
			var t1 = subtract(vec3(x, y, z), vec3(x, y, z - r));
			var normal = normalize(t1);
			normal = vec4(normal);
			normal[3] = 0;
			normalsArray.push(normal);

			for (var j = 0; j <= 360; j++) {
				_x = x + r * Math.sin(Math.PI / 180 * j) * Math.cos(Math.PI / 180 * (i + 1));
				_y = y + r * Math.cos(Math.PI / 180 * j) * Math.cos(Math.PI / 180 * (i + 1));
				_z = z + r * Math.sin(Math.PI / 180 * (i - 1));
				vertices.push(vec4(_x, _y, _z, 1));
				vertexColors.push(vec4(color1 / 255, color2 / 255, color3 / 255, 1));
				//法向量
				var t1 = subtract(vec3(x, y, z), vec3(_x, _y, _z));
				var normal = normalize(t1);
				normal = vec4(normal);
				normal[3] = 0;
				normalsArray.push(normal);

			}
		}
	}
	return length1;
}
function material1(){
    materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
    materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0 );
    materialSpecular = vec4( 0.5, 0.8, 0.0, 1.0 );
    materialShininess = 200;
    //环境光反射分量的每个分量=环境光各个分量*材质反射属性各个分量
    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
    gl.uniform4fv( gl.getUniformLocation(program,
        "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
        "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
        "specularProduct"),flatten(specularProduct) );
    gl.uniform1f( gl.getUniformLocation(program,
        "shininess"),materialShininess );
var ambientProduct1 = mult(lightAmbient1, materialAmbient);
    var diffuseProduct1 = mult(lightDiffuse1, materialDiffuse);
    var specularProduct1 = mult(lightSpecular1, materialSpecular);
    
 gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct1"),
       flatten(ambientProduct1));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct1"),
       flatten(diffuseProduct1) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct1"),
       flatten(specularProduct1) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition1"),
       flatten(lightPosition1) );
     
}
function material2(){
    //ÂÌµÄ
    materialAmbient = vec4( 0.5, 0.5, 0.5, 1.0 );
    materialDiffuse = vec4( 0, 0.8, 1.0, 1.0 );
    materialSpecular = vec4( 0, 0.8, 1.0, 1.0 );
    materialShininess = 20;
    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
    gl.uniform4fv( gl.getUniformLocation(program,
        "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
        "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
        "specularProduct"),flatten(specularProduct) );
    gl.uniform1f( gl.getUniformLocation(program,
        "shininess"),materialShininess );
    var ambientProduct1 = mult(lightAmbient1, materialAmbient);
    var diffuseProduct1 = mult(lightDiffuse1, materialDiffuse);
    var specularProduct1 = mult(lightSpecular1, materialSpecular);
    
 gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct1"),
       flatten(ambientProduct1));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct1"),
       flatten(diffuseProduct1) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct1"),
       flatten(specularProduct1) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition1"),
       flatten(lightPosition1) );
     

}
//画球
function drawball(m, length) {
	gl.drawArrays(gl.TRIANGLE_FAN, m, 362);
	gl.drawArrays(gl.TRIANGLE_STRIP, m + 362, length);
	gl.drawArrays(gl.TRIANGLE_FAN, m + 362 + length, 362);

	return length + m + 362 + 362;
}
function ch() {
	document.getElementById("x-light").change = function () {
		xlight = this.value;
		conversitionlight = mult(convertionlight, translate(0.2,0,0));
	    x=xlight;
	}
	document.getElementById("y-light").change = function () {
		ylight = this.value;
		conversitionlight = mult(convertionlight, translate(0,ylight-y,0));
	    y=ylight;
	}
	document.getElementById("z-light").change = function () {
		zlight = this.value;
		conversitionlight = mult(convertionlight, translate(0,zlight-z,0));
	    z=zlight;
	}
	convertionlight=mult(convertionlight,scalem(0.01,0.01,0.01));
    convertionlight=mult(convertionlight,translate(xlight,ylight,zlight));
	lightPosition=vec4(xlight,ylight,zlight,0.0);
	//gl.uniformMatrix4fv(zoomLoc,false,flatten(convertionlight));
    gl.uniformMatrix4fv(convertion,false,flatten(convertionlight));
	document.getElementById("labelX").innerHTML = xlight;
	
	document.getElementById("labelY").innerHTML = ylight;
	
	document.getElementById("labelZ").innerHTML = zlight;
	
	document.getElementById("materialAmbient").change = function () {
		X_materialAmbient = this.value;
	}
	document.getElementById("materialDiffuse").change = function () {
		X_materialDiffuse = this.value;
	}
	
	materialAmbient = vec4( X_materialAmbient, 0.0, 1.0, 1.0 );
	materialDiffuse = vec4( X_materialDiffuse, 0.8, 0.0, 1.0);
	materialSpecular = vec4( X_materialDiffuse, 0.8, 0.0, 1.0);
//环境光反射分量的每个分量=环境光各个分量*材质反射属性各个分量
var ambientProduct = mult(lightAmbient, materialAmbient);
var diffuseProduct = mult(lightDiffuse, materialDiffuse);
var specularProduct = mult(lightSpecular, materialSpecular);
	// array element buffer

 gl.drawArrays(gl.POINTS,37,1);
	gl.uniform4fv( gl.getUniformLocation(program,
		"lightPosition"),flatten(lightPosition) );
	gl.uniform4fv( gl.getUniformLocation(program,
		"ambientProduct"),flatten(ambientProduct) );
	gl.uniform4fv( gl.getUniformLocation(program,
		"diffuseProduct"),flatten(diffuseProduct) );
	gl.uniform4fv( gl.getUniformLocation(program,
		"specularProduct"),flatten(specularProduct) );
}