function createPhotoCards(photo){
    let card = document.createElement("div");
    card.className = "item";
    let img = document.createElement("img");
    img.src = photo.thumbnailUrl; //connects image
    let textDiv = document.createElement("div");
    textDiv.innerText = photo.title; //connects title 
    textDiv.classList = "text";
    card.appendChild(img);
    card.appendChild(textDiv);
    card.onclick = function(){ // onclick event 
        fadeOut(card);
    }    
    container.appendChild(card);
}


function fadeOut(card){
    let img = card.querySelector("img");
    img.classList.add("fade");
    setTimeout(() => {
        container.removeChild(card); //remove cards after click
        total.innerText = total.innerText - 1; //update total items
    },500)
}
let container = document.querySelector(".container");
let total = document.getElementById("total");

if(container){
    let fetchUrl = "https://jsonplaceholder.typicode.com/albums/2/photos"; // create array from the link
    fetch(fetchUrl)
    .then(data => data.json()) // loaded as json
    .then(photos => {
        console.log(photos);
        for(let i=0;i<photos.length;i++){ // we don't know how many of photo are loaded in to the array so use the photos.length
            createPhotoCards(photos[i]); //we will create a card here with the image and text and append it in the main container
        }
        total.innerText = photos.length; //updating the total items
    })
}