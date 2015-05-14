$( document ).ready(function() {

  function codeAddress() {
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById('address').value;

    geocoder.geocode({'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          var location = results[0].geometry.location;
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
         $('.time').append(data.time);
         $('.countryName').append(data.countryName);
         $('.lat').append(data.lat);
      });
  };

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
