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
    tempData = dataPoints;
    var datapoints = dataPoints
    var delayedPlayback = []

    var x1;
    var y1;
    var x2;
    var y2;
    var m;
    var b;
    var index;
    var newData = []

    for (let i = 0; i < datapoints.length; i++) {
        x1 = datapoints[i][0]
        y1 = datapoints[i][1]
        if (datapoints[i + 1]) {
            x2 = datapoints[i + 1][0]
            y2 = datapoints[i + 1][1]
        }
        m = (y2 - y1) / (x2 - x1)
        b = y1 - m * x1




        if (x1 < x2) {
            for (let j = x1; j < x2; j += 20) {
                var newY = m * j + b
                var newPoint = [j, newY, 100]
                newData.push(newPoint)

            }
        }
        if (x1 > x2) {
            for (let j = x1; j > x2; j -= 20) {
                var newY = m * j + b
                var newPoint = [j, newY]
                newData.push(newPoint)
            }
        }

        if (y1 < y2) {
            for (let k = y1; k < y2; k += 20) {
                var newX = (k - b) / m
                var newPoint = [newX, k]
                newData.push(newPoint)

            }
            if (y1 > y2) {
                for (let k = y1; k > y2; k -= 20) {
                    var newX = (k - b) / m
                    var newPoint = [newX, k]
                    newData.push(newPoint)
                }
            }
        }
    }

    if (datapoints.length < newData.length) {
        datapoints = newData;
    }

    for (let i = 0; i < datapoints.length; i++) {
        if (datapoints[i][2]) {
            datapoints[i][2] = 1
            datapoints[i].push(100);
            delayedPlayback.push([0, 0, 0]);
        } else {
            datapoints[i].push(1);
            delayedPlayback.push(datapoints[i])
        }
    }

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


            var index = i;
            if (data.length > 100 && data.length % 3 === 0) {
                var thirds = data.length / 3
                var grad3 = datapoints.slice(0, thirds);
                var grad2 = datapoints.slice(thirds, (2 * thirds));
                var grad1 = datapoints.slice((2 * thirds), data.length);
                if (data[i - 1]) {

                }
            }

            if (i >= datapoints.length) {
                clearInterval(drawPlayback);
                clearInterval(delayedPlayback);
                activeTimer = false;
                isPlaying = false;
            }
            draw();

            n++;
            while (datapoints.slice(0, n + 1)[n].length === 4) {
                delayedPlayback.push(datapoints.slice(0, n + 1)[n - 1]);
                n++;
                i++;
                // console.log(delayedPlayback);
            }



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


    // changeState(delayedPlayback)
    function changeState(value, previous) {
        if (value === previous) {

        }
    }
    var count = 0;
    function counter() {
        count++;
        if (count > 5) {
            deafultInterval = 100;
            console.log("hello")
        }
        console.log(count)
    }

    var endTime = performance.now()
    // console.log((endTime - startTime).toFixed(1) + ' ms')
}


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

