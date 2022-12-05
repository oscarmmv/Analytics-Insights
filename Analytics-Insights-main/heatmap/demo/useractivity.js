'use strict';

if (typeof module !== 'undefined') module.exports = heatmap;

// returns user activity 


var userActivity = {}
    var dataPoint = [];
    var timeOffPage = []
    var exitPoints = {}
 

var exitCause;


var coords;
var exited = false;
var returned = false;
var x;
var y;
var UserPoints = {}
function heatmap(canvas) {
    if (!(this instanceof heatmap)) return new heatmap(canvas);

    this._canvas = canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;

    this._ctx = canvas.getContext('2d');
    this._width = canvas.width;
    this._height = canvas.height;

    this._max = 1;
    this._data = [];
}


heatmap.prototype = {

    defaultRadius: 25,

    defaultGradient: {
        0.3: 'blue',
        0.5: 'cyan',
        0.6: 'lime',
        0.7: 'yellow',
        1.0: 'red'
    },

    data: function (data) {
        this._data = data;
        return this;
    },

    max: function (max) {
        this._max = max;
        return this;
    },

    add: function (point) {
        this._data.push(point);
        
        coords = point.toString();
        x = parseInt(coords.split(',')[0])
        y = parseInt(coords.split(',')[1])
        dataPoint.push([x, y]);
        return this;
    },

    clear: function () {
        this._data = [];
        return this;
    },

    radius: function (r) {
        blur = 15;
        var circle = this._circle = this._createCanvas(),
            ctx = circle.getContext('2d'),
            r2 = this._r = r + blur;

        circle.width = circle.height = r2 * 2;

        ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
        ctx.shadowBlur = blur;
        ctx.shadowColor = 'black';

        ctx.beginPath();
        ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        return this;
    },

    resize: function () {
        this._width = this._canvas.width;
        this._height = this._canvas.height;
    },

    gradient: function (grad) {
        var canvas = this._createCanvas(),
            ctx = canvas.getContext('2d'),
            gradient = ctx.createLinearGradient(0, 0, 0, 256);

        canvas.width = 1;
        canvas.height = 256;

        for (var i in grad) {
            gradient.addColorStop(+i, grad[i]);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 256);

        this._grad = ctx.getImageData(0, 0, 1, 256).data;

        return this;
    },

    draw: function (minOpacity) {
        if (!this._circle) this.radius(this.defaultRadius);
        if (!this._grad) this.gradient(this.defaultGradient);

        var ctx = this._ctx;

        ctx.clearRect(0, 0, this._width, this._height);


        for (var i = 0, len = this._data.length, p; i < len; i++) {
            p = this._data[i];
            ctx.globalAlpha = Math.min(Math.max(p[2] / this._max, minOpacity === undefined ? 0.05 : minOpacity), 1);
            ctx.drawImage(this._circle, p[0] - this._r, p[1] - this._r);
        }

        var colored = ctx.getImageData(0, 0, this._width, this._height);
        this._colorize(colored.data, this._grad);
        ctx.putImageData(colored, 0, 0);
        return this;
    },

    _colorize: function (pixels, gradient) {
        for (var i = 0, len = pixels.length, j; i < len; i += 4) {
            j = pixels[i + 3] * 4; 

            if (j) {
                pixels[i] = gradient[j];
                pixels[i + 1] = gradient[j + 1];
                pixels[i + 2] = gradient[j + 2];
            }
        }
    },

    _createCanvas: function () {
        if (typeof document !== 'undefined') {
            return document.createElement('canvas');
        } else {
            return new this._canvas.constructor();
        }
    }
};

// Engagement Metadata

//    When a user opens the refo profile a timer starts
//    Timer pauses when opened in a new tab (in the same window)
//    Timer pauses when window is minimized
//    Timer pauses after 1 minute of inactivity and deducts 1 minute from total time
//      Inactivity is also applied when open in another window and there is no mouse activity
var time = 0;
var inactiveTime = 0
var handleTime = 0
var mouseEvent = true;
var isPaused = false;
var timeout;
var isViewingRefo = true;
var viewTime = [];
var handleIdentifier;
var tid;


//Primary Timer
setInterval(function() {
  // if the time is not paused 
  // increment time by 1
    if(!isPaused) {
        time++;
    }

  // time is paused
    if(inactiveTime >= 60) {
      time--;
    }
  // time spent inactive is dedcuted from total active time
    if(inactiveTime == 59) {
      time-=60;
    }

}, 1000);

//Secondary timer 
setInterval(function() {
  // active when no mouse activity is detected
  // increment inactive time by 1
    if(!mouseEvent || ! isViewingRefo) {
        inactiveTime ++;
    }
}, 1000);

// mouse is moving
function mouseMoveEventHandler() {
    mouseEvent = true;
    inactiveTime = 0;
}

// calls the event handler when mouse moves
window.addEventListener('mousemove', mouseMoveEventHandler);

// mouse is not moving
document.onmousemove = function(){
  clearTimeout(timeout);
  timeout = setTimeout(function(){
    mouseEvent = false;
  }, 10);  
  
}


// pauses timer when anoter tab is opened in the same tab
document.addEventListener('visibilitychange', function (event) {
  if (document.hidden) {
      isPaused = true;
      mouseEvent = true;
      isViewingRefo = false;
      exited = true;
  } else {
      returned = true;
      isPaused = false;
      isViewingRefo = true;
  }
    if(exited && returned) {
        exited = false;
        returned = false;
        exitPoints = {
            start: time,
            end: time + inactiveTime,
        }
        timeOffPage.push(exitPoints);
    }
  
  
});

function activityObject() {
    userActivity = {
        id: 'uuid',
        data: dataPoint,
        exitPoints: timeOffPage,
        time: time
    }
    console.log(userActivity);
}

function timeHandler(handle) {
  setTimeout(function() {
    handleTime++;
    console.log(handleTime)
    if(!isViewingRefo) {
      console.log('called')
      return
    }
  },1000)
  handleIdentifier = handle;
}

