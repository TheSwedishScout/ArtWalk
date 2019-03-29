var intressePungter;
var map;
var tempMarker;

function initMap() {
  // Create the map.
  navigator.geolocation.getCurrentPosition(startLocation,geo_error ,{
	enableHighAccuracy: true, 
	maximumAge        : 30000, 
	timeout           : 2700000
  });
  function startLocation(position) {
	console.log(position);
	var pos = {
	  lat: position.coords.latitude,
	  lng: position.coords.longitude
	};
	//var zoom = 18;

	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 18,
	  center: pos, // din start position var den fick positionen från första hemtnigen
	  
	  mapTypeId: 'roadmap',
	  disableDefaultUI: false, //true
	  draggable: true, //false
	  scrollwheel: true, // false
	  panControl: true, //false
	  //maxZoom: zoom,
	  //minZoom: zoom,
	  

	  // style generated on https://snazzymaps.com/
	  
	});
	
	//loadDoc("./php/getImages.php", drawLocations)
	
	ajax.get("../php/getImages.php", {'path':1}, drawLocations) //SELECTED PATH

	// Construct the circle for each value in citymap.
	// Note: We scale the area of the circle based on the storlek.
   
	//myLocation();
	//document.addEventListener("DOMContentLoaded", myLocation);
	afterMap();
  }
  document.getElementById('satellite').addEventListener("click", (e)=>{
	e.preventDefault();
	map.setMapTypeId('satellite');
	
  })
  document.getElementById('road').addEventListener("click", (e)=>{
	e.preventDefault();
	map.setMapTypeId('roadmap');
	
  })

  /*-------------------------------------------------FORM INPUT-------------------------------------------------*/
  /*-------------------------------------------------FORM INPUT-------------------------------------------------*/
  /*-------------------------------------------------FORM INPUT-------------------------------------------------*/
  /*-------------------------------------------------FORM INPUT-------------------------------------------------*/
  /*-------------------------------------------------FORM INPUT-------------------------------------------------*/
  document.getElementById('addNewImage').addEventListener("submit", (e)=>{
	e.preventDefault();

	var text = CKEDITOR.instances.text.getData();
	var form = e.target;
	var MyFormData = new FormData(e.target);
	MyFormData.set('biskrivning', text);
	console.log(text);
	var xhr = new XMLHttpRequest();
	// Open the connection.
	var btn = e.target.lastElementChild;
	xhr.open('POST', 'assets/InsertNewImage.php', true);
	// Set up a handler for when the request finishes.
	xhr.onload = function (e) {
	  if (xhr.status === 200) {
		// File(s) uploaded.
		var response =  e.srcElement.responseText;
		console.log(response);
		data = JSON.parse(response);
		if(data.sucsses){
		  btn.removeAttribute("disabled")
		  btn.value = "Spara"
		  get_selectebale_images();
		  form.reset();
		}else{
		  console.log(data.error);
		}
	  } else {
		alert('An error occurred!');
	  }
	};
	// Send the Data.
	// (url, callback, method, data, async)
	xhr.send(MyFormData);
	btn.value = "laddar..."
	btn.disabled = "disabled";
	
  });

  document.getElementById('addPath').addEventListener("submit", (e)=>{
	e.preventDefault();
	//addNewPath.php
	var path = document.getElementById('newPathName').value;
	var ajaxData = {"path": path};
	
	ajax.post("assets/addNewPath.php", ajaxData, (data)=>{
		data = JSON.parse(data);
		if (data.result == true) {

		}else{
			alert(data.error);
		}
	})


  })

  document.getElementById('addToPath').addEventListener('submit', (e)=>{
	e.preventDefault();
	var bildId = document.getElementById('addtopath-bild')
	var pathId = document.getElementById('addtopath-path')
	var ordning = document.getElementById('addtopath-ordning')
	var lng = document.getElementById('addtopath-lng')
	var lat = document.getElementById('addtopath-lat')
	var MyFormData = {"bild": bildId.value, "path": pathId.value, "ordning": ordning.value, "lng": lng.value, "lat": lat.value }
	console.log(MyFormData);
	ajax.post("assets/addPointToPath.php", MyFormData, (data)=>{
	  var data = JSON.parse(data);
	  if (data.result){
		//unlock submit
		//draw circel on map
		ajax.get("../php/getImages.php", {"path": pathId}, drawLocations);
	  }else{
		//print error
		console.log(data.error)
	  }
		console.log(data)
	})
  });
  document.getElementById('addtopath-path').addEventListener('change', (e)=>{

	ajax.get("../php/getImages.php", {"path": e.target.value}, drawLocations);
  })
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
function drawLocations(data){
  if(intressePungter !== undefined){
	//plocka bort gamla makörer
	for(var location2 in intressePungter.path){
	  intressePungter.path[location2].marker.setMap(null);
	}
  }
  
	if (typeof data == "string") {
	  intressePungter = JSON.parse(data);
	}
   for (var location in intressePungter.path) {
	  // Add the circle for this city to the map.
	  if(intressePungter.path[location].marker == undefined){ //om kartan inte har en makör redan så skapa en ny
		var locationCircle = new google.maps.Circle({
		  strokeColor: '#FF0000',
		  strokeOpacity: 0.8,
		  strokeWeight: 2,
		  fillColor: '#FF0000',
		  fillOpacity: 0.35,
		  map: map,
		  center: intressePungter.path[location].center,
		  radius: Math.sqrt(100)
		  // radius: Math.sqrt(intressePungter[location].storlek)
		});
		intressePungter.path[location].marker = locationCircle;
	  }
	}
}
function afterMap(){
	map.addListener('click', function(e) {
		editPoint(e.latLng)
	})
	function editPoint(latLng){
	  var lat = latLng.lat()
	  var lng = latLng.lng()
	  var long = document.getElementsByClassName('lon');
	  var lati = document.getElementsByClassName('lat');   
	  for (let i=0; i<long.length; i++) {
		long[i].value = lng;
	  };
	  for (let i=0; i<lati.length; i++) {
		lati[i].value = lat;
	  };
	  
	  
	  if(tempMarker){
		tempMarker.setMap(null);
	  }
	  tempMarker = new google.maps.Marker({
		position: latLng,
		map: map,
		title: 'Hello World!',
		draggable:true,
	  });
	  tempMarker.addListener('dragend', (e)=>{
		editPoint(e.latLng)
	  });

	};/*
	var flightPlanCoordinates = [ // pungter från rutten (path)
		  {lat: 57.707596641413566, lng: 12.94587054096985},
		  {lat: 21.291, lng: -157.821},
		  {lat: -18.142, lng: 178.431},
		  {lat: -27.467, lng: 153.027}
		];
		var flightPath = new google.maps.Polyline({
		  path: flightPlanCoordinates,
		  geodesic: true,
		  strokeColor: '#FF0000',
		  strokeOpacity: 1.0,
		  strokeWeight: 2
		});

		flightPath.setMap(map);*/
		get_selectebale_images();
	
	document.getElementById('addtopath-bild').addEventListener('change', (e)=>{
	  var prewievBild = e.target.options[e.target.selectedIndex].dataset.bild;
	  document.getElementById('prewiev').src = "../uploads/"+prewievBild
	})
}
function get_selectebale_images() {
  ajax.get("assets/select_bild.php", "", (data)=>{
	  data = JSON.parse(data);
	  var selectElem = document.getElementById('addtopath-bild');
	  selectElem.innerHTML = ""; // töm selecten
	  for (var i = 0; i < data.length; i++) {
		var optElem = document.createElement('option');
		optElem.value = data[i].id;
		optElem.innerText = data[i].rubrik;
		optElem.dataset.bild = data[i].bild;
		selectElem.appendChild(optElem);
		
		data[i]
	  }
	  //Lägg til options i addtopath-bild
	  //<option value="ID" data-bild = "Bildens fil namn">RUBRIK</option>

	  //Visa den första bilden i miniatyr
	  var prewiew = document.getElementById('prewiev');
	  prewiew.src = "../uploads/"+data[0].bild;
	  //<img id="prewiev" src="../uploads/<?php echo( $bild1); ?>" width="50px" height="auto">
	})
}
document.addEventListener("DOMContentLoaded",()=>{
  //document.getElementById('text').
  CKEDITOR.replace( 'biskrivning' );
})