(function (global) {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    // Inisialisasi shaders dan program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShaderCube = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShaderCube = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);

    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    var programCube = glUtils.createProgram(gl, vertexShaderCube, fragmentShaderCube);

    //For Triangles
    var thetaLoc = gl.getUniformLocation(program, 'theta'); 
    var transLoc = gl.getUniformLocation(program, 'vec');
    var sizeLoc = gl.getUniformLocation(program, 'size');
    var size = 0.3;
    var thetaT = [20, 60, 0];
    var vec = [0, 0, 0];
    var vecX = 0.0036;
    var vecY = 0.0076;
    var vecZ = 0.06;
    var adder = 0.76;
  
    //For Cube
    var thetaLocCube = gl.getUniformLocation(programCube, 'theta');
    var thetaCube = [20, 60, 0];

    function cube(){
      gl.useProgram(programCube);

      // Definisi verteks dan buffer

      // Missing Lines : AD, DC, EF, DH
      var cubeVertices = [
        // x, y, z             r, g, b

        //ABCD
        -0.5, -0.5, 0.5,    1.0, 0.0, 0.0,    //A
        -0.5, 0.5, 0.5,     1.0, 0.0, 0.0,    //B
        -0.5, 0.5, 0.5,     1.0, 0.0, 0.0,    //B
        0.5, 0.5, 0.5,      1.0, 0.0, 0.0,    //C
        0.5, 0.5, 0.5,      1.0, 0.0, 0.0,    //C
        0.5, -0.5, 0.5,     1.0, 0.0, 0.0,    //D
        0.5, -0.5, 0.5,     1.0, 0.0, 0.0,    //D
        -0.5, -0.5, 0.5,    1.0, 0.0, 0.0,    //A
        
        //DCGH
        0.5, 0.5, 0.5,      1.0, 0.0, 0.0,    //C
        0.5, 0.5, -0.5,     1.0, 0.0, 0.0,    //G
        0.5, -0.5, 0.5,     1.0, 0.0, 0.0,    //D
        0.5, -0.5, -0.5,    1.0, 0.0, 0.0,    //H

        //ABFE
        -0.5, -0.5, 0.5,    1.0, 0.0, 0.0,    //A
        -0.5, -0.5, -0.5,   1.0, 0.0, 0.0,    //E
        -0.5, 0.5, 0.5,     1.0, 0.0, 0.0,    //B
        -0.5, 0.5, -0.5,    1.0, 0.0, 0.0,    //F

        //EFGH
        -0.5, -0.5, -0.5,   1.0, 0.0, 0.0,    //E
        -0.5, 0.5, -0.5,    1.0, 0.0, 0.0,    //F
        -0.5, 0.5, -0.5,    1.0, 0.0, 0.0,    //F
        0.5, 0.5, -0.5,     1.0, 0.0, 0.0,    //G
        0.5, 0.5, -0.5,     1.0, 0.0, 0.0,    //G
        0.5, -0.5, -0.5,    1.0, 0.0, 0.0,    //H
        0.5, -0.5, -0.5,    1.0, 0.0, 0.0,    //H
        -0.5, -0.5, -0.5,   1.0, 0.0, 0.0,    //E

      ];

      var cubeVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(programCube, 'vPosition');
      var vColor = gl.getAttribLocation(programCube, 'vColor');
      gl.vertexAttribPointer(
        vPosition, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
      gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
        6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);

      gl.uniform3fv(thetaLocCube, thetaCube);
    }

    function triangle(){
      gl.useProgram(program);

      // Definisi vertex and buffer
      var triangleVertices = [
        //x,y         r,g,b
        0.25, -0.5,   0.5,0,0,
        0.45, -0.5,   0.5,0,0,
        0.25, 0.5,    0.5,0,0,
        0.45, -0.5,   0.5,0,0,
        0.25, 0.5,    0.5,0,0,
        0.45, 0.5,    0.5,0,0,
        0.45, 0.5,    0.5,0,0,
        0.75, 0.5,    0.5,0,0,
        0.45, 0.4,    0.5,0,0,
        0.45, 0.4,    0.5,0,0,
        0.75, 0.4,    0.5,0,0,
        0.75, 0.5,    0.5,0,0,
        0.75, 0.4,    0.5,0,0,
        0.75, 0.0,    0.5,0,0,
        0.65, 0.4,    0.5,0,0,
        0.65, 0.4,    0.5,0,0,
        0.65, 0.0,    0.5,0,0,
        0.75, 0.0,    0.5,0,0,
        0.65, 0.0,    0.5,0,0,
        0.45, 0.0,    0.5,0,0,
        0.45, 0.1,    0.5,0,0,
        0.45, 0.1,    0.5,0,0,
        0.65, 0.1,    0.5,0,0,
        0.65, 0.0,    0.5,0,0,
      ];

      var triangleVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');

      gl.vertexAttribPointer(
        vPosition, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0
      );
      gl.vertexAttribPointer(
        vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT
      );

      gl.uniform1f(sizeLoc, size);

      //Hit the Wall

      if(vec[0] > 0.5*(1-size) || vec[0] < -0.5*(1-size) ){
        vecX = vecX * -1;
      }
      vec[0] += vecX;

      if(vec[1] > 0.5*(1-size) || vec[1] < -0.5*(1-size) ){
        vecY = vecY * -1;
      }
      vec[1] += vecY;

      if(vec[2] > 0.5*(1-size) || vec[2] < -0.5*(1-size) ){
        vecZ = vecZ * -1;
      }
      vec[2] += vecZ;

      gl.uniform3fv(transLoc, vec);

      thetaT[1] += ( adder * 3 );

      gl.uniform3fv(thetaLoc, thetaT);
    }

    function render() {
      // Bersihkan layar jadi hitam
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
      
      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      
      triangle();
      gl.drawArrays(gl.TRIANGLES, 0, 24);

      cube();
      gl.drawArrays(gl.LINES, 0, 24);

      requestAnimationFrame(render);
    }
    
    render();
  }
})(window || this);