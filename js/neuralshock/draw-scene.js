

function drawScene(gl, programInfo, buffers, squareRotation, vars) {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = ( 45 * Math.PI ) / 180;
    const aspect      = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear       = 0.1;
    const zFar        = 100.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    const modelViewMatrix = mat4.create();

    mat4.translate(
        modelViewMatrix,
        modelViewMatrix,
        [ -0.0, 0.0, -6.0 ]
    );
    mat4.rotate(
        modelViewMatrix,
        modelViewMatrix,
        squareRotation,
        [ 0, 0, 1 ],
    );

    setPositionAttribute(gl, buffers, programInfo);
    setColorAttribute(gl, buffers, programInfo);

    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix,
    );
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix,
    );

    {
        for (var j=0;j<vars.numSpirals;j++) {
            gl.drawArrays(gl.LINE_STRIP, vars.numPoints*j, vars.numPoints)
        }
        //const vertexCount = 4;      // This needs to be attached to the triangel strip as a whole.
        //gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
}


function setPositionAttribute(gl, buffers, programInfo) {
    const numComponents = 2;
    const type          = gl.FLOAT;
    const normalize     = false;
    const stride        = 0;
    const offset        = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);

    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset,
    );

    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

function setColorAttribute(gl, buffers, programInfo) {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset, );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

export { drawScene }


