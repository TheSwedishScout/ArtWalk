/*screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;

if (screen.lockOrientationUniversal("portrait")) {
  // orientation was locked
} else {
  // orientation lock failed
}*/

      var map; //skapa en variable att spara kartan i, skaar den utanför då den behövs i flera olika funktioner
      var draws = 0; //en variabel som sparar värdet på hur många gånger som positionen hämtats
      var myCirkel;  // en variabel att spara den utritade positionen för att nolla den gamla innan en ny skapas
      var wpid;
      var intressePungter = []; 
      var visitedPos = [];
      var drawpath;
if(localStorage.visited !== undefined){
  visitedPos = JSON.parse(localStorage.visited);
}
function distans(myPos, toPos){
  /*
  code to calculate the distance betwene 2 gps cordinates is fetched from
  http://www.movable-type.co.uk/scripts/latlong.html 
  and simplified to make me figure out whats hapening
  */
  lng1 = myPos.lng;
  lat1 = myPos.lat;
  lng2 = toPos.lng;
  lat2 = toPos.lat;
  var R = 6371e3; // metres around the equator
  var latitude1 = lat1*(Math.PI / 180); // get latitude in radians
  var latitude2 = lat2*(Math.PI / 180);
  var deltaLatitude = (lat2-lat1)*(Math.PI / 180); 
  var deltaLongitude  = (lng2-lng1)*(Math.PI / 180);

  var a = Math.sin(deltaLatitude/2) * Math.sin(deltaLatitude/2) + Math.cos(latitude1) * Math.cos(latitude2) * Math.sin(deltaLongitude /2) * Math.sin(deltaLongitude /2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}
function drawLocation(position){ // draw your location o the map and runs the distans calculations
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  console.log(position)

  map.setCenter(pos); //centrerar kartan för positionen

  if (draws > 0) {
    myCirkel.setMap(null); // döljer din gamla position
  }
  myCirkel = new google.maps.Circle({
    strokeColor: '#1FD02A',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#1FD02A',
    fillOpacity: 0.35,
    map: map,
    center: pos,
    radius: (position.coords.accuracy/2 > 10 ? position.coords.accuracy/2 : 10 )
  });

    document.getElementById("beenTo").innerText = JSON.stringify(visitedPos);

  var maxDistansToEvent = (position.coords.accuracy/2 > 10 ? position.coords.accuracy/2 : 10 );
   
  //var box = document.getElementById("box");
  var posibaleLocations = []
  let foundlocation = false
  for (var i = 0; i <intressePungter.length; i ++ ) {
      console.log(distans(pos, intressePungter[i].center))
      console.log(maxDistansToEvent+intressePungter[i].storlek/2);
      if(distans(pos, intressePungter[i].center) < maxDistansToEvent+intressePungter[i].storlek/2 ){
        foundlocation = true
        posibaleLocations.push(i);
      }else{
        //Draw line to next location
        lineToNextPos(pos);
      }

      //console.log(intressePungter[i].name + " " + distans(pos, intressePungter[i].center));
      //box.innerText = intressePungter[2].name + " " + distans(pos, intressePungter[2].center);
  } 
  if(foundlocation === false){
    gameClear()
    for (var i = 0; i <intressePungter.length; i ++ ) {
      intressePungter[i].isActive = false
    }
  }else{ // position hittad
    // hitta närmaste positionen
    if (posibaleLocations.length > 1) { // kolla om möjliga platser är fler än 1;
      //loppa igenom alla möjliga positioner och avgör vilken som är närmast
      let closestPos = 0
      let distansToBeat = distans(pos, intressePungter[posibaleLocations[0]].center);
      for (var i = 1; i < posibaleLocations.length; i++) {
        let newDistans = distans(pos, intressePungter[posibaleLocations[i]].center);
        if(newDistans < distansToBeat){
          distansToBeat = newDistans;
          closestPos = i;
        }
      }
      if(!intressePungter[posibaleLocations[closestPos]].isActive){
          intressePungter[posibaleLocations[closestPos]].isActive = true
          showImage(intressePungter[posibaleLocations[closestPos]])
      }
      console.log(posibaleLocations)
    }else{
      console.log(posibaleLocations)
      if(!intressePungter[posibaleLocations[0]].isActive){
          debugger
          //intressePungter[posibaleLocations[0]].isActive = true
          //showImage(intressePungter[posibaleLocations[0]])
      }
    }

  }
  
  //console.log(draws);

draws++ // ökar antalet draws som har gjorts
}
function geo_error(error){ // ger medelanden vid errors
  /*
  1 = blocked
  2 = unavalebale
  3 = timeout
  */
  if (error.code === 1) {
    alert('unable to get location')
  }
  if (error.code === 3) {
    alert('Timeout');
  }
}
function myLocation(){ // whit sucsessfully got location
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    var geo_options = {
      enableHighAccuracy: true, //true 
      maximumAge        : 30000
    };
    // get position whit parameters above
    wpid=navigator.geolocation.watchPosition(drawLocation,geo_error,geo_options);
      
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}
function lineToNextPos(myPos){
  let result = intressePungter.map(a => a.ordning); // hämtar ordningen från aktiva intresse pungter
  let tovisit = difference(visitedPos,result) // plokar bort de pungter som redan är besökta
  

  var next = findWithAttr(intressePungter, "ordning", tovisit[0])
  var pathToNext = [myPos, intressePungter[next].center] //väljer den som är först i listan på obesökta positioner för att dra ett sträck mellan nuvarande position och nesta i listan
  
  if (drawpath != undefined) {
    drawpath.setMap(null);
  }
  drawpath = new google.maps.Polyline({
    path: pathToNext,  // positions object
    geodesic: true,
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  drawpath.setMap(map);
}

function init() { // map ready
    
  
}
function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}
function difference(arr1, arr2){
  let diff = [];
  if(arr1.length > arr2.length){
    for (var i = 0; i < arr1.length; i++) {
      
      if(!arr2.includes(arr1[i])){
            diff.push(arr1[i])
      }
    }
  }else{
    for (var i = 0; i < arr2.length; i++) {
      
      if(!arr1.includes(arr2[i])){
            diff.push(arr2[i])
      }
    }
  }
  //diff = diff.concat(arr2);
  return diff;
}

function initMap() {
  // Create the map.
  navigator.geolocation.getCurrentPosition(startLocation,geo_error ,{
    enableHighAccuracy: true, 
    maximumAge        : 30000, 
    timeout           : 2700000
  });
  function startLocation(position) {
    
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    var zoom = 18;

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoom,
      center: pos, // din start position var den fick positionen från första hemtnigen
      mapTypeId: 'roadmap',
      disableDefaultUI: false, //true
      draggable: true, //false
      scrollwheel: false, // false
      panControl: false, //false
      //maxZoom: zoom,
      //minZoom: zoom,


      // style generated on https://snazzymaps.com/
      
    });
    

   

    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the storlek.
    loadDoc("./php/getImages.php", (data)=>{
      intressePungter = data
      
      for (var location in intressePungter) {
        // Add the circle for this city to the map.
        var locationCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: intressePungter[location].center,
          radius: Math.sqrt(intressePungter[location].storlek)
        });
        intressePungter[location].circel = locationCircle;
      }
    })
    myLocation();
    //document.addEventListener("DOMContentLoaded", myLocation);
  }
        
}




