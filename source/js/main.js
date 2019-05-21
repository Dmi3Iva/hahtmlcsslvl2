"use strict";

window.onload  = function(){
  let header = document.querySelector('.header');
  let burger = document.querySelector('.header__toggle-burger');
  
  burger.addEventListener('click', function(){
      header.classList.toggle('header__close');
  });
};