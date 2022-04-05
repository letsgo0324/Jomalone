// 롤링배너 --------------------------------------------------------------//
const rolling = document.querySelector("#rolling");
const rollingList = rolling.querySelector("#rolling_list");
const rollingPrev = rolling.querySelector(".rolling_prev");
const rollingNext = rolling.querySelector(".rolling_next");
let num = 0;
let wid = 0;
let timer = null;
let rollingEnableClick = true;

createList("json/data.json");

timer = setInterval(move, 20);

rollingList.addEventListener("mouseenter", ()=>{
    clearInterval(timer);
})
rollingList.addEventListener("mouseleave", ()=>{
    timer = setInterval(move, 20);
})

rollingPrev.addEventListener("click",e=>{
	e.preventDefault();

    if(rollingEnableClick){
	    rollingPrevEl();
        rollingEnableClick = false;
    }
})
rollingNext.addEventListener("click",(e)=>{
	e.preventDefault();

    if(rollingEnableClick){
        rollingNextEl();
        rollingEnableClick = false;
    }
})

rollingPrev.addEventListener("mouseenter",()=>{
    clearInterval(timer);
})
rollingPrev.addEventListener("mouseleave", ()=>{
    timer = setInterval(move, 20);
})
rollingNext.addEventListener("mouseenter",()=>{
    clearInterval(timer);
})
rollingNext.addEventListener("mouseleave", ()=>{
    timer = setInterval(move, 20);
})

function createList(url){
    fetch(url)
    .then(data=>{
        return data.json();
    })
    .catch(err=>{
        console.log("데이터 호출에 실패하였습니다");
    })
    .then(item=>{
        let imgSrc = item.imgSrc;
        let tags = "";

        imgSrc.forEach(item=>{
            tags += `
                    <li>
                        <h2>${item.title}</h2>
                        <a href="#">
                            <img src="${item.thumb}">
                        </a>
                        <p>${item.detail}</p>
                        <span href="#">MORE</span>
                    </li>
            `;
        })

        rollingList.innerHTML = tags;
        initList();
    })
}

function initList(){
    const list_li = rollingList.querySelectorAll("li");
    const len = list_li.length;
    wid = parseInt(getComputedStyle(list_li[0]).width);

    rollingList.style.width = len * wid + "px";
    rollingList.style.marginLeft = -wid + "px";
    rollingList.prepend(rollingList.lastElementChild);
}

function move(){
    if(num < -wid * 2){
        rollingList.append(rollingList.firstElementChild);
        num = -wid;
    }else{
        num -= 2;
    }
    
    rollingList.style.marginLeft = num + "px";
}

function rollingPrevEl(){
    new Anim(rollingList, {
        prop: "margin-left",
        value: 0,
        duration: 500,
        callback: ()=>{
            rollingList.prepend(rollingList.lastElementChild);
            rollingList.style.marginLeft = -wid + "px";
            num = -wid;
            rollingEnableClick = true;
        }
    })
}
function rollingNextEl(){
    new Anim(rollingList, {
        prop: "margin-left",
        value: -wid *2,
        duration: 500,
        callback: ()=>{
            rollingList.append(rollingList.firstElementChild);
            rollingList.style.marginLeft = -wid + "px";
            num = -wid;
            rollingEnableClick = true;
        }
    })
}


//아이콘 카운터 ---------------------------------------------------------------//
counter(".icon_num1", 77, 3000);
counter(".icon_num2", 27, 3000);
counter(".icon_num3", 400, 3000);
counter(".icon_num4", 16, 3000); 

function counter(el, target, time){
    const item = document.querySelector(el);
    let current_num = parseInt(item.innerText);
    let count_num = target - current_num;
    let interval = time / count_num;   

        let timer = setInterval(function(){
            if(current_num === target){
                clearInterval(timer);
                return;
            } 
    
            current_num++;
            item.innerText = current_num;
        }, interval);  
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