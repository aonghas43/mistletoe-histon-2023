{
	 "use strict";
	 
	// base maps
	    var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
						maxZoom: 20,
						attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					});
					
		var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
						maxZoom: 20,
				attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'});
				
		var OPNVKarte = L.tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png', {
			maxZoom: 20,
			attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
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
		 
	   const treesLayer = L.geoJSON(trees, {
			       pointToLayer: treeMarker,
				   attribution: 'Tree data owned on behalf of the community by <a href="https://www.higreenspaces.org/about-us">Histon and Impington Green Spaces</a>'
		       } ).bindPopup(function (layer) {
								props = layer.feature.properties;
								const contents = '<b>' + props.StreetAddress + '</b><br />' + props.surroundings + '<br />' + props.treeType+ "," + props.numberOfPlants + " plants" + '<br />' ;
		                     return contents;
				   })
				   
		// set up map
		var map = L.map('map', {
			center: [52.2535, 0.1042],
			zoom: 15,
			layers: [tiles, treesLayer]
			});		
		// add Layer Control
		var baseMaps = { 
						"OpenStreetMap" : tiles,
						"OPNVKarte": OPNVKarte,
						"OpenTopoMap" : openTopoMap
						}
		var overLays = {
						"Mistletoe" : treesLayer
						}
		var layerControl = L.control.layers(baseMaps, overLays).addTo(map);
		}