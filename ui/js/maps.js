link = 'http://ec2-52-10-211-130.us-west-2.compute.amazonaws.com/api/'
//get the users

function getUsersInDanger()
{
	//alert('In here');
	$.ajax({
	type: "GET",
	url : link + "people",
	//data: "people",
	success: updateMap
	
	});

}

//get the help centers
function getHelpCenters()
{
	$.ajax({
	type: "POST",
	url : link,
	data: "helpCenters",
	success: updateMap
	
	});


}

//draw the map initially 
function drawMap()
{
		
	var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
	var mapOptions = {
	    zoom: 4,
	    center: myLatlng
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	//google.maps.event.trigger(map, 'resize');
	
	
}

function getAvgLatLong(markers)
{

	var avgLat = 0.0 ;
	var avgLong = 0.0	;

	for (i=0;i<markers.length;i++)
	{
		avgLat += markers[i]['latitude'];
		avgLong+= markers[i]['longitude'];
	}
	
	avgLat /= markers.length;
	avgLong /= markers.length;
	
	return [avgLat, avgLong];

}

function updateMap(mlist)
{
	//markers = [{"latitude": -25.36 ,"longitude": 131.04},{"latitude": -30.36 ,"longitude": 151.04},{"latitude": -35.36 ,"longitude": 171.04}];
	markers = mlist
	//markers = JSON.parse(mlist);
	avg = getAvgLatLong(markers);
	
	latLong = new google.maps.LatLng(avg[0],avg[1]);
	
	var mapOptions = {
	    zoom: 4,
	    center: latLong
	};

	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	for (i=0;i<markers.length;i++)
	{
		latLong = new google.maps.LatLng(markers[i]['latitude'],markers[i]['longitude']);
		
		var marker = new google.maps.Marker({
   	   position: latLong,
   	   map: map,
   	   title: "p"+i		
		});
  	}
  	
  	google.maps.event.trigger(map, 'resize');
	
	
	//set the number of people
	document.getElementById('people').innerHTML = markers.length;
	document.getElementById('time').innerHTML = new Date();
	getPlace(avg[0],avg[1]);
	
	
}

google.maps.event.addDomListener(window, 'load', drawCircle);


function drawCircle()
{
	
	var citymap = {};

	citymap['London'] = {
   center: new google.maps.LatLng(51.5072, 0.1275),
   population: 9995837
	}

	var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(50.09024, 0.002891),
    mapTypeId: google.maps.MapTypeId.TERRAIN
   };

   var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Construct the circle for each value in citymap.
  // Note: We scale the area of the circle based on the population.
  for (var city in citymap) {
    var populationOptions = {
      strokeColor: '#FFFF33',
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: '#FFFF33',
      fillOpacity: 0.35,
      map: map,
      center: citymap[city].center,
      radius: Math.sqrt(citymap[city].population) * 100
    };
    // Add the circle for this city to the map.
    cityCircle = new google.maps.Circle(populationOptions);
	};
	
	for (i = 0 ; i < 50;i++)
		continue;
		
	getUsersInDanger()

}


function getPlace(lat, lng)
{
	var geocoder ;
	geocoder = new google.maps.Geocoder();
   var latlng = new google.maps.LatLng(lat, lng);
   geocoder.geocode({'latLng': latlng}, function(results, status)
   {
   	if (status == google.maps.GeocoderStatus.OK) {
			if (results[0]) {
				var add = results[0].formatted_address;
				var value = add.split(",");
				count = value.length;
				country = value[count - 1];
				state = value[count - 2];
				city = value[count - 3];
				document.getElementById('place').innerHTML = city+', ' + country;
	
			} 
			else {
				document.getElementById('place').innerHTML= "address not found";
			}
		} else {
	}	
  });

}


