var imagePoints;
var mymap = L.map('map', {'zoomControl': false, 'attributionControl': false, 'dragging': false}).setView([51.505, -0.09], 13);
var visitedPos = [];
var drawpath;
var myLocation;

if(localStorage.visited === undefined || localStorage.visited === "" || localStorage.visited === null ){ // Kollar om det finns några sparade positioner på enheten
	//visitedPos.push(0); // lägger till start 0
}else{
	visitedPos = JSON.parse(localStorage.visited);	//hämtar datan från localStorage och lägger i en array
}
visitedPos=[1,2,3,4,5,6,7,8,9,10,11]; //testrad
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGhlc3dlZGlzaHNjb3V0IiwiYSI6ImNqbmRrMDdzdjBsOGUzcXNmdXZ1Z2xvZHMifQ.7wMj2M1mjUInwuuvFrhM9A', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

//Startar gps och att den aktift kollar
mymap.locate({setView: true, maxZoom: 16, watch: true, enableHighAccuracy: true});

function onLocationFound(e) {
	var radius = e.accuracy / 2;
	if (radius < 5){
		radius = 5;
	}
	if (myLocation === undefined) {
		//ritar en cirkel över positionen
		myLocation = L.circle(e.latlng, radius, {color: "#ff7800", weight: 1}).addTo(mymap);
	}else{
		//Flyttar positionen istället för att göra en ny cirkel
		myLocation.setLatLng(e.latlng);
		myLocation.setRadius(radius);
	}
	// calculate distans to cloasest point
	if(imagePoints !== undefined){ // kollar att det har laddats in några pungter
		var posibaleLocations = [];
		let foundlocation = false;
		//Loppar igenom alla positionerna och plockar ut de som är innom ens område
		for (var i = 0; i <imagePoints.path.length; i ++ ) {
			if(distans(e.latlng, imagePoints.path[i].center) < radius+imagePoints.path[i].storlek/2 ){
				foundlocation = true
				posibaleLocations.push(i);
			}
		} 
		if(foundlocation === false){ //om ingen position hittas stäng spel rutan
		//gameClear()
			for (var i = 0; i <imagePoints.path.length; i ++ ) {
			//imagePoints.path[i].isActive = false
			}
		}else{ // position hittad
			//Vibrera telefon
			window.navigator.vibrate(200); 
			console.log("opening");
			// hitta närmaste positionen
			if (posibaleLocations.length > 1) { // kolla om möjliga platser är fler än 1;
				//loppa igenom alla möjliga positioner och avgör vilken som är närmast
				let closestPos = 0
				let distansToBeat = distans(e.latlng, imagePoints.path[posibaleLocations[0]].center);
				for (var i = 1; i < posibaleLocations.length; i++) {
					let newDistans = distans(e.latlng, imagePoints.path[posibaleLocations[i]].center);
					if(newDistans < distansToBeat){
						distansToBeat = newDistans;
						closestPos = i;
					}
				}
				if(!imagePoints.path[posibaleLocations[closestPos]].isActive){
					imagePoints.path[posibaleLocations[closestPos]].isActive = true
					showImage(imagePoints.path[posibaleLocations[closestPos]])
				}
			}else{
				if(!imagePoints.path[posibaleLocations[0]].isActive){
					imagePoints.path[posibaleLocations[0]].circle.setStyle({fillColor: '#FFFF00'});
					imagePoints.path[posibaleLocations[0]].circle.addEventListener('click', ()=>{
						imagePoints.path[posibaleLocations[0]].isActive = true;
						showImage(imagePoints.path[posibaleLocations[0]]);
					});
					showImage(imagePoints.path[posibaleLocations[0]]);
				}
			}
		}
	}	
}
mymap.on('locationfound', onLocationFound);
function onLocationError(e) {
	if(imagePoints.path){
		mymap.panTo(imagePoints.path[0].center)
	}
	alert(e.message);
}
mymap.on('locationerror', onLocationError);


document.addEventListener("DOMContentLoaded", ()=>{
	var myPath = findGetParameter("path");
	
	if (myPath === null || myPath === undefined) {
		myPath = 3;
		alert("ingen bana vald")
	}
	ajax.get("./php/getImages.php", {'path': myPath}, (data)=>{ // ÄNDRA GET DATAN TILL VAD MAN HAR VALT FÖR STRÄCKA
		imagePoints = JSON.parse(data);
		document.getElementById('pathname').innerText = imagePoints.pathName;
		lineOfOrder();
		for (var i = imagePoints.path.length - 1; i >= 0; i--) {
			addImageMarker(i)
		}
  })
})


function addImageMarker(data) {
	pos = imagePoints.path[data];
	let cir = L.circle(pos.center, 20).addTo(mymap);
	(function(data){
		cir.addEventListener('click', ()=>{
			console.log(imagePoints.path[data]);
			if (visitedPos.includes(imagePoints.path[data].ordning)) {
				imagePoints.path[data].isActive = true;

					//Get by order nr not id
				showImage(imagePoints.path[data]);
			}
		})
	})(data);
	imagePoints.path[data].circle = cir;

}

/*function lineToNextPos(myPos){
  let result = imagePoints.map(a => a.ordning); // hämtar ordningen från aktiva intresse pungter
  let tovisit = difference(visitedPos,result) // plokar bort de pungter som redan är besökta
  tovisit.sort(sortNumber);
  

  var next = findWithAttr(imagePoints, "ordning", tovisit[0])
  var pathToNext = [myPos, imagePoints.path[next].center] //väljer den som är först i listan på obesökta positioner för att dra ett sträck mellan nuvarande position och nesta i listan
  
	if (drawpath != undefined) {
		drawpath.setLatLngs(pathToNext);
		//drawpath.setMap(null);
	}else{
	
	  	// create a red polyline from an array of LatLng points
		
		drawpath = L.polyline(pathToNext, {color: 'red'}).addTo(mymap);
  	}
  //debugger
}*/

function lineOfOrder() {
	var imagesInOrder = imagePoints.path.sort((a,b)=>{return a.ordning-b.ordning;}) 
	var pathToDraw =[];
	for (var i = 0; i < imagesInOrder.length; i++) {
		pathToDraw.push(imagesInOrder[i].center)
	}
	L.polyline(pathToDraw, {color: 'black'}).addTo(mymap);
}













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
	game.innerHTML = "";
	let fig = document.createElement('figure');
	let img = document.createElement('img');
	img.src= "uploads/" + intressepungt.bild;
	let namn = document.createElement('h1');
	namn.innerText = intressepungt.name;
	let closeBTN = document.createElement('a');
	closeBTN.innerText = "X";
	closeBTN.classList.add('close');
	closeBTN.addEventListener('click', (e)=>{
		e.preventDefault();
		intressepungt.isActive = false
		gameClear();
	})
	
	let info = document.createElement('div');
	info.classList.add("FormatedText");
	//let infoPara = document.createElement('p');
	info.innerHTML = intressepungt.biskrivning;
	game.appendChild(namn);
	fig.appendChild(img);
	game.appendChild(fig);
	//info.appendChild(infoPara);
	game.appendChild(info);
	game.appendChild(closeBTN);
	img.addEventListener('click',(e)=>{
		e.stopPropagation();
		fig.classList.add("stor");
	})
	fig.addEventListener('click',(e)=>{
		e.stopPropagation();
		fig.classList.remove("stor"); 
	})
	/*intressepungt.circel.setOptions({
						fillColor: '#00FF00',
						strokeColor: '#00FF00'
					});*/
	updatevisitedpos(intressepungt.ordning);
	//debugger;
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
	//console.log("clear");
	game.classList.remove('show');
	game.innerHTML = "";
}