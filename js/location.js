var mapContainer = document.getElementById('map'),
    mapOption = { 
        center: new kakao.maps.LatLng(37.49707613625719, 127.0287179893017),
        level: 3
    };
var map = new kakao.maps.Map(mapContainer, mapOption); 
const branch_btns = document.querySelectorAll(".locationTop .wrap ul li") 

var markerOptions = [
    {
        title : "OFFICE", 
        latlng : new kakao.maps.LatLng(37.49707613625719, 127.02871798930177), 
        imgSrc : "img/marker_img.png", 
        imgSize : new kakao.maps.Size(50,50), 
        imgPos : {offset : new kakao.maps.Point(25,25)}, 
        content : `
                    <h1>ELCA KOREA</h1>
                    <p>382, Gangnam-daero, Gangnam-gu, Seoul</p>
                    <span>051-745-1356</span>
                `,
        button : branch_btns[0] 
    },
    {
        title : "SEOUL", 
        latlng : new kakao.maps.LatLng(37.52842775291810, 127.04013376228899), 
        imgSrc : "img/marker_img.png", 
        imgSize : new kakao.maps.Size(50,50), 
        imgPos : {offset : new kakao.maps.Point(25,25)}, 
        content : `
                    <h1>Galleria Department Store WEST</h1>
                    <p>343, Apgujeong-ro, Gangnam-gu, Seoul</p>
                    <span>02-6905-3767</span>
                `,
        button : branch_btns[1] 
    },
    {
        title : "GYEONGGI", 
        latlng : new kakao.maps.LatLng(37.39278593076433, 127.11203338020852), 
        imgSrc : "img/marker_img.png", 
        imgSize : new kakao.maps.Size(50,50), 
        imgPos : {offset : new kakao.maps.Point(25,25)}, 
        content : `
                    <h1>Hyundai Department Store Pangyo</h1>
                    <p>20, Pangyoyeok-ro 146beon-gil, Gyeonggi-do</p>
                    <span>031-5170-2128</span>
                `,
        button : branch_btns[2] 
    },
    {
        title : "INCHEON", 
        latlng : new kakao.maps.LatLng(37.44240780756811, 126.70150605188941), 
        imgSrc : "img/marker_img.png", 
        imgSize : new kakao.maps.Size(50,50), 
        imgPos : {offset : new kakao.maps.Point(25,25)}, 
        content : `
                    <h1>Lotte Department Store Incheon Terminal</h1>
                    <p>35, Yeonnam-ro, Michuhol-gu, Incheon</p>
                    <span>032-242-2067</span>
                `,
        button : branch_btns[3] 
    },
    {
        title : "BUSAN", 
        latlng : new kakao.maps.LatLng(35.16864668129417, 129.12904327861486), 
        imgSrc : "img/marker_img.png", 
        imgSize : new kakao.maps.Size(50,50), 
        imgPos : {offset : new kakao.maps.Point(25,25)}, 
        content : `
                    <h1>Shinsegae Department Store Centum City</h1>
                    <p>35, Centum nam-daero, Haeundae-gu, Busan</p>
                    <span>051-745-1356</span>
                `,
        button : branch_btns[4] 
    }
]

for(let i=0; i<markerOptions.length; i++){
    new kakao.maps.Marker({
        map : map,
        position : markerOptions[i].latlng,
        title : markerOptions[i].title,
        image : new kakao.maps.MarkerImage(markerOptions[i].imgSrc,markerOptions[i].imgSize, markerOptions[i].imgPos)
    });
    
    markerOptions[i].button.addEventListener("click",e=>{
        e.preventDefault();

        for(let btn of branch_btns){
            btn.classList.remove("on");
        }
        branch_btns[i].classList.add("on");

        moveTo(markerOptions[i].latlng);
    });

    var content = `
                    <div class="customoverlay">
                       ${markerOptions[i].content}
                    </div>
    `;
    var position = markerOptions[i].latlng;  
    var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
        yAnchor: 1 
    });
}

window.addEventListener("resize", ()=>{
    let active_btn = document.querySelector(".locationTop .wrap ul li.on");
    let active_index = active_btn.getAttribute("data-index");

    map.setCenter(markerOptions[active_index].latlng);  
})

setDraggable(true);
setZoomable(true);

function setDraggable(draggable) {
    map.setDraggable(draggable);    
}

function setZoomable(zoomable) {
    map.setZoomable(zoomable);    
}

function moveTo(target){
    var moveLatLon = target; 
    map.setCenter(moveLatLon); 
}