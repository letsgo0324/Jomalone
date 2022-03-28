const body = document.querySelector("body");
const youtube = document.querySelector(".youtube_wrap");
const key = "AIzaSyDXkbK7JOz1GmisiXd0C5iKd_FmEK3uk3o";
const playlistId = "PL5cy3lFO3Tzqv8-wDrEB7gyRN3tMcrsO4";
const num = 8; 
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`; 


fetch(url)
.then(data=>{
    return data.json();
})
.then(json =>{
    let items = json.items;
    let result = "";

    items.forEach(item =>{
        let tit = item.snippet.title;
        let desc = item.snippet.description;

        if(tit.length > 50) tit = tit.substr(0,50)+"..."; 
        if(desc.length > 80) desc = desc.substr(0,80)+"...";        

        let date = item.snippet.publishedAt.split("T")[0]; 

        result += `
                <article>
                    <a class="pic" href="#" data-vid="${item.snippet.resourceId.videoId}">
                        <img src="${item.snippet.thumbnails.high.url}">
                        <div class="con">
                            <span>${date}</span>
                            <h3 data-vid="${item.snippet.resourceId.videoId}">${tit}</h3>                            
                            <p>${desc}</p>
                        </div>
                    </a>                 
                </article>
            `;
    })
    
    youtube.innerHTML = result;
});

youtube.addEventListener("click", e=> createPop(e));

body.addEventListener("click", e=> removePop(e));

function createPop(e){
    e.preventDefault();

    if(!e.target.closest("a")) return;

    const vidId = e.target.closest("a").getAttribute("data-vid") 

    let pop= document.createElement("aside");
    pop.innerHTML = `
                        <iframe src="https://youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen>
                        </iframe>
                        <span class="btnClose">CLOSE</span>
    `;

    body.append(pop);
}

function removePop(e){
    const pop = document.querySelector("aside");
    if(pop == null) return;
    const close = pop.querySelector("span");
    if(e.target == close) e.target.closest("aside").remove();
}