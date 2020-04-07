/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 8
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


var dataset = "https://coronadatascraper.com/features.json"
var featureGroup;

var myStyle = function(feature) {
  var colors = {
    "MON": "#fce186",
    "TUE": "#fccb4f",
    "WED": "#feb919",
    "THU": "#fc7002",
    "FRI": "#d1341e"
  };

  return {color: colors[feature.properties.COLLDAY] || "#ff0000"};
};

var showResults = function() {
  /* =====================
  This function uses some jQuery methods that may be new. $(element).hide()
  will add the CSS "display: none" to the element, effectively removing it
  from the page. $(element).show() removes "display: none" from an element,
  returning it to the page. You don't need to change this part.
  ===================== */
  // => <div id="intro" css="display: none">
  $('#intro').hide();
  // => <div id="results">
  $('#results').show();
};


var eachFeatureFunction = function(layer) {
  layer.on('click', function (event) {
    var abbrDay = {
      'MON': 'Monday',
      'TUE': 'Tuesday',
      'WED': 'Wednesday',
      'THU': 'Thursday',
      'FRI': 'Friday'
    };
    var dayOfWeek = abbrDay[layer.feature.properties.COLLDAY];

    $('.day-of-week').text(dayOfWeek);

    showResults();
  });
};

var myFilter = function(feature) {
  if (_.isEmpty(feature.properties.COLLDAY.trim())) {
    return false;
  } else {
      return true;
  }
};

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      filter: myFilter
    }).addTo(map);

    // quite similar to _.each
    featureGroup.eachLayer(eachFeatureFunction);
  });
});
