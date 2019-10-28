(function(global) {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas); 
    
    window.addEventListener('resize', resizer);

    // Inisialisasi shaders dan program
    console.log("\nVERTEX SOURCE CODE:\n" + glUtils.SL.Shaders.v1.vertex);
    console.log("\nFRAGMENT SOURCE CODE:\n" + glUtils.SL.Shaders.v1.fragment);
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
  
    gl.useProgram(program);
  
    resizer();

  function draw (){

    // Bersihkan layar jadi hitam
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Bersihkan buffernya canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    drawLine1();
    drawLine2();
    drawTriangle();
    drawHalfCircl1();
  
  }

  function drawLine1() {
    var n = initLineBuffers1();
    if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }
    gl.drawArrays(gl.LINE_LOOP, 0, n);
  }

  function initLineBuffers1() {
    var vertices = new Float32Array([

      -0.7, -0.5, -0.7, 0.5, 
      -0.63, 0.5, -0.58, 0.46, 
      -0.57, 0.44, -0.56, 0.42,
      -0.55, 0.4, -0.54, 0.38, 
      -0.53, 0.36, -0.52, 0.34,
      -0.51, 0.32, -0.505, 0.3,
      -0.5, 0.25, -0.505, 0.2, 
      -0.51, 0.18, -0.52, 0.16, 
      -0.53, 0.14, -0.54, 0.12,
      -0.55, 0.1, -0.56, 0.08, 
      -0.57, 0.06, -0.58, 0.04, 
      -0.63, 0.0, -0.63, -0.5

    ]);

    var n = 24;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, 'aPosition');
    if (aPosition < 0) {
      console.log('Failed to get the storage location of aPosition');
      return -1;
    }

    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(aPosition);

    return n;
  }

  function drawLine2() {
    var n = initLineBuffers();
    if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }
    gl.drawArrays(gl.LINE_STRIP, 0, n);
  }

  function drawLine2() {
    var n = initLineBuffers2();
    if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }
    gl.drawArrays(gl.LINE_LOOP, 0, n);
  }

  function initLineBuffers2() {
    var vertices = new Float32Array([

      -0.63, 0.4, -0.63, 0.1, 
      -0.55, 0.25

    ]);

    var n = 3;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, 'aPosition');
    if (aPosition < 0) {
      console.log('Failed to get the storage location of aPosition');
      return -1;
    }

    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(aPosition);

    return n;
  }

  function drawTriangle() {
    var n = initTriangleBuffers();
    if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }
    gl.drawArrays(gl.TRIANGLES, 0, n);
  }

  function initTriangleBuffers() {
    var vertices = new Float32Array([
      0.0, 0.2, 0.0, -0.5, -0.05, -0.5,
      -0.05, -0.5, -0.05, 0.2, 0.0, 0.2
    ]);
    var n = 6;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, 'aPosition');
    if (aPosition < 0) {
      console.log('Failed to get the storage location of aPosition');
      return -1;
    }

    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);
    return n;
  }

  function drawHalfCircl1() {
    
    var n = initBuffers4(gl);
    if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }
    
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
  }

  function initBuffers4() {
  
    var vertexBuffer = gl.createBuffer(),
        vertices = [],
        vertCount = 2;
    for (var i=0; i<=180; i+=1) {
    
      var j = i * Math.PI / 180;
   
      var vert1 = [
        Math.sin(j)*0.175,
        Math.cos(j)*0.175,
   
      ];
  
      var vert2 = [
        Math.sin(j)*0.135,
        Math.cos(j)*0.135,
      ];

      vertices = vertices.concat(vert1);
      vertices = vertices.concat(vert2);
    }
    var n = vertices.length / vertCount;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, vertCount, gl.FLOAT, false, 0, 0);

    return n;
  }

  function resizer() {
    var width = canvas.getAttribute("width"), height = canvas.getAttribute("height");
    // Fullscreen if not set
    if (!width || width < 0) {
      canvas.width = window.innerWidth;
      gl.maxWidth = window.innerWidth;
    }
    if (!height || height < 0) {
      canvas.height = window.innerHeight;
      gl.maxHeight = window.innerHeight;
    }
    var min = Math.min.apply( Math, [gl.maxWidth, gl.maxHeight, window.innerWidth, window.innerHeight]);
    canvas.width = min;
    canvas.height = min;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    draw();
  }
}

})(window || this);
