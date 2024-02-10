<!-- map code here -->
{
	 "use strict";
		 
	// base maps
	    var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
						maxZoom: 20,
						attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					});
};

// Helper functions for the tree layer : markers, popup

         function treeMarker(feature, latlng)
	     { 
		     var geojsonMarkerOptions = {
					radius: 6,
					fillColor: "#222222",
					color: "#000",
					weight: 1,
					opacity: 0.9,
					fillOpacity: 0.8,
					riseOnHover: true,
					riseOffset: 500,
  				    alt: feature.properties.StreetAddress,
					title: feature.properties.description
					};
			  return L.circleMarker(latlng, geojsonMarkerOptions);
	         
	     };
		 // layer with bunch sizes
		   function bunchMarker(feature, latlng)
	     { 
			var theIcon = L.divIcon({  html: feature.properties["Used for total counted"],
			  className: "svg-icon",
			  iconSize: [20,30],
			  iconAnchor: [10,20]
			});
	         return L.marker(latlng, 
			                 {icon: theIcon,
							 riseOnHover: true,
							 riseOffset: 500,
							 opacity: 0.9,
							  alt: feature.properties.StreetAddress,
							 title: feature.properties["Used for total counted"]});
	     };
		 function trailMarker(feature, latlng) {
			 var geojsonMarkerOptions = {
					radius: 3,
					fillColor: "#ff7800",
					color: "#000",
					weight: 1,
					opacity: 1,
					fillOpacity: 0.8
					};
			  return L.circleMarker(latlng, geojsonMarkerOptions);
		 };
		 
		function treePopupContent(feature) {
				
				props = feature.properties;
				var treeType = props["Tree type (if known)"];
				if (treeType === "") {
					treeType="unknown tree type";
				}
				
				var long=feature.geometry.coordinates[1];
				var lat=feature.geometry.coordinates[0];
				var Streetview = '<a target="_blank" alt="Google streetview in separate tab" href="http://maps.google.com/maps?q=' 
				+ long + ',' +  lat + '">Google Streetview &copy;' + '</a>';
				
				const contents = '<b>' + props["Location description"] + '</b><br />' + props.Surroundings + '<br />' + treeType + "," + props["Used for total counted"] + " plants" + '<br />' + "Survey date : " +  props["Date"] + '<br />' + Streetview  + " " ;
				
				return contents;
		};
		
		// Layer depends on variable "trees" containing the trees data in geoJSON format
		//Tree	Location description	Surroundings	Habitat type	Tree type (if known)	As recorded	Used for total counted	Easting	Northing	What3words	Lat	Long	Grid ref	First surveyed	Last Surveyed	Picture

		// use [""] notation e.g. feature["First surveyed"]

				
		   const treesLayer = L.geoJSON(trees, {
			       pointToLayer: treeMarker,
				   attribution: 'Tree data owned on behalf of the community by <a href="https://www.higreenspaces.org/about-us">Histon and Impington Green Spaces</a>'
		       } ).bindPopup(function (layer) {
								const contents = treePopupContent(layer.feature)
		                     return contents;
				   });
		// same data reused, but different attribute (bunch size) used for marker display
		 const bunchLayer = L.geoJSON(trees, {
			       pointToLayer: bunchMarker,
				   attribution: 'Tree data owned on behalf of the community by <a href="https://www.higreenspaces.org/about-us">Histon and Impington Green Spaces</a>'
		       } ).bindPopup(function (layer) {
								const contents = treePopupContent(layer.feature)
		                     return contents;
				   });;
			  // same data, filter to give trail of largest # bunches on tree 
		const trailLayer =  L.geoJSON(trees, {
			      	   attribution: 'Tree data owned on behalf of the community by <a href="https://www.higreenspaces.org/about-us">Histon and Impington Green Spaces</a>',
					   pointToLayer: trailMarker,
					    filter: function(feature, layer) {
							return (feature.properties["Used for total counted"] >= 10)
						}
		       } ).bindPopup(function (layer) {
								const contents = treePopupContent(layer.feature)
		                     return contents;
				   });;
				   
		// set up map
		var HisImp = [52.2500, 0.1042];
		var map = L.map('map', {
			center: HisImp,
			zoom: 15,
			// layers which are on by default
			layers: [tiles, treesLayer]
			});		
		// add Layer Control
		var baseMaps = { 
						"OpenStreetMap" : tiles
  					}
		// available layers
		var overLays = {
						"Mistletoe"    : treesLayer,
						"Bunch sizes"  : bunchLayer,
						"Large bunch trail" : trailLayer
						}
	
        var layerControl = L.control.layers(baseMaps, overLays).addTo(map);


