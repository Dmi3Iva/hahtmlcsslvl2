"use strict";

document.querySelector('html').classList.remove('no-js');

window.onload  = function(){
  
  let header = document.querySelector('.header');
  let burger = document.querySelector('.header__toggle-burger');
  
  burger.addEventListener('click', function(){
      header.classList.toggle('header--open');
  });
  
  
  /*cat slider before after*/
  //for mobile
  // document.querySelector('.slider-cat__control--mobile').addEventListener('click',function(){
  //   document.querySelector('.slider-cat__item:first-child').classList.toggle('slider-cat__item--close');
  // });
  
  //for desktop
  let line        = document.querySelector('.slider-cat__line');
  let button      = document.querySelector('.slider-cat__button');
  let before      = document.querySelector('.slider-cat__first');
  let after       = document.querySelector('.slider-cat__second');  
  
  line.addEventListener('click',function(e){
    let rect = line.getBoundingClientRect();
    let pos =  ( e.clientX - rect.left - 17 ) ;
    if( pos < 0 ){
      pos = 0;
    }
    if(pos > button.parentElement.clientWidth - 34 ){
      pos = button.parentElement.clientWidth  - 34;
    }
    button.style.left = pos + 'px';
    changeWidth( pos / ( rect.right - rect.left - 34) );
  });
  
  function changeWidth(value){
    after.style.width = value * 100 + '%';
    before.style.width = 100 - (value * 100) + '%';    
  }    
  
  changeWidth(0.5);
  
  button.onmousedown = buttonMove;
  
  button.ondragstart = function() {
    return false;
  };
  
  function buttonMove(event){
    let leftPosition = getPositionX(button.parentElement);
    event.preventDefault();
    
    function moveAt(pageX){
      let pos = pageX - leftPosition - button.offsetWidth / 2;
      
      if(pos < 0 ){
        pos = 0;
      }
      if(pos > button.parentElement.clientWidth - 34){
        pos = button.parentElement.clientWidth - 34;
      }
      
      button.style.left =  pos + 'px';
      console.log(pos);
      console.log(button.parentElement.clientWidth);
      changeWidth(pos/ (button.parentElement.clientWidth -34));
    }
    
    function onMouseMove(event) {
      moveAt(event.pageX);
      console.log('pagex' + event.pageX);
    }

    document.addEventListener("mousemove",  onMouseMove);
    
    document.onmouseup = function() {
      console.log('stop');
      document.removeEventListener('mousemove', onMouseMove);
      document.onmouseup = null;
    };
  }

}//end window onload

/*functions*/
function getPositionX(elem){
  return elem.getBoundingClientRect().left ;
}