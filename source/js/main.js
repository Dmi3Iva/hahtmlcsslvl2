"use strict";

document.querySelector('html').classList.remove('no-js');

window.onload  = function(){
  
  let header = document.querySelector('.header');
  let burger = document.querySelector('.header__toggle-burger');
  
  burger.addEventListener('click', function(){
      header.classList.toggle('header__close');
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
      // console.log('pos:'+pos);
      // console.log('parent:'+ (btn.parentElement.clientWidth-12));
      // console.log(inputResult.value);
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
  // TODO: try this idea
  let beforeImg = document.querySelector('.slider-cat__item:first-child');
  let afterImg = document.querySelector('.slider-cat__item:last-child');  
  let parentWidth = document.querySelector('.slider-cat__list').offsetWidth ;//style.width;
  
  function changeWidth(value){
    beforeImg.style.width = value * parentWidth + 'px';
    
    console.log(beforeImg.style.width);
  }
  
}//end window onload

function getPositionX(elem){
  return elem.getBoundingClientRect().left ;
}