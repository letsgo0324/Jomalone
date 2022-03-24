window.addEventListener("load", ()=>{

    const grid = new Isotope(".campaign .sub_content .wrap section", {
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
