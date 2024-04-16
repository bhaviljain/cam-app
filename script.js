let video = document.querySelector('video')
let recordBtnCont = document.querySelector('.record-btn-cont')
let recordBtn = document.querySelector('.record-btn')
let captureBtnCont = document.querySelector('.capture-btn-cont')
let captureBtn = document.querySelector('.capture-btn')
let recordFlag = false
let transparentColor = "transparent";

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
    
    if (db) {
        let videoID = crypto.randomUUID();
        let dbTransaction = db.transaction("video", "readwrite");
        let videoStore = dbTransaction.objectStore("video");
        let videoEntry = {
            id: `videoID-${videoID}`, //same id name as given in object store
            blobData: blob
        }
        videoStore.add(videoEntry);
    }


    // let a = document.createElement('a')
    // a.href = videoUrl
    // a.download = "stream.mp4"
    // a.click()
})
})
//CAPTURE IMAGE
captureBtn.addEventListener('click',(e)=>{
    captureBtn.classList.add('scale-record')
    let canvas = document.createElement("canvas")
    canvas.height = video.videoWidth
    canvas.width = video.videoWidth

    let tool = canvas.getContext("2d")
    tool.drawImage(video,0,0,canvas.width,canvas.height)

    tool.fillStyle = transparentColor
    tool.fillRect(0,0,canvas.width, canvas.height)
    let imageUrl = canvas.toDataURL()


    if (db) {
        let imgId = crypto.randomUUID();
        let dbTransaction = db.transaction("image", "readwrite");
        let imageStore = dbTransaction.objectStore("image");
        let imageEntry = {
            id: `imageID-${imgId}`, //same id name as given in object store
            url: imageUrl
        }
        imageStore.add(imageEntry);
    }

    setTimeout(()=>{
        captureBtn.classList.remove('scale-record')

    },500)

    // let a = document.createElement('a')
    // a.href = imageUrl
    // a.download = "stream.png"
    // a.click()
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
  
    timers.style.display = "block"
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
timers.innerText = "00:00:00"
timers.style.display = "none"

}
let filterLayer = document.querySelector(".filter-layer")
let allfilter = document.querySelectorAll('.filter')
allfilter.forEach((filterElem)=>{ 
    filterElem.addEventListener('click',()=>{
        //to get the color... set color karte tab backgroundcolor left mein hota hain par get karte waqt right mein ayega
  transparentColor = getComputedStyle(filterElem).getPropertyValue("background-color")
  filterLayer.style.backgroundColor = transparentColor
 })
})
