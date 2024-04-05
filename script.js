let video = document.querySelector('video')
let recordBtnCont = document.querySelector('.record-btn-cont')
let recordBtn = document.querySelector('.record-btn')
let captureBtnCont = document.querySelector('.capture-btn-cont')
let captureBtn = document.querySelector('.capture-btn')
let recordFlag = false

let recorder ;


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
    }
    else{
        recorder.stop()
        recordBtn.classList.remove('scale-record')


    }
})