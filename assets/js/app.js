const appMaps = {
	settings : {
		googleMap : undefined, //objeto de google maps
		googleMapSettings : undefined,
		container : undefined,
		currentPosition : {
			lat : 0,
			lng : 0
		},//posición actual
		buttonGetPosition : undefined, //boton para buscar la posicion
		buttonGetNearPlaces : undefined
	},
	//funcion para inicializar la aplicación
	init : function( settingsUser = {} ){
		console.log('me inicializo :)')

		//cambiando la posicion por defecto
		appMaps.currentPosition = (settingsUser.currentPosition == undefined) ? {
			lat: -9.1191427,
			lng: -77.0349046
		} : settingsUser.currentPosition;

		//cambiando botom
		appMaps.buttonGetPosition = (settingsUser.buttonGetPosition == undefined) ? $('#find-me') : settingsUser.buttonGetPosition;
		appMaps.buttonGetNearPlaces = $('#searchPlaces');

		appMaps.setup();

	},
	setup : function(){

		appMaps.container = document.getElementById("map"), //$('#map');
		appMaps.buttonGetPosition.click( appMaps.getCurrentPosition );
		appMaps.buttonGetNearPlaces.click(appMaps.searchNearPlaces);
		appMaps.googleMapSettings = {
			zoom: 5,
			center: appMaps.currentPosition, //coordenadas en que se mostrará el mapa
			mapTypeControl: false,
			zoomControl: false,
			streetViewControl: false
		}

		appMaps.settings.googleMap = new google.maps.Map( appMaps.container, appMaps.googleMapSettings);
	},
	getCurrentPosition : function ()
	{
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition( appMaps.currentPositionCallbacks.success, appMaps.currentPositionCallbacks.error);
		}
	},
	currentPositionCallbacks : {
		success : function( position ){
			appMaps.currentPosition.lat = position.coords.latitude;
			appMaps.currentPosition.lng = position.coords.longitude;
				let currentPositionMarker = new google.maps.Marker({
				position: appMaps.currentPosition,
				animation: google.maps.Animation.DROP,
				map: appMaps.settings.googleMap
			});

			appMaps.settings.googleMap.setZoom(16);
			appMaps.settings.googleMap.setCenter( appMaps.currentPosition );
		},
		error : function(){
			alert("Tenemos un problema con encontrar tu ubicación");
		}
	},

	//Lugares mas cercanos , con ejemplo de  developers.google.com
	searchNearPlaces : function()
	{
		var service = new google.maps.places.PlacesService(appMaps.settings.googleMap);
        service.nearbySearch({
	          location: new google.maps.LatLng(appMaps.currentPosition.lat, appMaps.currentPosition.lng),
	          radius: 3000,
	          type: ['school']
        }, processResults);

        function processResults(results, status) {
		    if (status === google.maps.places.PlacesServiceStatus.OK) {
		      for (var i = 0; i < results.length; i++) {
		        createMarker(results[i]);
		      }
		    }
		 }
		function createMarker(place) {
	        var placeLoc = place.geometry.location;
	        var marker = new google.maps.Marker({
	          map: appMaps.settings.googleMap,
	          position: place.geometry.location
	        });
	        infowindow = new google.maps.InfoWindow();
	        google.maps.event.addListener(marker, 'click', function() {
	          infowindow.setContent(place.name);
	          infowindow.open(appMaps.settings.googleMap, this);
	        });
	    }
	}
}


appMaps.init();