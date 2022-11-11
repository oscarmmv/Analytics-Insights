// heatmap 0.1.0 beta 
var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");
var deltaX = [];
var heat;
var diffusedHeat = 250;
var x;
var y;


function showCoords(event) {
    x = event.clientX
    y = event.clientY + window.scrollY;
    var coor = "(" + x + "," + y + ")";
    document.getElementById("coords").innerHTML = coor;


  //   for (let i = 1; i <= 31; i++) {
  //     var circX = event.clientX
  //     var circY = event.clientY + window.scrollY;
      
  //     if(heat) {
  //       ctx.fillStyle = 'rgba(200, 0, 0, 0.005)'; 
  //       ctx.arc(circX, circY, 10 + i, 0, 2 * Math.PI);
  //     } else {
  //       ctx.fillStyle = 'rgba(0, 0, 150, 0.0025)'; 
  //       ctx.arc(circX, circY, i, 0, 2 * Math.PI);
  //     }
  //     ctx.strokeStyle = 'transparent'; 
  //     ctx.fill();
  //     ctx.beginPath();
  //     ctx.stroke();
  //     ctx.stroke();
  //   }
  //   deltaX.push(circX);
  //   // [100 200 320 231 342 123 355 354]
    
  //   if(Math.abs(deltaX[deltaX.length-1] - (deltaX[deltaX.length-20]) <= 50 )) {
  //     heat = true;
  //     deltaX = []
  //   } else {
  //     heat = false;
  //   }
  
  function clearCoor() {
    document.getElementById("coords").innerHTML = "";
  }

}

var intervalId = window.setInterval(function(){
  console.log("ji")
  for (let i = 1; i <= 31; i++) {
    var circX = x;
    var circY = y;
    
    if(heat || diffusedHeat>0) {
      ctx.fillStyle = 'rgba(200, 0, 0, 0.0075)'; 
      ctx.arc(circX, circY, i, 0, 2 * Math.PI);
      diffusedHeat--;
      
    } else {
      ctx.fillStyle = 'rgba(0, 0, 150, 0.0025)'; 
      ctx.arc(circX, circY, i, 0, 2 * Math.PI);
    }
    ctx.strokeStyle = 'transparent'; 
    ctx.fill();
    ctx.beginPath();
    ctx.stroke();
    ctx.stroke();
  }

  deltaX.push(circX);
  // [100 200 320 231 342 123 355 354]
  
  if(Math.abs(deltaX[deltaX.length-1] - (deltaX[deltaX.length-17]) <= 50 )) {
    heat = true;
    deltaX = []
  } else {
    heat = false;
  }
  
}, 10);

function download_image(){
  image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "my-image.png";
  link.href = image;
  link.click();
}