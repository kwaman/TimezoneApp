$( document ).ready(function() {

  function codeAddress() {
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById('address').value;

    geocoder.geocode({'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          var location = results[0].geometry.location;
          //var city = results[0].address_components[0].long_name;
          var city = parseLocation(results,'locality');
          var country = parseLocation(results,'country');
          console.log(city);
          console.log(country);
          getTime(location.lat(),location.lng());
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  function getTime(lat, lng) {
      var baseurl = "http://api.geonames.org/timezoneJSON";
      $.ajax({
          url: baseurl + '?' + encodeQueryData({
            'lat' : lat,
            'lng' : lng,
            'username' : 'timezone339df08d'
          })
      }).then(function(data) {
         $('.time').empty().append(data.time);
         $('.countryName').empty().append(data.countryName);
         $('.lat').empty().append(data.lat);
      });
  };

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
    codeAddress();
  };
});
