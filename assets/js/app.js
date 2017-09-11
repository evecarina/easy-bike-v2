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


}


appMaps.init();