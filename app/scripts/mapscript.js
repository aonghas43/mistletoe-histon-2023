{
	 "use strict";
	 
	// base maps
	    var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
						maxZoom: 20,
						attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					});
};
/*
Farm fresh tree icon, 
https://commons.wikimedia.org/wiki/File:Farm-Fresh_tree_white.png
licensed under the Creative Commons Attribution 3.0 Unported license.
https://creativecommons.org/licenses/by/3.0/deed.en
black tree icon, 
https://commons.wikimedia.org/wiki/File:Tree-12361.svg
licensed under the Creative Commons Attribution 3.0 Unported license.
https://creativecommons.org/licenses/by/3.0/deed.en
mistletoe berries
https://commons.wikimedia.org/wiki/File:Mistletoe_Berries_Uk.jpg
Alexbrn, Public domain, via Wikimedia Commons
*/

            var treeIcon = L.icon({
                           //iconUrl: 'docs/images/Farm-Fresh_tree_white.png',
						   iconUrl: 'docs/images/Tree-12361.svg.png',
			   iconSize: [16,16],
			   iconAnchor: [10,10],
			   popupAnchor: [-15,-20],
			   tooltipAnchor:[-15,-20]
			});
            function treeMarker(feature, latlng)
	     { 
	         return L.marker(latlng, 
			                 {icon: treeIcon,
							 riseOnHover: true,
							 riseOffset: 500,
							 opacity: 0.9,
							  alt: feature.properties.StreetAddress,
							  title: feature.properties.description});
	     };
		 // layer with bunch sizes
		   function bunchMarker(feature, latlng)
	     { 
			var theIcon = L.divIcon({  html: feature.properties.numberOfPlants,
			  className: "svg-icon",
			  iconSize: [16, 26],
			  iconAnchor: [10,28]
			});
	         return L.marker(latlng, 
			                 {icon: theIcon,
							 riseOnHover: true,
							 riseOffset: 500,
							 opacity: 0.9,
							  alt: feature.properties.StreetAddress,
							 title: feature.properties.numberOfPlants});
	     };
		function treePopupContent(feature) {
				
				props = feature.properties;
				const contents = '<b>' + props.StreetAddress + '</b><br />' + props.surroundings + '<br />' + props.treeType+ "," + props.numberOfPlants + " plants" + '<br />' + '<a target="_blank" href="http://maps.google.com/maps?q=' + props.long + ',' +  props.lat +'">Google Stretview &copy;' + '</a>' ;
				
				// could instead do w3w '<a href="https://what3words.com/' + props.what3words + '">what3words link: ' + props.what3words + '</a>'
				return contents;
		};
	   const treesLayer = L.geoJSON(trees, {
			       pointToLayer: treeMarker,
				   attribution: 'Tree data owned on behalf of the community by <a href="https://www.higreenspaces.org/about-us">Histon and Impington Green Spaces</a>'
		       } ).bindPopup(function (layer) {
								const contents = treePopupContent(layer.feature)
		                     return contents;
				   })
		 const bunchLayer = L.geoJSON(trees, {
			       pointToLayer: bunchMarker,
				   attribution: 'Tree data owned on behalf of the community by <a href="https://www.higreenspaces.org/about-us">Histon and Impington Green Spaces</a>'
		       } )
				   
		// set up map
		var HisImp = [52.2535, 0.1042];
		var map = L.map('map', {
			center: HisImp,
			zoom: 15,
			layers: [tiles, treesLayer]
			});		
		// add Layer Control
		var baseMaps = { 
						"OpenStreetMap" : tiles
  					}
		var overLays = {
						"Mistletoe"    : treesLayer,
						"Bunch sizes"  : bunchLayer
						}
		var layerControl = L.control.layers(baseMaps, overLays).addTo(map);
		
		
//
// written with assistance from information and code examples here 
// "Using SVG icons for Leafletjs" : https://onestepcode.com/leaflet-markers-svg-icons/
// leafletjs examples: https://leafletjs.com/examples/geojson/example.html 