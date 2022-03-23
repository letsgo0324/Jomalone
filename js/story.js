const slider1 = document.querySelector("#story_sliders1");
const slider2 = document.querySelector("#story_sliders2");

const prev = document.querySelector(".prevBtn");
const next = document.querySelector(".nextBtn");
let enableClick = true; //재클릭 방지 함수 선언

init(slider1);
init(slider2);

next.addEventListener("click", e=>{
    e.preventDefault();

    if(enableClick){
        enableClick = false;
        nextSlide(slider1);
        nextSlide(slider2);
    } 
});

prev.addEventListener("click", e=>{
    e.preventDefault();

    if(enableClick){
        enableClick = false;
        prevSlide(slider1);
        prevSlide(slider2);
    } 
})

function init(frame){

    const slideCon = frame.querySelector(".slide_con");
    
    slideCon.style.left = "-100%";
    slideCon.prepend(slideCon.lastElementChild);  
}

function nextSlide(frame){

    const slideCon = frame.querySelector(".slide_con");

    new Anim(slideCon, {
        prop: "left",
        value: "-200%",
        duration: 1000,
        callback: ()=>{
            slideCon.style.left = "-100%";
            slideCon.append(slideCon.firstElementChild);
            enableClick = true;
        }
    })
}

function prevSlide(frame){
    const slideCon = frame.querySelector(".slide_con");

    new Anim(slideCon, {
        prop: "left",
        value: "0%",
        duration: 1000,
        callback: ()=>{
            slideCon.style.left = "-100%";
            slideCon.prepend(slideCon.lastElementChild);
            enableClick = true;
        }
    })
}