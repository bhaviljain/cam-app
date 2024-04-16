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
    db.createObjectStore("image", { keyPath: "id" }); //idar koi bhi naam de sakte ho, par waha pe id he likhna hoga jab object mein store karoge toh(script js line)

})


//Object stores are the data storage of IndexedDB. It is where data is stored.

//Similar to RDBMS we need primary keys to uniquely define some data in an object store. 