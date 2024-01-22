'use strict';


let canvas = document.querySelector('canvas#tutorial');
let canvasDimensions ={
  width:500,
  height: 500
}
// Checking for support
if(canvas.getContext){
  let ctx = canvas.getContext('2d');
  // ctx.fillStyle = "#2196f3";
  // ctx.fillRect(0,0,250,250);
  // console.log(ctx);
  // ctx.beginPath();
  // ctx.moveTo(50,50);
  // ctx.lineTo(100,50);
  // ctx.lineTo(100,0);
  // ctx.fill();

  // Stroke styles
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

  // Drawing Circle
    // ctx.beginPath();
    // ctx.arc(100,100, 100, 0, Math.PI*2);
    // ctx.lineWidth =1;
    // ctx.stroke();

  // Erase canvas
    // ctx.clearRect(0,0, canvasDimensions.width, canvasDimensions.height);

  // Drawing minute marks
    // ctx.save();
    ctx.lineWidth = 5; 
      for(let i=0; i<60; i++){
        if(i%5 !== 0){ // interval of 5 minutes
          ctx.beginPath();
          ctx.moveTo(117, 0);
          ctx.lineTo(120, 0);
          ctx.stroke();
        }
        ctx.rotate(Math.PI / 30);
      }
    // ctx.restore();


    
  // ctx.lineCap = round;
        
  // ctx.beginPath();
  // ctx.moveTo(100,100);
  // ctx.lineTo(200, 100);
  // ctx.stroke();
  
  // ctx.font="20px Roboto";
  // ctx.fillStyle='blue';
  // ctx.fillText("clock", 5, 30);
  // ctx.stroke();
  

}

