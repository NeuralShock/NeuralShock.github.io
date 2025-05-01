

function initBuffers(gl) {
    const positionBuffer = initPositionBuffer(gl);
    const colorBuffer = initColorBuffer(gl);
    return {
        position: positionBuffer,
        color: colorBuffer,
    };
}

function initPositionBuffer(gl) {
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    let numPointsPerSpin=100;
    let numSpins=4;
    let numPoints= numSpins * numPointsPerSpin;

    var positions = Array() ;
    var x, y;
    var r=0.0, theta=0.0;
    var dtheta = (Math.PI*2) / numPointsPerSpin;
    for (var i=0;i<numPoints;i++) {
        r += dtheta*0.1;
        theta += dtheta;
        x = r*Math.sin(theta);
        y = r*Math.cos(theta)
        positions.push(x);
        positions.push(y);
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


    return positionBuffer;
}


function initColorBuffer(gl) {
    var colors = Array()
    var white = [ 1.0, 1.0, 1.0, 1.0 ];
    let numPointsPerSpin=100;
    let numSpins=4;
    let numPoints= numSpins * numPointsPerSpin;


    for (var i=0;i<numPoints;i++)
        colors.push.apply(colors, white);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return colorBuffer;
}

export { initBuffers };

