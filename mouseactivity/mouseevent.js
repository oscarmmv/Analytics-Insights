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
  document.getElementById("active-time").innerHTML = time + "s";  
}, 1000);

//Secondary timer 
setInterval(function() {
  // active when no mouse activity is detected
  // increment inactive time by 1
    if(!mouseEvent) {
        inactiveTime++;
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
  } else {
      isPaused = false;
      isViewingRefo = true;
      // abortTimer();
  }
});

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

// function mycode() {
//   handleTime++;
//   console.log(handleTime)
//   tid = setTimeout(mycode, 1000); // repeat myself
// }
// function abortTimer() { // to be called when you want to stop the timer
//   clearTimeout(tid);
//   viewTime[handleIdentifier] = handleTime
//   console.log(viewTime);
//   document.getElementById("handle-time").innerHTML = viewTime + "s";  
// }

// When instance of the page is closed send an ajax request
// window.onbeforeunload = function () {
    // ajaxRequest.open();
    // ajaxRequest.send("time=" + time);
// }
// function timeHandler(handle) {
//   if()
// }


// setInterval( function timeHandler(handle) {
//   //Handle vew timer 
//     if(!isViewingRefo) {
//       handleTime++;
//     }
//     console.log("handle view: " + handleTime);

//   if(!isViewingRefo) {
//     //viewTimeGithub = hadleTime;
//     viewTime[handle] = handleTime;
//     console.log("asdasd" + handleTime)
//   }
//   if(isViewingRefo) {
//     isViewingRefo--;
//   }
// }, 1000);
  
