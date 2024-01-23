'use strict';
class View{
  constructor(){
    this.metadata={
      color:{
        tickMinutes: 'rgb(71 85 105)', 
        tickHours : 'rgb(30 41 59)',
        text: 'rgb(248 250 252)',
        needleStoke: 'rgb(248 250 252)', 
      },  
      canvasHoursClock:{
        elapsedTime : 0,
        minuteMarksWidth: 3,
        hourMarksWidth: 3,
        needle:{
          width: 10,
          x: 30
        },        
        text:{
          fontSize: '1.5rem',
          x : 8,
          y : 30
        },
      },
      canvasMinutesClock:{
        elapsedTime : 0,
        minuteMarksWidth: 2,
        hourMarksWidth: 2,
        needle:{
          width: 5,
          x: 18
        },        
        text:{
          fontSize: '1.5rem',
          x : 7,
          y : 27
        },
      },

      canvasSecondsClock:{
        elapsedTime : 0,
        minuteMarksWidth: 1,
        hourMarksWidth: 2,
        needle:{
          width: 3,
          x: 7
        },  
        text:{
          fontSize: '1rem',
          x : 12,
          y : 20
        },
      },
      canvasMillisecondsClock:{
        elapsedTime : 0,
        minuteMarksWidth: 1,
        hourMarksWidth: 1,
        needle:{
          width: 2,
          x: 10
        },  
        text:{
          fontSize: '1rem',
          x : 15,
          y : 17
        },
      },
    }

    this.canvasMillisecondsClock = document.querySelector('canvas#canvasMillisecondsClock');
    this.canvasSecondsClock = document.querySelector('canvas#canvasSecondsClock');
    this.canvasMinutesClock = document.querySelector('canvas#canvasMinutesClock');
    this.canvasHoursClock = document.querySelector('canvas#canvasHoursClock');
    this.generateClock(this.canvasMillisecondsClock, 'canvasMillisecondsClock');
    this.generateClock(this.canvasSecondsClock, 'canvasSecondsClock');
    this.generateClock(this.canvasMinutesClock, 'canvasMinutesClock');
    this.generateClock(this.canvasHoursClock, 'canvasHoursClock');

    this.stopButton = document.querySelector('button#stop');

    this.intervalsIDs ={

    }

    this.intervalsIDs.canvasMillisecondsClock = setInterval(()=>{
      this.generateClock(this.canvasMillisecondsClock, 'canvasMillisecondsClock');
    },1);  // 1 milli second

    this.intervalsIDs.canvasSecondsClock = setInterval(()=>{
      this.generateClock(this.canvasSecondsClock, 'canvasSecondsClock');
    },1000);  // 1 sec || 10000

    this.intervalsIDs.canvasMinutesClock = setInterval(()=>{
      this.generateClock(this.canvasMinutesClock, 'canvasMinutesClock');
    },60 * 1000);  // 60 seconds || 60000

    this.intervalsIDs.canvasHoursClock = setInterval(()=>{
      this.generateClock(this.canvasMinutesClock, 'canvasMinutesClock');
    },3600 * 1000);  // 1 Hour



    this.stopButton.addEventListener('click', ()=>{
      clearInterval( this.intervalsIDs.canvasMillisecondsClock);
      clearInterval( this.intervalsIDs.canvasSecondsClock);
      clearInterval( this.intervalsIDs.canvasMinutesClock);
      clearInterval( this.intervalsIDs.canvasHoursClock);
    });    

  }

  generateClock(canvas, clockType='canvasMillisecondsClock'){
    // Checking for support
    if(canvas.getContext){    
      // Getting canvas dimensions
        let canvasWidth= Number(canvas.getAttribute('width'));
        let canvasHeight= Number(canvas.getAttribute('height'));

      // initializing
        let ctx = canvas.getContext('2d'); 
        // console.log(canvasWidth, canvasHeight);
        ctx.save();
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // clearing canvas            
        // ctx.save();         
        ctx.translate(canvasWidth/2, canvasHeight/2); // translate to center of canvas
        ctx.scale(.95,.95); // scale set to 100%
        ctx.rotate(-Math.PI / 2); // to set 12/24 at the top
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.lineWidth = 8;
        ctx.lineCap = "round";
        // ctx.restore();

      // Drawing minute marks                
          ctx.strokeStyle = this.metadata.color.tickMinutes;
          ctx.lineWidth = this.metadata[clockType].minuteMarksWidth;          
          for(let i=0; i<60; i++){
            if(i%5 !== 0){ // interval of 5 minutes
              ctx.beginPath();
              ctx.moveTo((canvasHeight/2)-5, 0);
              ctx.lineTo((canvasWidth/2), 0);
              ctx.stroke();
            }
            ctx.rotate(Math.PI / 30); // by 6 deg
          }


      // Drawing hours marks
          ctx.strokeStyle = this.metadata.color.tickHours;
          ctx.lineWidth = this.metadata[clockType].hourMarksWidth; 
          for(let i=0; i<12; i++){        
              ctx.beginPath();
              ctx.rotate(Math.PI / 6); // by 30 deg
              ctx.moveTo((canvasHeight/2)-10, 0);
              ctx.lineTo((canvasWidth/2), 0);
              ctx.stroke();        
          }                
    
    
      // drawing hand/needle
        ctx.fillStyle = this.metadata.color.needleStoke;
        ctx.strokeStyle = this.metadata.color.needleStoke; 
        ctx.lineWidth = this.metadata[clockType].needle.width;        
        ctx.rotate((Math.PI/180) * (6 * this.metadata[clockType].elapsedTime));         
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo((canvasWidth/2)-this.metadata[clockType].needle.x, 0);
        ctx.stroke();        
        ctx.restore();

      // Resetting 
        if(clockType === 'canvasMillisecondsClock'){
          if(this.metadata[clockType].elapsedTime > 1000){
            this.metadata[clockType].elapsedTime = 0;
          }
        }else if(clockType === 'canvasSecondsClock' || clockType === 'canvasMinutesClock'){
          if(this.metadata[clockType].elapsedTime > 60){
            this.metadata[clockType].elapsedTime = 0;
          }
        }


      // writing elapsed seconds                                                  
        ctx.fillStyle = this.metadata.color.text;
        ctx.font = `bold ${this.metadata[clockType].text.fontSize} Roboto`; 
        let elapsedTime =  this.metadata[clockType].elapsedTime;
        ctx.fillText(elapsedTime, (canvasWidth/2)- this.metadata[clockType].text.x, (canvasHeight/2)+ this.metadata[clockType].text.y);                         
        
        // updating time
        this.metadata[clockType].elapsedTime +=1;       


      }
          
      }
  
  
  }  

