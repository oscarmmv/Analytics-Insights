var dataPoints = []
var mouseHover = false;
canvas.width = window.innerWidth;
canvas.height = 1080;



const getDataPoints = setInterval(function checkMousePos(event) {
    document.addEventListener('mousemove', function (event) {
        x = event.clientX;
        y = event.clientY;
    })
    dataPoints.push([x, y]);
    if (mouseHover) {
        dataPoints.push([x, y]);
    }
    // console.log(event.clientY)
    console.log("event.client")
}, 100);



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
        exitPoints: exitPoints,
        time: Math.round(time),
        resolution: [window.innerWidth, window.innerHeight]
    }
    console.log(userActivity)
}
