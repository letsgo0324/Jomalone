var swiper = new Swiper(".shopSwiper", {
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        539: {
            slidesPerView: 1,
        },
        1024: {
            slidesPerView: 2,
        },
        1179: {
            slidesPerView: 3,
        }
    }
});

window.addEventListener("load", ()=>{

    const grid = new Isotope(".shopping .sub_content .wrap section", {
        itemSelector : "article",
        columnWidth : "aritcle",
        transitionDuration : "0.6s"
    })
    
    const sortBtns = document.querySelectorAll(".sortBtn li");

    for(let el of sortBtns){    
        el.addEventListener("click", e=>{
            e.preventDefault();

            const sort = e.currentTarget.querySelector("a").getAttribute("href");
            
            grid.arrange({
                filter:sort
            });
 
            for(let el of sortBtns){
                el.classList.remove("on");
            }
            e.currentTarget.classList.add("on");
        });
    }
});