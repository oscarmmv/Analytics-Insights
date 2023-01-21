var isPlaying = false;
var activeTimer = true;
var tempData;
var drawPlayback;
var drawDelay;
var ctx;
var ctx2;
var playbackTime = 0;
var playbackTimer;
var paused = false;

function playback(dataPoints) {





    isPlaying = true;
    playbackTimer = setInterval(function () {
        if (!paused) {
            playbackTime += 0.1;
        }
    }, 100);

    clearInterval(getDataPoints);
    var datapoints = dataPoints
    var delayedPlayback = []

    var x1;
    var y1;
    var x2;
    var y2;
    var m;
    var b;
    var temp = [];
    var newData = []
    for (let i = 0; i < datapoints.length; i++) {
        temp.push([Math.round(datapoints[i][0] * 0.8 + window.innerWidth * 0.1), Math.round(datapoints[i][1] * 0.8 + window.innerHeight * 0.1)])
    }
    datapoints = temp;
    console.log(datapoints)
    for (let i = 0; i < datapoints.length; i++) {
        x1 = datapoints[i][0]
        y1 = datapoints[i][1]
        if (datapoints[i + 1]) {
            x2 = datapoints[i + 1][0]
            y2 = datapoints[i + 1][1]
        }
        m = (y2 - y1) / (x2 - x1)
        b = y1 - m * x1



        var newPoint = []
        if (x1 < x2) {
            for (let j = x1; j < x2; j += 20) {
                console.log(x1);
                var newY = m * j + b
                newPoint = [j, newY + 0.001, 1, 100]
                newData.push(newPoint)
            }
        }
        if (x1 > x2) {
            for (let j = x1; j > x2; j -= 20) {
                console.log(x1);
                var newY = m * j + b
                var newPoint = [j, newY + 0.001, 1, 100]
                newData.push(newPoint)
            }
        }

        if (y1 < y2) {
            for (let k = y1; k < y2; k += 20) {
                console.log(x1);
                var newX = (k - b) / m
                newPoint = [newX, k + 0.001, 1, 100]
                newData.push(newPoint)
            }
        }
        if (y1 > y2) {
            for (let k = y1; k > y2; k -= 20) {
                console.log(x1);
                var newX = (k - b) / m
                newPoint = [newX, k + 0.001, 1, 100]
                newData.push(newPoint)
            }
        }
        newData.push([x1, y1, 1])
    }

    if (datapoints.length < newData.length) {
        datapoints = newData;
    }
    console.log(newData);


    // for (let i = 0; i < datapoints.length; i++) {
    //     console.log(datapoints[i]);
    //     if (datapoints[i][2]) {
    //         datapoints[i][2] = 1
    //         datapoints[i].push(100);
    //         delayedPlayback.push([0, 0, 0]);
    //     } else {
    //         datapoints[i].push(1);
    //         delayedPlayback.push([1, 1, 1]);
    //         delayedPlayback.push(datapoints[i])
    //     }
    // }

    // console.log(delayedPlayback)


    var data;
    var heatCanvas = document.querySelector("#canvas");
    var delayedCanvas = document.querySelector("#delayed-canvas");
    ctx = heatCanvas.getContext('2d');
    ctx2 = delayedCanvas.getContext('2d');

    // Create new heatmap every 60ms
    // const playback = setInterval(drawpoints, 200);


    var i = 0;
    var n = 0;

    var end = false;



    function drawpoints() {
        if (!paused) {
            clearInterval(getDataPoints);
            var startTime = performance.now()
            i++;
            data = datapoints.slice(0, i);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var heat = heatmap('canvas').data(data).max(18),
                frame;
            function draw() {
                heat.draw();
                frame = null;
            }


            // var index = i;
            // if (data.length > 100 && data.length % 3 === 0) {
            //     var thirds = data.length / 3
            //     var grad3 = datapoints.slice(0, thirds);
            //     var grad2 = datapoints.slice(thirds, (2 * thirds));
            //     var grad1 = datapoints.slice((2 * thirds), data.length);
            //     if (data[i - 1]) {

            //     }
            // }

            try {
                while (datapoints[i][1] % 1 != 0 || !end) {
                    i++;
                    end = true;

                }
            } catch (e) {
                console.error = function () { }
            }
            if (typeof datapoints[i] === 'undefined') {
                console.log("end")
                activeTimer = false;
                isPlaying = false;
                clearInterval(drawPlayback);
                clearInterval(delayedPlayback);
            }


            draw();

            n++;
            // console.log(datapoints.slice(0, n + 1)[n]);

            //xxxxaaaxaaaxaaaaaaaxaaaa
            //xxxxx
            // aaaaaaa




            var endTime = performance.now()
            // console.log((endTime - startTime).toFixed(1) + ' ms')
            // console.log(datapoints)
        }
    }

    var delayData;
    function drawDelayedPoints() {
        if (!paused) {
            i++;
            delayData = delayedPlayback.slice(0, i)
            ctx2.clearRect(0, 0, canvas.width, canvas.height);
            var heat = heatmap('#delayed-canvas').data(delayData).max(18),
                frame;
            function draw() {
                heat.draw();
                frame = null;
            }
            draw();
        }
    }

    var startTime = performance.now()

    drawPlayback = setInterval(drawpoints, 100);
    drawDelay = setInterval(drawDelayedPoints, 100);


    var endTime = performance.now()
    // console.log((endTime - startTime).toFixed(1) + ' ms')
}
var exitInstances = []
var timeCounter = setInterval(function () {
    var displayTime = Math.round(playbackTime);
    if (activeTimer) {
        document.getElementById('playback-time').innerHTML = displayTime;
    }
    for (let i = 0; i < exitPoints.length; i++) {
        if (exitPoints[0][3]) {

        }
        if (displayTime === exitPoints[i][0]) {
            if (exitPoints[i][3]) {
                testAddDivs(exitPoints[0][2], exitPoints[i][3])
            } else {
                testAddDivs(exitPoints[0][2], 0)
            }
        }
    }
}, 100)





function restart() {
    clearInterval(playbackTimer);
    clearInterval(drawPlayback);
    clearInterval(drawDelay);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    playback(tempData)
    console.log(tempData);
    playbackTime = 0;
    activeTimer = true;
}
var timeoutClick = 0;
function pause() {
    if (isPlaying) {
        paused = true;
    }
}

function play() {
    if (isPlaying) {
        paused = false;
    }
}

function clear() {
    clearInterval(playbackTimer);
    clearInterval(drawPlayback);
    clearInterval(drawDelay);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('#frame').style.visibility = none
    console.log('Clear')
}