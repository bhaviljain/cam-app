let db;
let openRequest = indexedDB.open("myDataBase")

openRequest.addEventListener('success',(e)=>{
    console.log("success");
})

openRequest.addEventListener('error',(e)=>{
    console.log("error");
})

openRequest.addEventListener('upgradeneeded',(e)=>{
    console.log("upgrade");
})