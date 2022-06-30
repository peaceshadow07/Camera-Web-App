let backBtn = document.querySelector(".back");
backBtn.addEventListener("click", () => {
  location.assign("./index.html");
});

setTimeout(() => {
    if (db) {
        let imageDBTRansaction = db.transaction("image", "readonly");
        let imageStore = imageDBTRansaction.objectStore("image");
        let imageRequest = imageStore.getAll();
        imageRequest.onsuccess = () => {
            let imageResult = imageRequest.result;
            let galleryCont = document.querySelector(".device-gallery");
            imageResult.forEach((imageObj) => {
                let imageElem = document.createElement("div");
                imageElem.setAttribute("class", "item");
                imageElem.setAttribute("id", imageObj.id);

                let url = imageObj.url;

                imageElem.innerHTML = `
            <div>
            <img src="${url}"/>
            </div>
            <div class="delete">DELETE</div>
            <div class="download">DOWNLOAD</div>
        `;

                galleryCont.appendChild(imageElem);
                let deleteBtn = imageElem.querySelector(".delete");
                deleteBtn.addEventListener("click", deleteListener);

                let downloadBtn = imageElem.querySelector(".download");
                downloadBtn.addEventListener("click",downloadListener);
            });
        };

        let videoDBTRansaction = db.transaction("video", "readonly");
        let videoStore = videoDBTRansaction.objectStore("video");
        let videoRequest = videoStore.getAll();
        // videoRequest.onsuccess = () => {
        //     let videoResult = videoRequest.result;
        //     let galleryCont = document.querySelector(".device-gallery");

        //     videoResult.forEach((videoObj) => {
        //         let videoElem = document.createElement("div");
        //         videoElem.setAttribute("class", "item");
        //         videoElem.setAttribute("id", videoObj.id);
        //         let blob =videoObj.blobData;
        //         console.log(blob);
        //         let url = URL.createObjectURL(blob);
        //         videoElem.innerHTML = `
        //     <div>
        //     <video autoplay loop src="${url}"></video>
        //     </div>
        //     <div class="delete">DELETE</div>
        //     <div class="download">DOWNLOAD</div>
        // `;

        //         galleryCont.appendChild(videoElem);
        //         let deleteBtn = videoElem.querySelector(".delete");
        //         deleteBtn.addEventListener("click", deleteListener);

        //         let downloadBtn = videoElem.querySelector(".download");
        //         downloadBtn.addEventListener("click",downloadListener);
        //     });
        // };
videoRequest.onsuccess = () => {
    let videoResult = videoRequest.result;
    let galleryCont = document.querySelector(".device-gallery");


    videoResult.forEach((videoObj) => {
      let videoElem = document.createElement("div");
      videoElem.setAttribute("class", "item");
      videoElem.setAttribute("id", videoObj.id);
      let url = URL.createObjectURL(videoObj.blobData);

      videoElem.innerHTML = `
          <div class="media">
            <video autoplay loop src="${url}"></video>
          </div>
          <div class="delete action-btn">DELETE</div>
          <div class="download action-btn">DOWNLOAD</div>
      `;

      galleryCont.appendChild(videoElem);

      let deleteBtn = videoElem.querySelector(".delete");
      deleteBtn.addEventListener("click", deleteListener);

      let downloadBtn = videoElem.querySelector(".download");
      downloadBtn.addEventListener("click", downloadListener);
    });
  };
    }   
}, 100);

function deleteListener(e){
    let id = e.target.parentElement.getAttribute("id");
    let type = id.split("-")[0];
    if(type == "vid"){
        let DbTransaction = db.transaction("video","readwrite");
        let videoStore = DbTransaction.objectStore("video");
        videoStore.delete(id);
    }else if(type == "img"){
        let DbTransaction = db.transaction("image","readwrite");
        let imageStore = DbTransaction.objectStore("image");
        imageStore.delete(id);
    }

    e.target.parentElement.remove();
}

function downloadListener(e) {
    let id = e.target.parentElement.getAttribute("id");
    let type = id.split("-")[0];
    if(type == "vid"){
        let DBTransaction = db.transaction("video","readonly");
        let videoStore = DBTransaction.objectStore("video");
        let videoRequest = videoStore.get(id);

        videoRequest.onsuccess = () => {
            let videoResult = videoRequest.result;
            let videoURL = videoResult.url;
      
            let a = document.createElement("a");
            a.href = videoURL;
            a.download = "video.mp4";
            a.click();
        }

    }else if(type == "img"){
        
        let DbTransaction = db.transaction("image","readwrite");
        let imageStore = DbTransaction.objectStore("image");
        let imageRequest = imageStore.get(id);
        imageRequest.onsuccess = () => {
            let imageResult = imageRequest.result;
            let imageURL = imageResult.url;
            let a = document.createElement("a");
            a.href = imageURL;
            a.download = "image.jpeg";
            a.click();
        }

    }
}



