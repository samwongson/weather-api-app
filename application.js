$(document).ready(function() {
  $('#cities').on('click', '.list-group-item', function onCityClick(e) {
    $('#cities').empty();
    $.ajax({
      url: "http://api.wunderground.com/api/6c6d61fafe82b2c3/forecast" + $(this).data('city') + ".json",
      dataType: 'json',
      success: function(response) {
        var weatherInfo = response.forecast.simpleforecast.forecastday[0];
        var highTemp = weatherInfo.high.celsius;
        var lowTemp = weatherInfo.low.celsius;
        var cityName = weatherInfo.date.tz_long;
        var conditions = weatherInfo.conditions;
        var date = weatherInfo.date.pretty;
        var picture = weatherInfo.icon_url;
        console.log(response);
        $('.weather-list').append("<li class='list-group-item'>" + cityName + " weather for " + date + "</li>");
        $('.weather-list').append("<li class='list-group-item'>Conditions: " + conditions + "</li>");
        $('.weather-list').append("<li class='list-group-item'><img src='" + picture + "'/></li>");
        $('.weather-list').append("<li class='list-group-item'>High of C" + highTemp + "</li>");
        $('.weather-list').append("<li class='list-group-item'>Low of C" + lowTemp + "</li>");


      }
    })
    console.log(e);
  });

  $('.query').on('submit', function(e) {
    e.preventDefault();
    $('#cities').empty();
    $('.weather-list').empty();
    var query = $('.input').val();

    if(query.indexOf("Pyongyang") != -1) {
      var error = $('#cities').append("<span>NOT ALLOWED TO SEARCH PYONGYANG</span>");
    } else {
      $('#cities').empty();
      $.ajax({
          url: 'http://autocomplete.wunderground.com/aq?query=' + query + "&cb=?",
          dataType: 'json',
          success: function(response) {
            console.log(response);

            response.RESULTS.forEach(function(city) {
              $('#cities').append("<a data-city='"+city.l+"' class='list-group-item'>" + city.name + "</a>");
              })
          }
        });
      } 
    });

      


});