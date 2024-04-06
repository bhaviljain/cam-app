let video = document.querySelector('video')
let recordBtnCont = document.querySelector('.record-btn-cont')
let recordBtn = document.querySelector('.record-btn')
let captureBtnCont = document.querySelector('.capture-btn-cont')
let captureBtn = document.querySelector('.capture-btn')
let recordFlag = false

let recorder ;
let chunks = [];


let constrainst = {
 video:true,
 audio: true,
}
//The navigator ->  contains information about the browser.
// The MediaDevices -> interface of the Media Capture and Streams API provides access to connected media input devices like cameras and microphones, as well as screen sharing
// getUserMedia -> it takes the permission from the user to access the camera or the microphone, as both are true(mdn se padh lena)
navigator.mediaDevices.getUserMedia(constrainst)
.then((stream)=>{
video.srcObject = stream

recorder =new MediaRecorder(stream)

recorder.addEventListener('start',()=>{
    chunks = []
    
})
recorder.addEventListener("dataavailable",(e)=>{
  chunks.push(e.data)
})
recorder.addEventListener('stop', ()=>{
    let blob = new Blob(chunks ,{type:"video/mp4"})
    let videoUrl = window.URL.createObjectURL(blob)
    let a = document.createElement('a')
    a.href = videoUrl
    a.download = "stream.mp4"
    a.click()
})
})

recordBtnCont.addEventListener("click", ()=>{
    if(!recorder) return

    recordFlag = !recordFlag

    if(recordFlag){
        recorder.start()
        recordBtn.classList.add('scale-record')
        let p = document.createElement('div')
        p.setAttribute("class","cell")

        p.innerHTML = "Recording Started"
        recordBtn.appendChild(p)
        startTimer()
    }
    else{
        recorder.stop()
        recordBtn.classList.remove('scale-record')
        stopTimer()
        
    }
})
let timer;
let timers = document.querySelector('.timer')
let counter = 0
function startTimer (){
  
    timers.style.display = "flex"
    function displayTimer (){
   let totalSeconds = counter

   let hours = Number.parseInt(totalSeconds / 3600)
   totalSeconds = totalSeconds % 3600;

   let minutes =  Number.parseInt(totalSeconds / 60)
   totalSeconds = totalSeconds % 60;

   let seconds = totalSeconds


   hours = (hours < 10) ? `0${hours}` : hours
   minutes = (minutes < 10) ? `0${minutes}` : minutes
   seconds = (seconds < 10) ? `0${seconds}` : seconds

  timers.innerHTML = `${hours}: ${minutes} : ${seconds}`
  counter++;



  let p = document.createElement('div')
  p.setAttribute("class","red")
  p.innerText = "🔴"
  timers.appendChild(p)

    }
    timer = setInterval(displayTimer,1000)
}

function stopTimer (){
clearInterval(timer)
timers.innerHTML = "00:00:00"
timers.style.display = "none"

}
