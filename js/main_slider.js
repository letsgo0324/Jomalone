//비주얼 슬라이더 ---------------------------------------------------------------
const visual = document.querySelector("#visual");
const visualSliders = visual.querySelector(".visual_sliders");
const btnCircle = document.querySelectorAll(".btnCircle li");

btnCircle.forEach((el,index)=>{
    el.addEventListener("click", e=>{
        e.preventDefault();

        let isOn = e.currentTarget.classList.contains("on");
        if(isOn) return;

        new Anim(visualSliders, {
            prop: "margin-left", 
            value: -100 * index + "%",
            duration: 1000
        }); 

        for(let el of btnCircle){
            el.classList.remove("on");
        }
        el.classList.add("on");
    })    
})

//탭 메뉴 ---------------------------------------------------------------
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

//scroll ---------------------------------------------------------------
const sections = document.querySelectorAll("section");
const lenSec = sections.length;
const scrollBtn = document.querySelector("#scrollBtn")
const lis = document.querySelectorAll("#scrollBtn li");
const lis_arr = Array.from(lis);
let posArr = null;
let enableClick = true;
let base = -300;

setPos();

window.addEventListener("mousewheel",e=>{
    e.preventDefault();

    let activeSec = document.querySelector("section.on");
    let arrSec = Array.from(sections);
    let activeIndex = arrSec.indexOf(activeSec);

    if(e.deltaY < 0){
        if(activeIndex == 0) return;
        moveScroll(activeIndex - 1);
    }else{
        if(activeIndex == lenSec - 1) return;
        moveScroll(activeIndex + 1);
    }
    
},{passive:false})

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

    for(let section of sections){
        posArr.push(section.offsetTop);
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