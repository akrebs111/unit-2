//Alex Krebs 6/15/2025
//Lesson 5 Leaflet Tutorials and Lab Dataset

//variable for map that will be  created
var map;
//createMap function with states establish a map view centered on North America, with an initial view that captures all of the added data.
function createMap() {
    map = L.map('map', {
        center: [40, -100],
        zoom: 3
  });

    //adds the selected tileset, Alidade Smooth Dark from Stadiamaps and gives the proper credits
    //also provides a minZoom and maxZoom for viewing the map/data.
    //adds the tileLayer to our map. 
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 3,
	maxZoom: 6,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png',
}).addTo(map);

    //call getData function
    getData();
};
//onEachFeature function adds a pop up to each of the data points that will be on the map
function onEachFeature(feature, layer) {
    //creates a var to store the data features popupcontent.
    //if loop finds the data and prints it on the popup in order of our data.
    var popupContent = "";
    if (feature.properties) {
        //for loop adds a colon after each property to differentiate between property and data value for that feature
        for (var property in feature.properties){
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
        }
        //bindpPopup inserts the html into each feature popup
        layer.bindPopup(popupContent);
    };
};

//function to retrieve the data and place it on the map
function getData(){
    //load the data
    fetch("data/US_City_Commute_Data.geojson")
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(json, {
                onEachFeature: onEachFeature
            }).addTo(map);
        })  
};
//Executes the script once the DOM is prepared
document.addEventListener('DOMContentLoaded',createMap)
