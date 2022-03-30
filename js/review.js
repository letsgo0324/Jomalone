const body = document.querySelector("body");
const frame = document.querySelector(".review_wrap");
const loading = document.querySelector(".loading");
const base = "https://www.flickr.com/services/rest/?";
const key = "7896b34c0ad4a7a716ed06e4e20bbe72";
const per_page = 40;
const username = "195365059@N08";
const gallery = "72157720546409031";
const method_gallery = "flickr.galleries.getPhotos";
const url_gallery = `${base}method=${method_gallery}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${username}&gallery_id=${gallery}`; 


fetch(url_gallery)
.then(data =>{
    return data.json();
})
.then(json =>{
    const items = json.photos.photo;
    createList(items);
    imgLoaded();
    
})

frame.addEventListener("click",e=>{
    e.preventDefault();

    let selectThumb = e.target.closest(".item").querySelector(".thumb img");

    if(e.target == selectThumb){
        let imgSrc = e.target.parentElement.getAttribute("href");

        let pop = document.createElement("aside");
        pop.classList.add("pop");
        let pops = `
                    <div class="con">
                        <img src="${imgSrc}">
                    </div>
                    <span class="btnClose">CLOSE</span>
        `;
        
        pop.innerHTML = pops;
        body.append(pop);
        body.style.overflow = "hidden";
    }    
})

body.addEventListener("click", e=>{
    let pop = body.querySelector(".pop");

    if(pop){
        let btnClose = pop.querySelector(".btnClose");
        if(e.target == btnClose){
            pop.remove();
            body.style.overflow = "auto";
        }
    }    
})


function createList(items){
    let htmls = "";
    
    items.forEach(data=>{
        htmls += `
                <article class="item">
                    <div>

                        <div class="profile">
                            <img src="http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg">
                            <span>${data.owner}</span>
                        </div>   

                        <a href="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg" class="thumb">
                            <img src="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg">
                        </a>                                       

                        <p>${data.title}</p>
                    </div>
                </article>
        `;
    })

    frame.innerHTML = htmls;
}

function imgLoaded(){
    const thumbs = document.querySelectorAll(".thumb img");
    const len = thumbs.length;
    let count = 0;

    thumbs.forEach(thumb=>{
        thumb.onerror = ()=>{
            thumb.setAttribute("src","../img/flickr_img.jpg");
        }

        thumb.onload = ()=>{
            count++;
            if(count === len){

                new Isotope(frame, {
                    itemSelector : ".item",
                    columnWidth : ".item",
                    transitionDuration : "0.8s"
                });

                frame.classList.add("on");
                loading.classList.add("off");
            }
        }
    })

    const buddies = document.querySelectorAll(".profile img");
    buddies.forEach(buddy=>{
        buddy.onerror =()=>{
            buddy.setAttribute("src", "https://www.flickr.com/images/buddyicon.gif");
        }
    })
}