"use strict";

document.querySelector('html').classList.remove('no-js');

window.onload  = function(){
  
  let header = document.querySelector('.header');
  let burger = document.querySelector('.header__toggle-burger');
  
  burger.addEventListener('click', function(){
      header.classList.toggle('header--open');
  });
  
  let before = document.querySelectorAll('slider-cat__item')[0];
  let after  = document.querySelectorAll('slider-cat__item')[1];
  let button = document.querySelector('.presentation__button');
  let inputResult = document.querySelector('.presentation__checkbox-input');
  
  button.onmousedown = buttonMove;
  
  button.ondragstart = function() {
    return false;
  };
  
  function buttonMove(event){
    let btn = this;
    let leftPosition = getPositionX(btn.parentElement);
    moveAt(event.pageX);
    
    function moveAt(pageX){
      let pos = pageX - leftPosition - btn.offsetWidth /2;
      
      if(pos < 0 ){
        pos = 0;
      }
      if(pos > btn.parentElement.clientWidth-12){
        pos = btn.parentElement.clientWidth-12;
      }
      
      btn.style.left =  pos + 'px';
      
      inputResult.value = pos/(btn.parentElement.clientWidth-12);
      changeWidth(inputResult.value); 
    }
    
    function onMouseMove(event) {
      moveAt(event.pageX);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      this.onmouseup = null;
    };
  }
  
  //for mobile
  if(window.innerWidth <767){
    
    console.log("activated");
    document.querySelector('.presentation__checkbox-input').addEventListener('click',function(){
      document.querySelector('.slider-cat__item:first-child').classList.toggle('slider-cat__item--close');
    });
    
  }
  else{
    //desktop
    let line = document.querySelector('.presentation__line');
    line.addEventListener('click',function(e){
      let rect = line.getBoundingClientRect();
      console.log((e.clientX-rect.left) / (rect.right - rect.left));
      changeWidth((e.clientX-rect.left) / (rect.right - rect.left));
    });
    
    let beforeImg = document.querySelector('.slider-cat__item:first-child');
    let afterImg = document.querySelector('.slider-cat__item:last-child');  
    let parentWidth = document.querySelector('.slider-cat__list').offsetWidth ;//style.width;
    
    function changeWidth(value){
      beforeImg.style.width = value * parentWidth + 'px';
      
      console.log(beforeImg.style.width);
    }
    
    changeWidth(0.5);
  }

}//end window onload

function getPositionX(elem){
  return elem.getBoundingClientRect().left ;
}