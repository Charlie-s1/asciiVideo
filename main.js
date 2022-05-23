const asciiList = `$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,"^'.    `

window.onload = ()=>{
     
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");

    const video = document.createElement("video");
    navigator.mediaDevices.getUserMedia({video:{width:160},audio:false})
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
            // c.width=video.width;
        })
        .catch(function(err) {
            console.log("An error occurred: " + err);
        });
    video.addEventListener("loadeddata",update);
    document.querySelector("body").appendChild(video);
    const img = new Image();
    
    img.src = "img/dogSm.jpg";
    img.crossOrigin = "anonymous"
    
    function update(){
        var imgPixels=[];
        imgPixels.length = 0;
        c.width = 100;
        c.height=100;
        ctx.drawImage(video,-(160-100)/2,-(120-100)/2);
        // document.querySelector("body").appendChild(c);
        if(imgPixels.length==0){
            for(let x=1; x<=c.height; x++){
                for(let y=1;y<=c.width;y++){
                    const p = getPixel(ctx,y,x);
                    pGrey = Math.round((p[0]+p[1]+p[2])/3);
                    imgPixels.push(pGrey);
                }
            }
        }
        
        draw(100,imgPixels);
    }
    const loop = setInterval(update,500);

}
function getPixel(ctx,x,y){
    return (ctx.getImageData(x,y,1,1).data)
}
function draw(width,imgPixels){
    const cont = document.querySelector("#imgCont")||document.createElement("div");
    cont.textContent = "";
    cont.id = "imgCont";
    for (p of imgPixels){
        percent = Math.round((p/255)*asciiList.length);
        const letter = document.createElement("p");
        letter.textContent = asciiList[asciiList.length-percent];
        cont.appendChild(letter);
    }
    document.querySelector("body").appendChild(cont);
    cont.style.gridTemplateColumns = `repeat(${width},1fr)`
}



