/*----------------------------------------------------------------------*\
|-------------------_____----------__--__-______--_____------------------|
|------------------/ ____|---/\---|  \/  |  ____|/ ____|-----------------|
|-----------------| |-------/  \--| \  / | |__  | (___-------------------|
|-----------------| |-|_ |-/ /\ \-| |\/| |  __|--\___ \------------------|
|-----------------| |__| |/ ____ \| |--| | |____-____) |-----------------|
|------------------\_____/_/----\_\_|--|_|______|_____/------------------|
\*----------------------------------------------------------------------*/
var game = document.getElementById('game');
//function isPlaying(audio) { return !audio.paused; }

function showImage(intressepungt) {
    console.log(intressepungt);
    game.classList.add('show');
    let fig = document.createElement('figure');
    let img = document.createElement('img');
    img.src= "uploads/" + intressepungt.bild;
    let namn = document.createElement('h1');
    namn.innerText = intressepungt.name;
    
    let info = document.createElement('div');
    let infoPara = document.createElement('p');
    infoPara.innerText = intressepungt.biskrivning;
    game.appendChild(namn);
    fig.appendChild(img);
    game.appendChild(fig);
    info.appendChild(infoPara);
    game.appendChild(info);
    img.addEventListener('click',(e)=>{
        e.stopPropagation();
        fig.classList.add("stor")
    })
    fig.addEventListener('click',(e)=>{
        e.stopPropagation();
        fig.classList.remove("stor")    
    })
    intressepungt.circel.setOptions({
                        fillColor: '#00FF00',
                        strokeColor: '#00FF00'
                    });
    updatevisitedpos(intressepungt.id);
    debugger;
}
function updatevisitedpos(nr) {
    if(!visitedPos.includes(nr)){
        visitedPos.push(nr);
        localStorage.visited = JSON.stringify(visitedPos);
        visitedPos = JSON.parse(localStorage.visited);
    }
    return true;
}
function gameClear(){
    console.log("clear");
    game.classList.remove('show');
    game.innerHTML = "";
}