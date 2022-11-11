// heatmap 0.1.0 beta 
var c = document.getElementById("screen");
var ctx = c.getContext("2d");
var deltaX = [];
var heat;


function showCoords(event) {
  const scale = window.devicePixelRatio
    var x = event.clientX
    var y = event.clientY + window.scrollY;
    var coor = "(" + x + "," + y + ")";
    document.getElementById("coords").innerHTML = coor;


    for (let i = 1; i <= 31; i++) {
      var circX = event.clientX
      var circY = event.clientY + window.scrollY;
      if(heat) {
        ctx.fillStyle = 'rgba(200, 0, 0, 0.01)'; 
      } else {
        ctx.fillStyle = 'rgba(0, 0, 200, 0.005)'; 
      }
      ctx.strokeStyle = 'transparent'; 
      ctx.fill();
      ctx.beginPath();
      ctx.arc(circX, circY, i, 0, 2 * Math.PI);
      ctx.stroke();
    }
    deltaX.push(circX);
    // [100 200 320 231 342 123 355 354]
    
    if(Math.abs(deltaX[deltaX.length-1] - (deltaX[deltaX.length-20]) <= 50 )) {
      heat = true;
      deltaX = []
    } else {
      heat = false;
    }
  
  function clearCoor() {
    document.getElementById("coords").innerHTML = "";
  }

}

function toggleHeatmap() {
  var heatmap = document.getElementById('screen');
  if (heatmap.style.visibility === "hidden") {
    heatmap.style.visibility = "visible";
  } else {
    heatmap.style.visibility = "hidden";
  }
};

function downloadImage(){
  image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "heatmap.png";
  link.href = image;
  link.click();
}

