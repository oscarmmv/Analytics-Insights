var dataPoints = []
var mouseHover = false;
canvas.width = window.innerWidth;
canvas.height = 1080;

setInterval(function () {
    if (activeTimer) {
        document.getElementById('playback-time').innerHTML = Math.round(playbackTime);
    }
}, 100)

const getDataPoints = setInterval(function checkMousePos(event) {
    document.addEventListener('mousemove', function (event) {
        x = event.pageX;
        y = event.pageY;
    })
    dataPoints.push([x, y]);
    if (mouseHover) {
        dataPoints.push([x, y]);
    }
}, 60);



function pageExit(x_pos, y_pos) {
    var temp = [exitPoints[0], exitPoints[1]];
    var d = document.getElementById('pop-up');
    d.style.position = "absolute";
    d.style.left = x_pos + 'px';
    d.style.top = y_pos + 'px';
}

function mouseOver() {
    mouseHover = true;
    console.log('called')
}
function mouseOut() {
    mouseHover = false;
}

function activityObject() {
    userActivity = {
        id: 'uuid',
        data: dataPoints,
        exitPoints: timeOffPage,
        time: Math.round(time)
    }
    console.log(userActivity)
}
