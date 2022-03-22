//햄버거 메뉴
const btnCall = document.querySelector(".btnCall"); 
const menuMo = document.querySelector(".menuMo"); 

btnCall.onclick = function(e){
    e.preventDefault(); 

    btnCall.classList.toggle("on"); 
    menuMo.classList.toggle("on"); 
}

//비주얼 슬라이더
const visual = document.querySelector("#visual");
const visualSliders = visual.querySelector(".visual_sliders");
const btnCircle = document.querySelectorAll(".btnCircle li");

btnCircle.forEach((el,index)=>{
    el.addEventListener("click", e=>{
        e.preventDefault();

        let isOn = e.currentTarget.classList.contains("on");
        if(isOn) return;

        new Anime(visualSliders, {
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