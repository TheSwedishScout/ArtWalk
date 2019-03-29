function loadDoc(url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	let json =JSON.parse(this.responseText)
    	callback(json)
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
// AJAX CODE FROM https://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery
var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    
    x.send(data)
};

ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

ajax.post = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), async)
};
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
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

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}
function sortNumber(a,b) {
        return a - b;
    }