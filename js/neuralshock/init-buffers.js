

function initBuffers(gl,vars) {
    const positionBuffer = initPositionBuffer(gl,vars);
    const colorBuffer = initColorBuffer(gl,vars);
    return {
        position: positionBuffer,
        color: colorBuffer,
    };
}

function initPositionBuffer(gl,vars) {
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // let numPointsPerSpin=100;
    // let numSpins=4;
    // let numPoints= numSpins * numPointsPerSpin;

    var positions = Array() ;
    var x, y;
    var r=0.0, theta=0.0;
    var dtheta = (Math.PI*2) / vars.numPointsPerSpin;
    for (var j = 0; j < vars.numSpirals;j++) {
        theta = j*2.0*Math.PI/vars.numSpirals; // create an offset.
        r = 0;
        for (var i=0;i<vars.numPoints;i++) {
            r += dtheta*0.1;
            theta += dtheta;
            x = r*Math.sin(theta);
            y = r*Math.cos(theta)
            positions.push(x);
            positions.push(y);
        }
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


    return positionBuffer;
}


function initColorBuffer(gl,vars) {
    var colors = Array()
    var white = [ 1.0, 1.0, 1.0, 1.0 ];
    var blue = [ 0xAD/255.0, 0xD8/255.0, 0xE6/255.0, 1.0 ];
    var gold = [ 0xEF/255.0, 0xBF/255.0, 0x04/255.0, 1.0 ];


    for (var i=0;i<vars.numPoints;i++)
        colors.push.apply(colors, blue);

    for (var i=0;i<vars.numPoints;i++)
        colors.push.apply(colors, gold);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return colorBuffer;
}

export { initBuffers };

