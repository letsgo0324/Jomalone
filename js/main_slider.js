//비주얼 슬라이더
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

//탭 메뉴
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