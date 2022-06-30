// Connecting to database 

let openRequest = indexedDB.open('cameraDB');
let db; //Databse variable


// handle request events

openRequest.addEventListener("success", ()=>{
db = openRequest.result;
});

openRequest.addEventListener("error", ()=>{
    console.log("DB opening error");
});

openRequest.addEventListener("upgradeneeded", ()=>{
    // 
    db = openRequest.result;

    db.createObjectStore("video", {keyPath : "id"});
    db.createObjectStore("image", {keyPath : "id"});

});