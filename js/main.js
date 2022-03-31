const slider1 = document.querySelector(".visual_slider1_wrap");
const slider2 = document.querySelector(".visual_slider2_wrap")
const prev = document.querySelector(".prevBtn");
const next = document.querySelector(".nextBtn");
let enableClickVs = true; //재클릭 방지 함수 선언

init();

next.addEventListener("click", e=>{
    e.preventDefault();

    if(enableClickVs){
        enableClickVs = false;
        nextSlide();
    } 
});

prev.addEventListener("click", e=>{
    e.preventDefault();

    if(enableClickVs){
        enableClickVs = false;
        prevSlide();
    } 
})

function init(){

    const slideCon = slider1.querySelector(".visual_sliders1");
    const slideTxt = slider2.querySelector(".visual_sliders2");
    
    slideCon.style.left = "-100%";
    slideCon.prepend(slideCon.lastElementChild);  

    slideTxt.style.opacity = "1";
    slideTxt.append(slideTxt.firstElementChild);
}

function nextSlide(){

    const slideCon = slider1.querySelector(".visual_sliders1");
    const slideTxt = slider2.querySelector(".visual_sliders2");

    new Anim(slideCon, {
        prop: "left",
        value: "-200%",
        duration: 1000,
        callback: ()=>{
            slideCon.style.left = "-100%";
            slideCon.append(slideCon.firstElementChild);
            enableClickVs = true;
        }
    })
    new Anim(slideTxt, {
        prop: "opacity",
        value: "0",
        duration: 1000,
        callback: ()=>{
            slideTxt.style.opacity = "1";
            slideTxt.append(slideTxt.firstElementChild);
            enableClickVs = true;
        }
    })   
}

function prevSlide(){
    const slideCon = slider1.querySelector(".visual_sliders1");
    const slideTxt = slider2.querySelector(".visual_sliders2");

    new Anim(slideCon, {
        prop: "left",
        value: "0%",
        duration: 1000,
        callback: ()=>{
            slideCon.style.left = "-100%";
            slideCon.prepend(slideCon.lastElementChild);
            enableClickVs = true;
        }
    })
    new Anim(slideTxt, {
        prop: "opacity",
        value: "0",
        duration: 1000,
        callback: ()=>{
            slideTxt.style.opacity = "1";
            slideTxt.prepend(slideTxt.lastElementChild);
            enableClickVs = true;
        }
    })
}


//탭 메뉴 ---------------------------------------------------------------//
const tab = document.querySelector("#tab");
const dts = tab.querySelectorAll("dt");
const dds = tab.querySelectorAll("dd");
const dtsFocus = tab.querySelectorAll("dt>a");

dtsFocus.forEach((el,index)=>{

    el.addEventListener("focusin", ()=>{
        
        activation(index, dts);
        activation(index, dds);
    })
})

dts.forEach((dt,index)=>{

    dt.addEventListener("click", e=>{
        e.preventDefault();

        let isOn = e.currentTarget.classList.contains("on");
        if(isOn) return;

        activation(index, dts);
        activation(index, dds);
    })
})

function activation(index, items){
    for(let el of items){
        el.classList.remove("on");
    }
    items[index].classList.add("on");    
}

//스크롤 ---------------------------------------------------------------//
const sections = document.querySelectorAll("section", "header");
const scrollBtn = document.querySelector("#scrollBtn")
const lis = document.querySelectorAll("#scrollBtn li");
const lis_arr = Array.from(lis);
let posArr = null;
let enableClick = true;
let base = -500;


setPos();

window.addEventListener("resize",()=>{
    setPos();
})

lis.forEach((li,index)=>{

    li.addEventListener("click", e=>{

        let isOn = e.currentTarget.classList.contains("on");
        if(isOn) return;
        
        if(enableClick){
            moveScroll(index); 
            enableClick = false;
        }
    })
})

window.addEventListener("scroll", e=>{
    activationScroll();
})

function setPos(){
    posArr = [];

    const headerHt = document.querySelector("header").offsetHeight;

    if(sections.offsetTop == 0){
        posArr.push(section.offsetTop + headerHt);
        return; 
        //첫화면 로딩시 section[1]부터 시작하는 문제 수정
    }else{
        for(let section of sections){
            posArr.push(section.offsetTop);
        } return;
    }    

    const active = scrollBtn.querySelector("li.on");
    const activeIndex = lis_arr.indexOf(active);

    window.scroll(0,posArr[activeIndex]);
}

function moveScroll(index){
    new Anim(window,{
        prop: "scroll",
        value: posArr[index],
        duration: 500,
        callback: ()=>{
            enableClick = true;
        }
    })
}

function activationScroll(){
    let scroll = window.scrollY || window.pageYOffset;

    sections.forEach((section, index)=>{
        
        if(scroll >= posArr[index] + base){

            for(let li of lis){
                li.classList.remove("on");
            }
            lis[index].classList.add("on");

            for(let section of sections){
                section.classList.remove("on");
            }
            sections[index].classList.add("on");
        }
    })
}

//팝업 ---------------------------------------------------------------//
const popup = document.querySelector("#popup");
const btnClose = popup.querySelector(".btnClose");
const isCookie = document.cookie.indexOf("today=anymore");
let isOn;

(isCookie == -1) ? isOn = "block" : isOn = "none";
popup.style.display = isOn;

btnClose.addEventListener("click",e=>{
    e.preventDefault();

    let isChecked = popup.querySelector("input[type=checkbox]").checked;
    if(isChecked) setCookie("today","anymore",1);

    popup.style.display = "none";
})

function setCookie(name, value, due){
    const today = new Date();
    const day = today.getDate();
    today.setDate(day + due);
    const duedate = today.toGMTString();  

    document.cookie = `${name}=${value}; path=/; expires=${duedate}`;
}