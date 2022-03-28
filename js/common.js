//햄버거 메뉴
const btnCall = document.querySelector(".btnCall"); 
const menu = document.querySelector(".menu"); 

init();

btnCall.onclick = function(e){
    e.preventDefault(); 

    btnCall.classList.toggle("on"); 
    menu.classList.toggle("on"); 
}

function init(){
    btnCall.classList.add("on");
    menu.classList.add("on");
}