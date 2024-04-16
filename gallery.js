setTimeout(()=>{

    if(db)
{
    let dbTransaction = db.transaction('video', "readonly")
    let videoStore = dbTransaction.objectStore("video")
    let videoRequest = videoStore.getAll()
    videoRequest.onsuccess = (e) =>{
     let videoResult = videoRequest.result
     let galleryCont = document.querySelector('.gallery-cont')

console.log(videoResult);
     videoResult.forEach((videoObj)=>{
     let mediaEle = document.createElement('div')
     mediaEle.setAttribute('class', "media-cont")
     mediaEle.setAttribute('id', videoObj.id)
     let url = URL.createObjectURL(videoObj.blobData)
     mediaEle.innerHTML = `
     <div class="media">
     <video autoplay loop src = "${url}"></video>
     </div>
     <div class="download btn">Download</div>
     <div class="delete btn">Delete</div>
 </div>`
 galleryCont.appendChild(mediaEle)

 let deleteBtn  = mediaEle.querySelector('.delete')
 deleteBtn.addEventListener('click', deleteListener)
 let downloadBtn = mediaEle.querySelector('.download')
 downloadBtn.addEventListener('click', downloadlistener)

     })
    }
    let ImageDBTransaction = db.transaction('image', "readonly")
    let imageStore = ImageDBTransaction.objectStore("image")
    let imageRequest = imageStore.getAll()
    imageRequest.onsuccess = (e) =>{
     let imageResult = imageRequest.result
     let galleryCont = document.querySelector('.gallery-cont')

     imageResult.forEach((imageObj)=>{
     let mediaEle = document.createElement('div')
     mediaEle.setAttribute('class', "media-cont")
     mediaEle.setAttribute('id', imageObj.id)
     let url = imageObj.url
     mediaEle.innerHTML = `
     <div class="media">
     <img src="${url}"/>
     </div>
     <div class="download btn">Download</div>
     <div class="delete btn">Delete</div>
 </div>`
 galleryCont.appendChild(mediaEle)
 
 let deleteBtn  = mediaEle.querySelector('.delete')
 deleteBtn.addEventListener('click', deleteListener)
 let downloadBtn = mediaEle.querySelector('.download')
 downloadBtn.addEventListener('click', downloadlistener)
     })
    }
    
}
},100)

function deleteListener  (e){
 
    let id = e.target.parentElement.getAttribute('id')
    let type = id.slice(0,7)
    if(type === "videoID")
    {
        let dbTransaction = db.transaction('video', "readwrite")
        let videoStore = dbTransaction.objectStore("video")
        videoStore.delete(id)
    }
    else if(type === "imageID")
    {
        let ImageDBTransaction = db.transaction('image', "readwrite")
        let imageStore = ImageDBTransaction.objectStore("image")
        imageStore.delete(id)
    }
   e.target.parentElement.remove()

}

function downloadlistener (e) {
    let id = e.target.parentElement.getAttribute('id')
    let type = id.slice(0,7)
    if(type === "videoID")
    {
        let dbTransaction = db.transaction('video', "readwrite")
        let videoStore = dbTransaction.objectStore("video")
        let videoRequest = videoStore.get(id)
        videoRequest.onsuccess = (e) =>{

            let videoResult = videoRequest.result

            let videoUrl = URL.createObjectURL(videoResult.blobData)

            let a = document.createElement("a")
            a.href = videoUrl
            a.download = "stream.mp4"
            a.click()
        }
    }
    else if(type === "imageID")
    
    {
        let ImageDBTransaction = db.transaction('image', "readwrite")
        let imageStore = ImageDBTransaction.objectStore("image")
        let imageRequest = imageStore.get(id)
        imageRequest.onsuccess = (e) =>{

            let imageResult = imageRequest.result

            let a = document.createElement("a")
            a.href = imageResult.url
            a.download = "image.jpeg"
            a.click()
        }
    }
}