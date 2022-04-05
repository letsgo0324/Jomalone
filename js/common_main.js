//햄버거 메뉴
const btnCallWeb = document.querySelector(".btnCall_wrap.Web .btnCall"); 
const btnCallMo = document.querySelector(".btnCall_wrap.Mo .btnCall"); 
const menuWeb = document.querySelector(".menuWeb_wrap"); 
const menuMo = document.querySelector(".menuMo_wrap"); 
const gnbWeb = menuWeb.querySelector("#gnbWeb");
const gnbWeb_lis = gnbWeb.children;
const gnbMo = menuMo.querySelector("#gnbMo");
const gnbMo_lis = gnbMo.children;

btnCallWeb.onclick = function(e){
    e.preventDefault(); 

    btnCallWeb.classList.toggle("on"); 
    menuWeb.classList.toggle("on"); 

    for(let li of gnbWeb_lis){
        li.addEventListener("mouseenter", e=>{
            const gnbWebSub = e.currentTarget.querySelector(".gnbWebSub");
            gnbWebSub.style.display = "block";

            const depth1 = e.currentTarget.children[0];
            depth1.classList.add("on");
        })
        li.addEventListener("mouseleave", e=>{
            const gnbWebSub = e.currentTarget.querySelector(".gnbWebSub");
            gnbWebSub.style.display = "none";

            const depth1 = e.currentTarget.children[0];
            depth1.classList.remove("on");
        })
    }
}

btnCallMo.onclick = function(e){
    e.preventDefault(); 

    btnCallMo.classList.toggle("on"); 
    menuMo.classList.toggle("on"); 

    for(let li of gnbMo_lis){
        li.addEventListener("mouseenter", e=>{
            const gnbMoSub = e.currentTarget.querySelector(".gnbMoSub");
            gnbMoSub.style.display = "block";

            const depth1 = e.currentTarget.children[0];
            depth1.classList.add("on");
        })
        li.addEventListener("mouseleave", e=>{
            const gnbMoSub = e.currentTarget.querySelector(".gnbMoSub");
            gnbMoSub.style.display = "none";

            const depth1 = e.currentTarget.children[0];
            depth1.classList.remove("on");
        })
    }
}
