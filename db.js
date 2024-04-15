let db;
let openRequest = indexedDB.open("myDataBase",3)

openRequest.addEventListener('success',(e)=>{
    console.log("success");
    db = openRequest.result

})

openRequest.addEventListener('error',(e)=>{
    console.log("error");
})

openRequest.addEventListener('upgradeneeded',(e)=>{
    console.log("upgrade"); 
    db = openRequest.result

    db.createObjectStore("video", { keyPath: "id" });
    db.createObjectStore("image", { keyPath: "id" });

})