precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColour;
varying vec3 fColour;
uniform float theta;

void main() {
  fColour = vColour;
  
  mat4 rotasi = mat4(
      cos(-theta) , -sin(-theta)  , 0, 0.5*cos(-theta)-0.5,
      sin(-theta) , cos(-theta)   , 0, 0.5*sin(-theta),
      0           , 0             , 1, 0,
      0           , 0             , 0, 1
  );
  gl_Position = vec4(vPosition, 0.0, 1.0) * rotasi;

}
