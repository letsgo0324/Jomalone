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