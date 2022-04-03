//햄버거 메뉴
const btnCallWeb = document.querySelector(".btnCall_wrap.Web .btnCall"); 
const btnCallMo = document.querySelector(".btnCall_wrap.Mo .btnCall"); 
const menuWeb = document.querySelector(".menuWeb_wrap"); 
const menuMo = document.querySelector(".menuMo_wrap"); 
const menuWebLi = menuWeb.querySelector("#gnbWeb");

btnCallWeb.onclick = function(e){
    e.preventDefault(); 

    btnCallWeb.classList.toggle("on"); 
    menuWeb.classList.toggle("on"); 
}
btnCallMo.onclick = function(e){
    e.preventDefault(); 

    btnCallMo.classList.toggle("on"); 
    menuMo.classList.toggle("on"); 
}
