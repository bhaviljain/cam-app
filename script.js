let video = document.querySelector('video')

let constrainst = {
 video:true,
 audio: true
}

//The navigator ->  contains information about the browser.
// The MediaDevices -> interface of the Media Capture and Streams API provides access to connected media input devices like cameras and microphones, as well as screen sharing
// getUserMedia -> it takes the permission from the user to access the camera or the microphone, as both are true(mdn se padh lena)
navigator.mediaDevices.getUserMedia(constrainst)
.then((stream)=>{
video.srcObject = stream
})