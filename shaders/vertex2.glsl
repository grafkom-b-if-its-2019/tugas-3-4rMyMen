precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColour;
varying vec3 fColour;
uniform float theta;
uniform float scale;

void main() {
  fColour = vColour;

  mat4 Skalasi = mat4(
      scale       , 0             , 0, -0.5*scale+0.5,
      0           , 1             , 0, 0,
      0           , 0             , 1, 0,
      0           , 0             , 0, 1
  );
  gl_Position = vec4(vPosition, 0.0, 1.0) * Skalasi;
}
