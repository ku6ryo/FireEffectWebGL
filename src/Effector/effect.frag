precision mediump float;

uniform sampler2D u_imageTarget;
uniform sampler2D u_imageMask;
uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_texCoord;
float PI = 3.14159265358979323846264;
float E = 2.71828182845904523536028;

void main() {
  float grad = 1. / (1. + pow(E, (0.9 - v_texCoord.y) * 8.));

  vec2 dUV = vec2(v_texCoord.x, v_texCoord.y);
  vec4 displacement = texture2D(u_imageMask, dUV);
  float d = (1. - displacement.r) * grad;
  float theta = d * 2. * PI;

  vec2 direction = vec2(cos(theta), sin(theta));
  vec2 uv = v_texCoord + direction * d * 0.1;

  vec4 c = texture2D(u_imageTarget, uv);
  gl_FragColor = vec4(c.r * (1. + direction.x * d), c.g * (1. + direction.y * d), c.b, 1.0);
}