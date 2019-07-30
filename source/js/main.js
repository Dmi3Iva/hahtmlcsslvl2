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
  if(window.innerWidth <768){
    
    document.querySelector('.presentation__checkbox-input').addEventListener('click',function(){
      document.querySelector('.slider-cat__item:first-child').classList.toggle('slider-cat__item--close');
    });
    
  }
  else{
    //desktop
    let line        = document.querySelector('.presentation__line');
    let button      = document.querySelector('.presentation__button');
    let before      = document.querySelector('.slider-cat__item:first-child');
    let after       = document.querySelector('.slider-cat__item:last-child');  
    let parentWidth = document.querySelector('.slider-cat__list').offsetWidth;
    let inputResult = document.querySelector('.presentation__checkbox-input');
    
    
    line.addEventListener('click',function(e){
      let rect = line.getBoundingClientRect();
      button.style.left = (e.clientX-rect.left) + 'px';
      changeWidth((e.clientX-rect.left) / (rect.right - rect.left));
    });
    
    function changeWidth(value){
      before.style.width = value * parentWidth + 'px';  
    }    
    
    changeWidth(0.5);
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
  }

}//end window onload

function getPositionX(elem){
  return elem.getBoundingClientRect().left ;
}