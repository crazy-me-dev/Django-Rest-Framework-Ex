function initMap() {
  navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      intilize(pos.lat,pos.lng);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

function intilize(a,b){
    var alng = a;  
    console.log(alng);
    console.log('jai hanuman');      
}

console.log('jai hanuman');
