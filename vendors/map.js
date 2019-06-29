function map(markers_o){
   let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: new google.maps.LatLng(parseFloat(markers_o[0][0]), parseFloat(markers_o[0][1])),
        mapTypeId: google.maps.MapTypeId.ROADMAP
   });
   
   var infowindow = new google.maps.InfoWindow;
   
   var marker, i;
   
   for (i = 0; i < markers_o.length; i++) {  
       marker = new google.maps.Marker({
            position: new google.maps.LatLng(parseFloat(markers_o[i][0]), parseFloat(markers_o[i][1])),
            map: map,
            zoom:16
       });
   
       google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(markers_o[i][0] , markers_o[i][1]);
                infowindow.open(map, marker);
            }
       })(marker, i));
   }
}
let directionDisplay;
let directionsService = new google.maps.DirectionsService();

function map1(markers) {
 
    directionsDisplay = new google.maps.DirectionsRenderer();
    var myOptions = {
        zoom: 22,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    map = new google.maps.Map(document.getElementById("map1"), myOptions);
    directionsDisplay.setMap(map);
    calcRoute(markers);
}

function calcRoute(markers) {
    var first = new google.maps.LatLng(parseFloat(markers[0][0]), parseFloat(markers[0][1]));
    var second = new google.maps.LatLng(parseFloat(markers[markers.length-1][0]), parseFloat(markers[markers.length-1][1]));

    var request = {
        origin: "1521 NW 54th St, Seattle, WA 98107 ",
        destination: "San Diego, CA",
        waypoints: [{location: first, stopover: false},
            {location: second, stopover: false}],
        optimizeWaypoints: true,
        travelMode: google.maps.DirectionsTravelMode.WALKING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById("directions_panel");
            summaryPanel.innerHTML = "";
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += "<b>Route Segment: " + routeSegment + "</b><br />";
                summaryPanel.innerHTML += route.legs[i].start_address + " to ";
                summaryPanel.innerHTML += route.legs[i].end_address + "<br />";
                summaryPanel.innerHTML += route.legs[i].distance.text + "<br /><br />";
            }
        } else {
            alert("Put an google map api key with directions  api enabled in index.html ,  to get directions also");
        }
    });
}