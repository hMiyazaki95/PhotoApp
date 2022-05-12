// add time out that is going to trigger an 
//interval which is slowly going to take away from
// opacity of the element
// set up timeout and interval so it functions
// NOTE: there is library for these codes

function setFlashMessageFadeOut() {
    setTimeout(()=>{
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if(currentOpacity < 0.05){
                clearInterval(timer);
                flashElement.remove();
            }
            currentOpacity = currentOpacity - .05; // speed of the fade
            flashElement.style.opacity = currentOpacity;
        }, 50);
    },4000);
}

let flashElement = document.getElementById('flash-message');
if(flashElement){
    setFlashMessageFadeOut();
}

/*module.exports = router;*/