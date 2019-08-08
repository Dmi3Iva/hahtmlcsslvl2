"use strict";

document.querySelector('html').classList.remove('no-js');

window.addEventListener("load", function(){  
    let header = document.querySelector('.header');
    let burger = document.querySelector('.header__toggle');
    
    burger.addEventListener('click', function(){
        header.classList.toggle('header--open');
    });
    
    drawMap();
  }
);


function drawMap(){
  var map = new google.maps.Map(    document.getElementById('map'),
      {center: new google.maps.LatLng(59.939337,30.323197), zoom: 16});

  var features = 
  {
    position: new google.maps.LatLng(59.939337,30.323197),
    type: 'info'
  };

  // Create marker.
  var marker = new google.maps.Marker({
    position: features.position,
    icon: '../img/map-pin.png',
    map: map
  });
    
  
}
