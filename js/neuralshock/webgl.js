var glVariables = {
    numPointsPerSpin: 100,
    numSpins: 9,
    numPoints: 400,
    numSpirals: 2,
    speed: 0.02
}


import { initBuffers } from "./init-buffers.js";
import { drawScene }   from "./draw-scene.js";

main();

function main() {    
    glVariables.numPoints=glVariables.numPointsPerSpin*glVariables.numSpins;
    let squareRotation = 0.0;
    let deltaTime = 0;

    const canvas=document.querySelector("#glcanvas");
    const gl=canvas.getContext("webgl");
    if (gl === null) {
        alert("Unable to create a gl canvas.  Browser may not support WebGL");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vsSource = `
        attribute vec4 aVertexPosition;
        attribute vec4 aVertexColor;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        varying lowp vec4 vColor;

        void main() {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
            vColor = aVertexColor;
        }
        `;

    const fsSource = `
        varying lowp vec4 vColor;

        void main() {
            gl_FragColor = vColor;
        }
        `;

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource, glVariables);

    const programInfo = {
            program: shaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
                vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(shaderProgram,"uProjectionMatrix"),
                modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
            },
        };
    const buffers = initBuffers(gl,glVariables);
    let then = 0;
    function render(now) {
        now *= glVariables.speed;
        deltaTime = now - then;
        then = now;
        drawScene(gl, programInfo, buffers, squareRotation, glVariables);
        squareRotation += deltaTime;
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}


function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader   = loadShader(gl, gl.VERTEX_SHADER,   vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(`Unable to initialize the shader Program ${gl.getProgramInfoLog(shaderProgram)}`);
        return null;
    }
    return shaderProgram;
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(`An error occurred compiling the shaders:  ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

