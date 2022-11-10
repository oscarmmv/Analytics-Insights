// Engagement Metadata

//    When a user opens the refo profile a timer starts
//    Timer pauses when opened in a new tab (in the same window)
//    Timer pauses when window is minamized
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
        document.getElementById("active-time").innerHTML = "Active Time: " + time; 
    }
  // if the time inactive is greater than 59s + 1000ms (60s) 
  // time is paused
    if(inactiveTime >= 59) {
      time--;
    }
  // time spent inactive is dedcuted from total active time
    if(inactiveTime == 58) {
      time-=60;
    }
}, 1000);

//Secondary timer 
setInterval(function() {
  // active when no mouse activity is detected
  // increment inactive time by 1
    if(!mouseEvent) {
        inactiveTime++;
        document.getElementById("inactive-time").innerHTML = "Inactive Time: " + inactiveTime; 
    }
}, 1000);

// mouse is moving
function mouseMoveEventHandler() {
    mouseEvent = true;
    inactiveTime = 0;
    document.getElementById("inactive-time").innerHTML = "Inactive Time: " + inactiveTime; 
    document.getElementById("mouseevent").innerHTML = "Mouse is moving"; 
}

// calls the event handler when mouse moves
window.addEventListener('mousemove', mouseMoveEventHandler);

// mouse is not moving
document.onmousemove = function(){
  clearTimeout(timeout);
  timeout = setTimeout(function(){
    mouseEvent = false;
    document.getElementById("mouseevent").innerHTML = "Mouse is not moving";

  }, 10);  
  
}

// pauses timer when another tab is opened in the same tab or when another window is over it
document.addEventListener('visibilitychange', function (event) {
  if (document.hidden) {
      isPaused = true;
      mouseEvent = true;
  } else {
      isPaused = false;
  }
});



  
