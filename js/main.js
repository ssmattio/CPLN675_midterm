/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [17.408020, 18.246423],
  zoom: 2
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

// set up available list of dates
var availableDates = Object.keys(covidCases[0].features[0].properties).filter(key => !isNaN(key[0]));
var $dateList = $("#date-list");
availableDates.forEach((ad, index) => {
  $dateList.append("<li><a href=\"#\" data-date="+ ad +" data-index="+ index+">" + ad + "</a></li>");
});

function getPointsForDate(date) {
  const countries = covidCases;
  countries.forEach(function(country) {
   country.features.forEach(function(covidPoint) {
      var casesOnDate = covidPoint.properties[date];
      var imageUrl = "";

      if (casesOnDate === 0) {
        imageUrl = "js/images/marker-icon.png"; 
      } else if (casesOnDate > 0 && casesOnDate < 100) {
        imageUrl = "js/images/marker_5000.png"; 
      } else if (casesOnDate > 100 && casesOnDate < 1000) { 
        imageUrl = "js/images/marker_100.png"; 
      } else if (casesOnDate > 1000 && casesOnDate < 5000) { 
        imageUrl = "js/images/marker_9000.png"; 
      } else if (casesOnDate > 5000 && casesOnDate < 9000) { 
        imageUrl = "js/images/marker_1000.png"; 
      } else {
        imageUrl = "js/images/marker_0000.png"; 
      }

      var pointIcon = new L.Icon({
        iconUrl: imageUrl,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      var coords = [covidPoint.geometry.coordinates[1], covidPoint.geometry.coordinates[0]]

      var mrkr = L.marker(coords, {icon: pointIcon});
      mrkr.addTo(map);
      allMarkers.push(mrkr);
    });
  });
 
}

function getDateFromIndex(index) {
  var thedate;
  availableDates.forEach((currDate, i) => {
    if (i === index) {
      thedate = currDate
    }
  });

  return thedate;
}

function setDateDisplay(date) {
  $("[data-current-date-display").text(date);
}



var allMarkers = [];
var removeMarkers = function(markers) {
  markers.forEach(function(marker){
    return map.removeLayer(marker);
  });
  allMarkers = [];
 };

// initialize
var currentDateIndex = 0;
var selectedDate = getDateFromIndex(currentDateIndex);
setDateDisplay(selectedDate);
getPointsForDate(selectedDate);

// on date click
$("#date-list [data-date]").on("click", function(event) {
  removeMarkers(allMarkers);
  var selectedDate = $(event.target).data("date");
  currentDateIndex = $(event.target).data("index");

  setDateDisplay(selectedDate);
  getPointsForDate(selectedDate);
});

// on Prev Click
$("[data-prev]").on("click", function(event) {
  removeMarkers(allMarkers);

  if (currentDateIndex != 0) {
    currentDateIndex--;
  }

  var selectedDate = getDateFromIndex(currentDateIndex);
  
  setDateDisplay(selectedDate);
  getPointsForDate(selectedDate);
});

// on Next Click
$("[data-next]").on("click", function(event) {
  removeMarkers(allMarkers);

  if (currentDateIndex != availableDates.length - 1) {
    currentDateIndex++;
  }

  var selectedDate = getDateFromIndex(currentDateIndex);

  setDateDisplay(selectedDate);
  getPointsForDate(selectedDate);
});

// L.geoJson(data).addTo(map);

// for (i = 0; i < data.length - 1; i++) {
//   if (data[i]["1/22/20"] >= 9000){
//   color = '#800026';
// } else if (data[i]["1/22/20"] >= 5000) {
//   color = '#BD0026';
// } else if (data[i]["1/22/20"] >= 1000) {
//   color = '#E31A1C';
// } else if (data[i]["1/22/20"] >= 100) {
//   color = '#FC4E2A'
// } else if (data[i]["1/22/20"] > 0) {
//   color = '#FD8D3C'
// } else {
//   color = '#FFEDA0';
// };
// };


//    return cases > 9000 ? '#800026' :
//           cases > 5000  ? '#BD0026' :
//           cases > 1000  ? '#E31A1C' :
//           cases > 100  ? '#FC4E2A' :
//           cases > 0   ? '#FD8D3C' :
//                        '#FFEDA0';
//}



//var myFilter = function(features.properties.1/22/20) {
//  if (features.properties[1/22/20] === 0) {
//    return false;
//  } else {
//      return true;
//  }
//};

//$(document).ready(function() {
  // $.ajax(dataset).done(function(data) {

//    var parsedData = covidCases;
//    featureGroup = L.geoJson(parsedData, {
//      style: myStyle,
//      filter: myFilter
//    }).addTo(map);

    // quite similar to _.each
    // featureGroup.eachLayer(eachFeatureFunction);
  // });
//});
