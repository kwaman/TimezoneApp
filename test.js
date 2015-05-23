$( document ).ready(function() {

  function getLocation() {
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById('address').value;

    // Get the location submitted
    geocoder.geocode({'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          var location = results[0].geometry.location;

          // Parse out the city and country
          var city = parseLocation(results,'locality');
          var country = parseLocation(results,'country');

          // Get local time for that Lat,Lng
          getTime(location.lat(),location.lng());

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  function getTime(lat, lng) {
      var baseurl = "http://api.geonames.org/timezoneJSON";
      var time;

      $.ajax({
          url: baseurl + '?' + encodeQueryData({
            'lat' : lat,
            'lng' : lng,
            'username' : 'timezone339df08d'
          })
      }).then(function(data) {
        addClock(data.time);
      });
  };

  function addClock(time){
    if ($('div.loop').length<10) {
      var clonedDiv=$($('div.loop')[0]).clone().appendTo('.parentDiv');
      clonedDiv.html(time);
      clonedDiv.css({"font-size":"200%", "font-color":"white", "font-family":"Helvetica"});
      switch($('div.loop').length) {
        case 1:
          clonedDiv.css("background-color","green");
          break;
        case 2:
          clonedDiv.css("background-color","blue");
          break;
        case 3:
          clonedDiv.css("background-color","yellow");
          break;;
        default:
          clonedDiv.css("background-color","orange");
          break;
      }
    }
  };

  function changeBackgroundColor(element,length)
  {

  }

  // Helper
  // Parse out the location from the Google API result
  function parseLocation(results, type){
    for(var addComponent in results[0].address_components){
      var component = results[0].address_components[addComponent];
      for(typeIndex in component.types ){
        if(component.types[typeIndex]==type) {
          return component.long_name;
        }
      }
    }
  }

  // Usage:
  //   var data = { 'first name': 'George', 'last name': 'Jetson', 'age': 110 };
  //   var querystring = EncodeQueryData(data);
  function encodeQueryData(data) {
     var ret = [];
     for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
     return ret.join("&");
  };

  document.getElementById("ajaxButton").onclick = function() {
    getLocation();
  };
});
