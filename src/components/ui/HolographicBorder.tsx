'use client';

import React, { useEffect, useRef } from 'react';

interface HolographicBorderProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
}

export const HolographicBorder: React.FC<HolographicBorderProps> = ({
  children,
  className = '',
  borderRadius = '1rem',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform float uHovered;
      uniform vec2 uMouse;
      uniform vec2 uResolution;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 a0 = x - floor(h + 0.5);
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        vec2 uv = vUv;
        float time = uTime * 0.1 * uHovered;
        
        float fineNoise = snoise(uv * 15.0);
        float noiseVal = snoise(uv * 1.5 + vec2(0.0, time));
        
        float dist = distance(uv, uMouse);
        
        float phase = (noiseVal * 0.2 + 0.8) * 3.0;
        phase += (1.0 - dist) * 2.0;
        phase += fineNoise * 0.15;
        
        vec3 col = palette(
          phase,
          vec3(0.6),
          vec3(0.25),
          vec3(1.0),
          vec3(0.0, 0.33, 0.67)
        );
        
        float highlight = smoothstep(0.48, 0.5, abs(fineNoise - sin(time * 2.0)));
        highlight *= 0.15 * uHovered;
        col += highlight;
        
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posAttrib = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    const timeUniform = gl.getUniformLocation(program, 'uTime');
    const mouseUniform = gl.getUniformLocation(program, 'uMouse');
    const resUniform = gl.getUniformLocation(program, 'uResolution');
    const hoveredUniform = gl.getUniformLocation(program, 'uHovered');

    let animationFrameId: number;
    const render = (time: number) => {
      gl.uniform1f(timeUniform, time * 0.001);
      gl.uniform2f(mouseUniform, mouseRef.current.x, 1.0 - mouseRef.current.y);
      gl.uniform2f(resUniform, canvas.width, canvas.height);
      gl.uniform1f(hoveredUniform, isHoveredRef.current ? 1.0 : 0.0);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();
    render(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      className={`relative group p-[10px] overflow-hidden ${className}`}
      style={{ borderRadius }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ borderRadius }}
      />
      <div 
        className="relative bg-gray-900/90 h-full w-full z-10 overflow-hidden"
        style={{ borderRadius: `calc(${borderRadius} - 10px)` }}
      >
        {children}
      </div>
    </div>
  );
};
