// Engagement Metadata

//    When a user opens the refo profile a timer starts
//    Timer pauses when opened in a new tab (in the same window)
//    Timer pauses when window is minimized
//    Timer pauses after 1 minute of inactivity and deducts 1 minute from total time
//      Inactivity is also applied when open in another window and there is no mouse activity
var time = 0;
var inactiveTime = 0
var mouseEvent = true;
var isPaused = false;
var timeout;


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
  console.log(time);
  document.getElementById("active-time").innerHTML = time + "s";  
}, 1000);

//Secondary timer 
setInterval(function() {
  // active when no mouse activity is detected
  // increment inactive time by 1
    if(!mouseEvent) {
        inactiveTime++;
    }
  console.log("inactive: " +inactiveTime);
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
  } else {
      isPaused = false;
  }
});


// When instance of the page is closed send an ajax request
// window.onbeforeunload = function () {
    // ajaxRequest.open();
    // ajaxRequest.send("time=" + time);
// }

  
